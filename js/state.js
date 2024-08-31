export let state = {
  classes: [
      { id: 1, name: "Matemática - 9º Ano", students: [], late: 0, difficulties: 0, lessons: 12, lessonDetails: [] },
      { id: 2, name: "Português - 10º Ano", students: [], late: 0, difficulties: 0, lessons: 8, lessonDetails: [] },
      { id: 3, name: "Ciências - 8º Ano", students: [], late: 0, difficulties: 0, lessons: 18, lessonDetails: [] }
  ],
  currentClass: null,
  currentLesson: null
};

export function setState(newState) {
  state = { ...state, ...newState };
}