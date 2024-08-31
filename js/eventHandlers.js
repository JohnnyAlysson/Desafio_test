import { state, setState } from './state.js';
import { elements } from './elements.js';
import { renderClasses, updateClassDetails } from './render.js';
import { deleteClass, addNewClass } from './classManagement.js';
import { deleteStudent, editStudent, addNewStudent } from './studentManagement.js';
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
        item.querySelector('.edit-icon').addEventListener('click', () => {
            const studentId = parseInt(item.dataset.studentId);
            openEditStudentModal(studentId);
        });

        item.querySelector('.delete-icon').addEventListener('click', () => {
            const studentId = parseInt(item.dataset.studentId);
            deleteStudent(studentId);
        });

        item.querySelectorAll('.attendance-checkboxes input').forEach((checkbox, index) => {
            checkbox.addEventListener('change', () => {
                toggleAttendance(parseInt(item.dataset.studentId), index);
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

function openModal(modal) {
    modal.style.display = "block";
}

export function closeModal(modal) {
    modal.style.display = "none";
}

function openEditStudentModal(studentId) {
    const student = state.currentClass.students.find(s => s.id === studentId);
    if (student) {
        document.getElementById('editStudentName').value = student.name;
        document.getElementById('editStudentIssue').value = student.issue || '';
        document.getElementById('editStudentId').value = student.id;
        openModal(elements.editStudentModal);
    }
}

function openEditLessonModal() {
    const lessonDetail = state.currentClass.lessonDetails[state.currentLesson] || { title: `Aula ${state.currentLesson + 1}`, observation: '' };
    document.getElementById('lessonTitle').value = lessonDetail.title;
    document.getElementById('lessonObservation').value = lessonDetail.observation;
    openModal(elements.editLessonModal);
}