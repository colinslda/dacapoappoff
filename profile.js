const supabaseUrl = 'https://tewwxhxswtgkaracujlb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRld3d4aHhzd3Rna2FyYWN1amxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQzNTcsImV4cCI6MjA1NTg4MDM1N30.14_yg4RQ4a-gNe4npDh8cB8p_eyGIcZ7Q3lC5e6xCiM';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// Charger les informations
async function loadUserInfo() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) window.location.href = 'login.html';
    const userId = session.user.id;
    const { data, error } = await supabase
        .from('users')
        .select('first_name, email, instrument')
        .eq('id', userId)
        .single();
    if (error) console.error(error);
    else {
        document.getElementById('first-name').textContent = data.first_name;
        document.getElementById('email').textContent = data.email;
        if (data.instrument) document.getElementById('instrument').value = data.instrument;
    }
}

loadUserInfo();

// Sauvegarder l’instrument
document.getElementById('save-instrument').addEventListener('click', async () => {
    const instrument = document.getElementById('instrument').value;
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session.user.id;
    const { error } = await supabase
        .from('users')
        .update({ instrument })
        .eq('id', userId);
    if (error) console.error(error);
    else alert('Instrument sauvegardé !');
});
