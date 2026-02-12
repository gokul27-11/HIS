import express from 'express';
import session from 'express-session';
import fs from 'fs';
import path from 'path';
import { HIS_SYSTEM_URL, SESSION_SECRET } from './config';
import { loginView } from './views/login';
import { renderShell } from './views/layout';

const app = express();
const PORT = 3000;

// 1. GLOBAL MIDDLEWARE (Must come before routes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: SESSION_SECRET || 'dev-fallback-secret-12345',
    resave: false,
    saveUninitialized: false, // Changed to false for better security
    cookie: { secure: false, maxAge: 3600000 }
}));

// 2. PUBLIC ROUTES (Accessible without login)
app.get('/login', (req, res) => res.send(loginView));

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password123') {
        req.session.isLoggedIn = true;
        req.session.username = username;
        // Important: Save session before redirecting
        return req.session.save(() => res.redirect('/dashboard/home'));
    }
    res.send('Login failed. <a href="/login">Retry</a>');
});

// 3. THE GATEKEEPER (Blocks everything below this line)
app.use((req, res, next) => {
    // Exception for root if you want it public, otherwise it redirects to login
    if (req.path === '/' || req.path === '/status') return next();
    
    if (req.session && req.session.isLoggedIn) return next();
    res.redirect('/login');
});

// 4. SEMI-PUBLIC/INFO ROUTES
app.get('/', (req, res) => {
    res.send(`<h1>HIS Backend Online</h1><p>Engine: ${HIS_SYSTEM_URL}</p><a href="/login">Go to Login</a>`);
});

// 5. DYNAMIC AUTOMATION (The "All Entry" System)
app.get('/dashboard/:module', async (req, res) => {
    const moduleName = req.params.module;
    const filePath = path.join(__dirname, 'views', `${moduleName}.ts`);

    if (fs.existsSync(filePath)) {
        try {
            const module = await import(`./views/${moduleName}`);
            // If the module exports 'default', use it. If it exports a variable like 'registerView', use that.
            const content = module.default || module.registerView || module[Object.keys(module)[0]];
            res.send(renderShell(content, req.session.username));
        } catch (err) {
            res.status(500).send("Module Execution Error");
        }
    } else {
        res.send(renderShell("<h2>404</h2><p>Module not found.</p>", req.session.username));
    }
});

// 6. START THE SERVER (This is why Safari couldn't connect!)
app.listen(PORT, () => {
    console.log(`🚀 HIS Server running at http://localhost:${PORT}`);
    console.log(`🔗 Target FHIR Engine: ${HIS_SYSTEM_URL}`);
});
