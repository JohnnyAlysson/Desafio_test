import { state } from './state.js';
import { elements } from './elements.js';
import { attachClassListeners, attachStudentListeners, attachLessonListeners } from './eventHandlers.js';

export function renderClasses() {
    elements.classList.innerHTML = state.classes.map(cls => `
        <li class="class-item ${state.currentClass === cls ? 'selected' : ''}" data-class-id="${cls.id}">
            <div class="class-info">
                <strong>${cls.name}</strong><br>
                ${cls.students.length} alunos | ${cls.lessons} aulas
            </div>
            <div class="class-actions">
                <span class="expand-icon">↔</span>
                <span class="delete-icon" title="Excluir turma">🗑️</span>
            </div>
        </li>
    `).join('');

    attachClassListeners();
}

export function renderStudents() {
    if (state.currentClass) {
        elements.studentList.innerHTML = state.currentClass.students.map(student => `
            <li class="student-item" data-student-id="${student.id}">
                <div class="student-info">
                    <strong>${student.name}</strong>
                    <button class="add-difficulty-btn" data-student-id="${student.id}">+ Dificuldade</button>
                </div>
                <div class="difficulties-list">
                    <h4>Dificuldades:</h4>
                    <ul>
                        ${student.difficulties.map(difficulty => `
                            <li class="difficulty-item ${difficulty.resolved ? 'resolved' : ''}" data-difficulty-id="${difficulty.id}">
                                <span class="difficulty-description">${difficulty.description}</span>
                                <button class="toggle-difficulty-btn">✓</button>
                                <button class="delete-difficulty-btn">🗑️</button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="attendance-container">
                    <span class="attendance-label">Presenças:</span>
                    <div class="attendance-checkboxes">
                        ${Array.from({length: state.currentClass.lessons}, (_, i) => `
                            <div class="attendance-checkbox">
                                <input type="checkbox" 
                                       id="attendance-${student.id}-${i}" 
                                       ${student.attendance && student.attendance[i] ? 'checked' : ''}
                                       data-student-id="${student.id}"
                                       data-lesson="${i}">
                                <label for="attendance-${student.id}-${i}" title="Aula ${i + 1}">${i + 1}</label>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="student-actions">
                    <span class="edit-icon" title="Editar aluno">✏️</span>
                    <span class="delete-icon" title="Excluir aluno">🗑️</span>
                </div>
            </li>
        `).join('');
        attachStudentListeners();
    } else {
        elements.studentList.innerHTML = '';
    }
}

export function updateClassDetails() {
    if (state.currentClass) {
        elements.currentClassElement.textContent = state.currentClass.name;
        elements.studentCountElement.innerHTML = `<div class="stat-icon"></div> ${state.currentClass.students.length} alunos`;
        elements.lateCountElement.innerHTML = `<div class="stat-icon"></div> ${state.currentClass.late} faltas`;
        elements.difficultyCountElement.innerHTML = `<div class="stat-icon"></div> ${state.currentClass.difficulties} dificuldades`;
        elements.classLessonsElement.innerHTML = `<div class="stat-icon"></div> ${state.currentClass.lessons} aulas`;
        elements.addStudentBtn.style.display = 'block';
        renderStudents();
        renderLessons();
    } else {
        elements.currentClassElement.textContent = 'Selecione uma turma para ver os detalhes';
        elements.studentCountElement.innerHTML = '';
        elements.lateCountElement.innerHTML = '';
        elements.difficultyCountElement.innerHTML = '';
        elements.classLessonsElement.innerHTML = '';
        elements.addStudentBtn.style.display = 'none';
        elements.studentList.innerHTML = '';
        elements.lessonList.innerHTML = '';
    }
}

export function renderLessons() {
    if (state.currentClass) {
        elements.lessonList.innerHTML = Array.from({length: state.currentClass.lessons}, (_, i) => {
            const lessonDetail = state.currentClass.lessonDetails[i] || { title: `Aula ${i + 1}`, observation: '' };
            return `
                <li class="lesson-item" data-lesson="${i}">
                    <div>
                        <strong>${lessonDetail.title}</strong><br>
                        ${lessonDetail.observation ? 'Obs: ' + lessonDetail.observation : 'Sem observações'}
                    </div>
                    <span class="expand-icon">↔</span>
                </li>
            `;
        }).join('');

        attachLessonListeners();
    } else {
        elements.lessonList.innerHTML = '';
    }
}