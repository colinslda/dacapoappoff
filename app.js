// Initialisation de Supabase
const supabaseUrl = 'https://tewwxhxswtgkaracujlb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRld3d4aHhzd3Rna2FyYWN1amxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDQzNTcsImV4cCI6MjA1NTg4MDM1N30.14_yg4RQ4a-gNe4npDh8cB8p_eyGIcZ7Q3lC5e6xCiM';
const supabase = Supabase.createClient(supabaseUrl, supabaseKey);

// Vérifier la session
supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) window.location.href = 'login.html';
});

// Charger les pièces
async function loadPieces() {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session.user.id;
    const { data, error } = await supabase
        .from('repertoire')
        .select('*')
        .eq('user_id', userId);
    if (error) console.error(error);
    else {
        const pieceList = document.getElementById('piece-list');
        pieceList.innerHTML = '';
        data.forEach(piece => {
            const li = document.createElement('li');
            li.textContent = `${piece.piece_name} - ${piece.notes || 'Aucune note'}`;
            pieceList.appendChild(li);
        });
    }
}

loadPieces();

// Ajouter une pièce
document.getElementById('add-piece').addEventListener('click', async () => {
    const pieceName = prompt('Nom de la pièce :');
    const notes = prompt('Notes (facultatif) :');
    if (pieceName) {
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session.user.id;
        const { error } = await supabase
            .from('repertoire')
            .insert({ user_id: userId, piece_name: pieceName, notes: notes || '' });
        if (error) console.error(error);
        else loadPieces();
    }
});
