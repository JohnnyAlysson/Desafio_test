import { state, setState } from './state.js';
import { renderStudents, updateClassDetails } from './render.js';

export function toggleAttendance(studentId, lessonIndex) {
    const classIndex = state.classes.findIndex(c => c.id === state.currentClass.id);
    const studentIndex = state.classes[classIndex].students.findIndex(s => s.id === studentId);

    if (!state.classes[classIndex].students[studentIndex].attendance) {
        state.classes[classIndex].students[studentIndex].attendance = [];
    }

    state.classes[classIndex].students[studentIndex].attendance[lessonIndex] = 
        !state.classes[classIndex].students[studentIndex].attendance[lessonIndex];

    updateAttendanceCount(classIndex);
    setState(state);
    renderStudents();
    updateClassDetails();
}

function updateAttendanceCount(classIndex) {
    let lateCount = 0;
    state.classes[classIndex].students.forEach(student => {
        if (student.attendance) {
            lateCount += student.attendance.filter(a => !a).length;
        }
    });
    state.classes[classIndex].late = lateCount;
}