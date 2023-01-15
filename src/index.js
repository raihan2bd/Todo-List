import './style.css';
import Todos from './modules/todos.js';
import {
  formInput,
  btnSubmit,
  showMsg,
  filterButton,
  todoContainer,
} from './modules/domSelector.js';

// Import necessary assets form source
import enterIcon from './assets/enter-24.png';
import { getAfterElement } from './modules/utils.js';

// Initialize the todos
const todos = new Todos();

// todo submit event using Enter button.
formInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    todos.onSubmit();
  } else {
    showMsg.innerHTML = '';
    showMsg.classList.remove('form-error');
    formInput.classList.remove('invalid');
  }
});

// todo submit event using submit button
btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  todos.onSubmit();
});

// filter all completed list;
filterButton.addEventListener('click', () => {
  todos.onFilterCompletedTodos();
});

// drag over enent;
todoContainer.addEventListener('dragover', (e) => {
  e.preventDefault();
  const getAfterElementPosition = getAfterElement(todoContainer, e.clientY);
  const dragging = todoContainer.querySelector('.dragging');

  if (dragging == null) {
    todoContainer.appendChild(dragging);
  } else {
    todoContainer.insertBefore(dragging, getAfterElementPosition);
  }
});

// Load the todo list on the fly.
window.onload = () => {
  todos.render();
  document.querySelector(
    '.btn-submit',
  ).innerHTML = `<img src='${enterIcon}' alt='submit'/>`;
};
