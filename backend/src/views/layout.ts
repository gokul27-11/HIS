export const renderShell = (content: string) => `
    <div style="display:flex;">
        <div id="sidebar" style="width:200px; background:#2c3e50; color:white; height:100vh;">
            <input type="text" id="search" placeholder="Search entries..." onkeyup="filter()">
            <nav id="menu">
                <a href="/dashboard/register" style="color:white; display:block;">Register</a>
                <a href="/dashboard/vitals" style="color:white; display:block;">Vitals</a>
            </nav>
        </div>
        <div id="main" style="flex:1; padding:20px;">${content}</div>
    </div>
    <script>
        function filter() { /* Search logic */ }
    </script>
`;
