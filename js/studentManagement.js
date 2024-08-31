import { state, setState } from './state.js';
import { renderStudents, updateClassDetails } from './render.js';
import { closeModal } from './eventHandlers.js';
import { elements } from './elements.js';

export function deleteStudent(studentId) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        state.currentClass.students = state.currentClass.students.filter(student => student.id !== studentId);
        setState(state);
        renderStudents();
        updateClassDetails();
    }
}

export function editStudent(e) {
    e.preventDefault();
    const studentId = parseInt(document.getElementById('editStudentId').value);
    const name = document.getElementById('editStudentName').value;
    const issue = document.getElementById('editStudentIssue').value;

    const studentIndex = state.currentClass.students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        state.currentClass.students[studentIndex] = { ...state.currentClass.students[studentIndex], name, issue };
        setState(state);
        renderStudents();
        updateClassDetails();
        closeModal(elements.editStudentModal);
    }
}

export function addNewStudent(e) {
    e.preventDefault();
    if (!state.currentClass) return;
    const name = document.getElementById('studentName').value;
    const issue = document.getElementById('studentIssue').value;
    state.currentClass.students.push({ 
        id: Date.now(), 
        name, 
        issue,
        attendance: new Array(state.currentClass.lessons).fill(false)
    });
    setState(state);
    renderStudents();
    updateClassDetails();
    closeModal(elements.addStudentModal);
    e.target.reset();
}