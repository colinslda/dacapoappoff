const supabaseUrl = 'https://tewwxhxswtgkaracujlb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRld3d4aHhzd3Rna2FyYWN1amxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQzNTcsImV4cCI6MjA1NTg4MDM1N30.14_yg4RQ4a-gNe4npDh8cB8p_eyGIcZ7Q3lC5e6xCiM';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
        await supabase.from('users').insert({ id: data.user.id, first_name: firstName, email });
        window.location.href = 'index.html';
    }
});
