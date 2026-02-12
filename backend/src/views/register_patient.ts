export const loginView = `
    <div style="font-family: sans-serif; max-width: 300px; margin: 100px auto; border: 1px solid #ccc; padding: 20px;">
      <h2>🏥 HIS Login</h2>
      <form action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" style="width:100%; margin-bottom:10px;" required>
        <input type="password" name="password" placeholder="Password" style="width:100%; margin-bottom:10px;" required>
        <button type="submit" style="width:100%; cursor:pointer;">Sign In</button>
      </form>
    </div>
`;
