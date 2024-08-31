import { state, setState } from './state.js';
import { renderClasses, updateClassDetails } from './render.js';
import { closeModal } from './eventHandlers.js';
import { elements } from './elements.js';

export function deleteClass(classId) {
    if (confirm(`Tem certeza que deseja excluir esta turma?`)) {
        state.classes = state.classes.filter(cls => cls.id !== classId);
        if (state.currentClass && state.currentClass.id === classId) {
            state.currentClass = null;
        }
        setState(state);
        renderClasses();
        updateClassDetails();
    }
}

export function addNewClass(e) {
    e.preventDefault();
    const name = document.getElementById('className').value;
    let numberOfLessons = document.getElementById('numeroDeAulas');
    let lessons = parseInt(numberOfLessons.value);
    
    if (classNameExists(name)) {
        alert('Já existe uma turma com esse nome. Por favor, escolha um nome diferente.');
        return;
    }
    
    const newClass = { 
        id: Date.now(), 
        name, 
        students: [], 
        late: 0, 
        difficulties: 0, 
        lessons, 
        lessonDetails: Array.from({length: lessons}, (_, i) => ({ title: `Aula ${i + 1}`, observation: '' }))
    };
    state.classes.push(newClass);
    state.currentClass = newClass;
    setState(state);
    renderClasses();
    updateClassDetails();
    closeModal(elements.addClassModal);
    e.target.reset();
    
    document.querySelector('.tab[data-tab="lessons"]').click();
}

function classNameExists(name) {
    return state.classes.some(cls => cls.name.toLowerCase() === name.toLowerCase());
}