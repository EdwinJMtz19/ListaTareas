const notesGrid = document.getElementById('notes-grid');
const noteColors = [
    '#ffe599', // Amarillo/Naranja pálido
    '#ffad8e', // Naranja/Rojo pálido
    '#c8ffaf', // Verde pálido
    '#99edff', // Azul pálido
    '#e599ff'  // Púrpura pálido
];

function getFormattedDate() {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

// Función para crear el elemento de la nota
function createNoteElement(title, content, date, color) {
    const note = document.createElement('div');
    note.classList.add('note-card');
    note.style.backgroundColor = color;
    
    note.innerHTML = `
        <h3>${title}</h3>
        <p>${content}</p>
        <div class="note-footer">
            <span class="date">${date}</span>
            <div class="note-actions">
                <button class="action-btn delete-btn" title="Borrar nota">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `;

    // Asignar el evento de borrado al botón de la nota
    const deleteBtn = note.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteNote(note));
    
    return note;
}

// Función para añadir una nueva nota
function addNote() {
    const title = prompt("Título de la nueva nota (máx 50 caracteres):");
    if (!title) return; // Cancelar si no hay título

    const content = prompt("Contenido de la nota:");
    // Usamos el índice de la siguiente nota para elegir el color,
    // usando el operador módulo (%) para ciclar a través de los colores.
    const colorIndex = notesGrid.children.length % noteColors.length;
    const color = noteColors[colorIndex];
    const date = getFormattedDate();

    const newNote = createNoteElement(title, content || "Sin contenido...", date, color);
    notesGrid.appendChild(newNote);
}

// Función para borrar una nota
function deleteNote(noteElement) {
    const confirmDelete = confirm("¿Estás seguro de que quieres borrar esta nota?");
    if (confirmDelete) {
        notesGrid.removeChild(noteElement);
    }
}

// Inicializar con algunas notas de ejemplo, replicando la imagen
function loadExampleNotes() {
    const examples = [
        { title: "The beginning of screenless design: UI jobs to be taken over by Solution Architect", date: "May 21, 2020", color: noteColors[0] },
        { title: "13 Things You Should Give Up If You Want To Be a Successful UX Designer", date: "May 25, 2020", color: noteColors[1] },
        { title: "The Psychology Principles Every UI/UX Designer Needs to Know", date: "June 5, 2020", color: noteColors[2] },
        { title: "10 UI & UX Lessons from Designing My Own Product", date: "May 21, 2020", color: noteColors[4] },
        { title: "52 Research Terms you need to know as a UX Designer", date: "May 25, 2020", color: noteColors[3] },
        { title: "Text fields & Forms design – UI components series", date: "June 5, 2020", color: noteColors[4] }
    ];

    examples.forEach(item => {
        const note = createNoteElement(item.title, "", item.date, item.color);
        notesGrid.appendChild(note);
    });
}

// Cargar notas de ejemplo al iniciar
document.addEventListener('DOMContentLoaded', loadExampleNotes);