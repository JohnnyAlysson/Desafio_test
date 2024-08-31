// Define a estrutura inicial do estado da aplicação
export let state = {
  classes: [
      { 
          id: 1, 
          name: "Matemática - 9º Ano", 
          students: [], 
          late: 0, 
          difficulties: 0, 
          lessons: 12, 
          lessonDetails: [] 
      },
      { 
          id: 2, 
          name: "Português - 10º Ano", 
          students: [], 
          late: 0, 
          difficulties: 0, 
          lessons: 8, 
          lessonDetails: [] 
      },
      { 
          id: 3, 
          name: "Ciências - 8º Ano", 
          students: [], 
          late: 0, 
          difficulties: 0, 
          lessons: 18, 
          lessonDetails: [] 
      }
  ],
  currentClass: null,
  currentLesson: null
};

// Função para atualizar o estado
export function setState(newState) {
  state = { ...state, ...newState };
}

// Função para adicionar uma nova classe
export function addClass(newClass) {
  state.classes.push({
      id: Date.now(),
      ...newClass,
      students: [],
      late: 0,
      difficulties: 0,
      lessonDetails: []
  });
  setState(state);
}

// Função para remover uma classe
export function removeClass(classId) {
  state.classes = state.classes.filter(cls => cls.id !== classId);
  if (state.currentClass && state.currentClass.id === classId) {
      state.currentClass = null;
  }
  setState(state);
}

// Função para adicionar um novo aluno a uma classe
export function addStudent(classId, student) {
  const classIndex = state.classes.findIndex(cls => cls.id === classId);
  if (classIndex !== -1) {
      state.classes[classIndex].students.push({
          id: Date.now(),
          ...student,
          attendance: new Array(state.classes[classIndex].lessons).fill(false),
          difficulties: []
      });
      setState(state);
  }
}

// Função para remover um aluno de uma classe
export function removeStudent(classId, studentId) {
  const classIndex = state.classes.findIndex(cls => cls.id === classId);
  if (classIndex !== -1) {
      state.classes[classIndex].students = state.classes[classIndex].students.filter(student => student.id !== studentId);
      setState(state);
  }
}

// Função para adicionar uma dificuldade a um aluno
export function addDifficulty(classId, studentId, difficulty) {
  const classIndex = state.classes.findIndex(cls => cls.id === classId);
  if (classIndex !== -1) {
      const studentIndex = state.classes[classIndex].students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
          state.classes[classIndex].students[studentIndex].difficulties.push({
              id: Date.now(),
              description: difficulty,
              resolved: false
          });
          state.classes[classIndex].difficulties += 1;
          setState(state);
      }
  }
}

// Função para marcar uma dificuldade como resolvida ou não resolvida
export function toggleDifficultyResolved(classId, studentId, difficultyId) {
  const classIndex = state.classes.findIndex(cls => cls.id === classId);
  if (classIndex !== -1) {
      const studentIndex = state.classes[classIndex].students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
          const difficultyIndex = state.classes[classIndex].students[studentIndex].difficulties.findIndex(d => d.id === difficultyId);
          if (difficultyIndex !== -1) {
              const wasResolved = state.classes[classIndex].students[studentIndex].difficulties[difficultyIndex].resolved;
              state.classes[classIndex].students[studentIndex].difficulties[difficultyIndex].resolved = !wasResolved;
              state.classes[classIndex].difficulties += wasResolved ? 1 : -1;
              setState(state);
          }
      }
  }
}

// Função para remover uma dificuldade de um aluno
export function removeDifficulty(classId, studentId, difficultyId) {
  const classIndex = state.classes.findIndex(cls => cls.id === classId);
  if (classIndex !== -1) {
      const studentIndex = state.classes[classIndex].students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
          const difficultyIndex = state.classes[classIndex].students[studentIndex].difficulties.findIndex(d => d.id === difficultyId);
          if (difficultyIndex !== -1) {
              if (!state.classes[classIndex].students[studentIndex].difficulties[difficultyIndex].resolved) {
                  state.classes[classIndex].difficulties -= 1;
              }
              state.classes[classIndex].students[studentIndex].difficulties.splice(difficultyIndex, 1);
              setState(state);
          }
      }
  }
}

// Função para atualizar a presença de um aluno
export function updateAttendance(classId, studentId, lessonIndex, isPresent) {
  const classIndex = state.classes.findIndex(cls => cls.id === classId);
  if (classIndex !== -1) {
      const studentIndex = state.classes[classIndex].students.findIndex(s => s.id === studentId);
      if (studentIndex !== -1) {
          state.classes[classIndex].students[studentIndex].attendance[lessonIndex] = isPresent;
          updateLateCount(classIndex);
          setState(state);
      }
  }
}

// Função auxiliar para atualizar a contagem de atrasos de uma classe
function updateLateCount(classIndex) {
  let lateCount = 0;
  state.classes[classIndex].students.forEach(student => {
      lateCount += student.attendance.filter(a => !a).length;
  });
  state.classes[classIndex].late = lateCount;
}