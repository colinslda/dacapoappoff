const supabaseUrl = 'https://tewwxhxswtgkaracujlb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRld3d4aHhzd3Rna2FyYWN1amxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQzNTcsImV4cCI6MjA1NTg4MDM1N30.14_yg4RQ4a-gNe4npDh8cB8p_eyGIcZ7Q3lC5e6xCiM';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else window.location.href = 'index.html';
});
