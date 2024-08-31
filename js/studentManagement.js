import { state, setState,removeStudent} from './state.js';
import { renderStudents, updateClassDetails } from './render.js';
import { closeModal } from './eventHandlers.js';
import { elements } from './elements.js';

export function addNewStudent(e) {
    e.preventDefault();
    if (!state.currentClass) return;
    const name = document.getElementById('studentName').value;
    state.currentClass.students.push({ 
        id: Date.now(), 
        name, 
        attendance: new Array(state.currentClass.lessons).fill(false),
        difficulties: []
    });
    setState(state);
    renderStudents();
    updateClassDetails();
    closeModal(elements.addStudentModal);
    e.target.reset();
}

export function editStudent(e) {
    e.preventDefault();
    const studentId = parseInt(document.getElementById('editStudentId').value);
    const name = document.getElementById('editStudentName').value;

    const studentIndex = state.currentClass.students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        state.currentClass.students[studentIndex].name = name;
        setState(state);
        renderStudents();
        updateClassDetails();
        closeModal(elements.editStudentModal);
    }
}

export function addDifficulty(studentId, difficulty) {
    const studentIndex = state.currentClass.students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        state.currentClass.students[studentIndex].difficulties.push({
            id: Date.now(),
            description: difficulty,
            resolved: false
        });
        state.currentClass.difficulties += 1;
        setState(state);
        renderStudents();
        updateClassDetails();
    }
}

export function toggleDifficultyResolved(studentId, difficultyId) {
    const studentIndex = state.currentClass.students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        const difficultyIndex = state.currentClass.students[studentIndex].difficulties.findIndex(d => d.id === difficultyId);
        if (difficultyIndex !== -1) {
            const wasResolved = state.currentClass.students[studentIndex].difficulties[difficultyIndex].resolved;
            state.currentClass.students[studentIndex].difficulties[difficultyIndex].resolved = !wasResolved;
            state.currentClass.difficulties += wasResolved ? 1 : -1;
            setState(state);
            renderStudents();
            updateClassDetails();
        }
    }
}

export function deleteDifficulty(studentId, difficultyId) {
    const studentIndex = state.currentClass.students.findIndex(s => s.id === studentId);
    if (studentIndex !== -1) {
        const difficulties = state.currentClass.students[studentIndex].difficulties;
        const difficultyIndex = difficulties.findIndex(d => d.id === difficultyId);
        if (difficultyIndex !== -1) {
            if (!difficulties[difficultyIndex].resolved) {
                state.currentClass.difficulties -= 1;
            }
            difficulties.splice(difficultyIndex, 1);
            setState(state);
            renderStudents();
            updateClassDetails();
        }
    }
}

export function deleteStudent(studentId) {
    if (!state.currentClass) return;

    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        // Find the student in the current class
        const studentIndex = state.currentClass.students.findIndex(student => student.id === studentId);
        
        if (studentIndex !== -1) {
            // Get the student before removing
            const removedStudent = state.currentClass.students[studentIndex];

            // Remove the student using the state management function
            removeStudent(state.currentClass.id, studentId);

            // Update the difficulties count
            const unresolvedDifficulties = removedStudent.difficulties.filter(d => !d.resolved).length;
            state.currentClass.difficulties -= unresolvedDifficulties;

            // Update the late count
            const lateCount = removedStudent.attendance.filter(a => !a).length;
            state.currentClass.late -= lateCount;

            // Update the state
            setState(state);

            // Re-render the view
            renderStudents();
            updateClassDetails();
        }
    }
}