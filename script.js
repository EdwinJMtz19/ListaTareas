const notesGrid = document.getElementById('notes-grid');
const toggleMenuBtn = document.getElementById('toggle-menu-btn');
const colorMenu = document.getElementById('color-menu');

const noteColors = [
    '#ffe599',
    '#ffad8e',
    '#c8ffaf',
    '#99edff',
    '#e599ff',
    '#e0e0e0'
];

function getFormattedDate() {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date().toLocaleDateString('en-US', options);
}

function deleteNote(noteElement) {
    notesGrid.removeChild(noteElement);
}

function toggleEdit(noteElement) {
    const isEditing = noteElement.classList.toggle('editing');
    
    const title = noteElement.querySelector('h3');
    const content = noteElement.querySelector('p');
    const editBtnIcon = noteElement.querySelector('.edit-btn i');
    
    title.contentEditable = isEditing;
    content.contentEditable = isEditing;

    if (isEditing) {
        editBtnIcon.classList.remove('fa-pencil-alt');
        editBtnIcon.classList.add('fa-save');
        title.focus();
    } else {
        editBtnIcon.classList.remove('fa-save');
        editBtnIcon.classList.add('fa-pencil-alt');
        
        if (document.activeElement === title || document.activeElement === content) {
            document.activeElement.blur();
        }
    }
}

function createNoteElement(title, content, date, color) {
    const note = document.createElement('div');
    note.classList.add('note-card');
    note.style.backgroundColor = color;
    
    note.innerHTML = `
        <h3 contenteditable="false">${title}</h3>
        <p contenteditable="false">${content}</p>
        <div class="note-footer">
            <span class="date">${date}</span>
        </div>
        <div class="note-actions">
            <button class="action-btn edit-btn" title="Modificar texto">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="action-btn delete-btn" title="Borrar nota">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

    const deleteBtn = note.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteNote(note));
    
    const editBtn = note.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => toggleEdit(note));
    
    note.querySelector('h3').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            note.querySelector('p').focus();
        }
    });
    
    return note;
}

function addNote(color) {
    const title = "Nueva Nota";
    const content = "Escribe tu nota aquí..."; 
    const date = getFormattedDate();

    const newNote = createNoteElement(title, content, date, color);
    notesGrid.prepend(newNote);
    
    colorMenu.classList.add('hidden');
    
    // Activa la edición inmediatamente después de crear la nota
    toggleEdit(newNote);
}

function renderColorMenu() {
    colorMenu.innerHTML = '';

    noteColors.forEach(color => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.title = `Crear nota ${color}`;
        
        colorOption.addEventListener('click', () => addNote(color));
        
        colorMenu.appendChild(colorOption);
    });
}

toggleMenuBtn.addEventListener('click', () => {
    colorMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!toggleMenuBtn.contains(e.target) && !colorMenu.contains(e.target)) {
        colorMenu.classList.add('hidden');
    }
});



document.addEventListener('DOMContentLoaded', () => {
    renderColorMenu();
    
});