import { state } from './state.js';
import { renderClasses, updateClassDetails } from './render.js';
import { setupEventListeners } from './eventHandlers.js';

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    renderClasses();
    updateClassDetails();
});