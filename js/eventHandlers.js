import { state, setState } from './state.js';
import { elements } from './elements.js';
import { renderClasses, updateClassDetails } from './render.js';
import { deleteClass, addNewClass, editLesson } from './classManagement.js';
import { deleteStudent, editStudent, addNewStudent, addDifficulty, toggleDifficultyResolved, deleteDifficulty } from './studentManagement.js';
import { toggleAttendance } from './attendanceManagement.js';

export function setupEventListeners() {
    document.getElementById('newClassBtn').addEventListener('click', () => openModal(elements.addClassModal));
    elements.addStudentBtn.addEventListener('click', () => {
        if (state.currentClass) {
            openModal(elements.addStudentModal);
        }
    });

    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => closeModal(closeBtn.closest('.modal')));
    });

    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`${tab.dataset.tab}Tab`).classList.add('active');
        });
    });

    document.getElementById('addClassForm').addEventListener('submit', addNewClass);
    document.getElementById('addStudentForm').addEventListener('submit', addNewStudent);
    document.getElementById('editStudentForm').addEventListener('submit', editStudent);
    document.getElementById('editLessonForm').addEventListener('submit', editLesson);
}

export function attachClassListeners() {
    elements.classList.querySelectorAll('.class-item').forEach(item => {
        item.querySelector('.class-info').addEventListener('click', () => {
            state.currentClass = state.classes.find(cls => cls.id === parseInt(item.dataset.classId));
            setState(state);
            renderClasses();
            updateClassDetails();
        });

        item.querySelector('.delete-icon').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteClass(parseInt(item.dataset.classId));
        });
    });
}

export function attachStudentListeners() {
    elements.studentList.querySelectorAll('.student-item').forEach(item => {
        const studentId = parseInt(item.dataset.studentId);

        item.querySelector('.edit-icon').addEventListener('click', () => openEditStudentModal(studentId));
        item.querySelector('.delete-icon').addEventListener('click', () => deleteStudent(studentId));
        
        item.querySelector('.add-difficulty-btn').addEventListener('click', () => {
            const difficulty = prompt("Descreva a dificuldade do aluno:");
            if (difficulty) addDifficulty(studentId, difficulty);
        });

        item.querySelectorAll('.difficulty-item').forEach(difficultyItem => {
            const difficultyId = parseInt(difficultyItem.dataset.difficultyId);
            difficultyItem.querySelector('.toggle-difficulty-btn').addEventListener('click', () => toggleDifficultyResolved(studentId, difficultyId));
            difficultyItem.querySelector('.delete-difficulty-btn').addEventListener('click', () => deleteDifficulty(studentId, difficultyId));
        });

        item.querySelectorAll('.attendance-checkbox input').forEach((checkbox) => {
            checkbox.addEventListener('change', (e) => {
                const lessonIndex = parseInt(e.target.dataset.lesson);
                toggleAttendance(studentId, lessonIndex);
            });
        });
    });
}

export function attachLessonListeners() {
    elements.lessonList.querySelectorAll('.lesson-item').forEach(item => {
        item.addEventListener('click', () => {
            state.currentLesson = parseInt(item.dataset.lesson);
            setState(state);
            openEditLessonModal();
        });
    });
}

export function openModal(modal) {
    modal.style.display = "block";
}

export function closeModal(modal) {
    modal.style.display = "none";
}

function openEditStudentModal(studentId) {
    const student = state.currentClass.students.find(s => s.id === studentId);
    if (student) {
        document.getElementById('editStudentName').value = student.name;
        document.getElementById('editStudentId').value = student.id;
        openModal(elements.editStudentModal);
    }
}

export function openEditLessonModal() {
    const lessonDetail = state.currentClass.lessonDetails[state.currentLesson] || 
                         { title: `Aula ${state.currentLesson + 1}`, observation: '' };
    document.getElementById('lessonTitle').value = lessonDetail.title;
    document.getElementById('lessonObservation').value = lessonDetail.observation;
    openModal(elements.editLessonModal);
}