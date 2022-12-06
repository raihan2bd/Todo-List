import './style.css';

// Import necessary assets form source
import enterIcon from './assets/enter-24.png';
import threeDotIcon from './assets/three-dot-24.png';

class Todos {
  constructor() {
    this.todos = [
      {
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        completed: false,
        index: 0,
      },
      {
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        completed: false,
        index: 1,
      },
      {
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit.',
        completed: false,
        index: 2,
      },
    ];
  }

  sortList = () => {
    this.todos = this.todos.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } if (a.index < b.index) {
        return -1;
      }
      return 0;
    });
  }

  render = () => {
    this.sortList();
    const todoContainer = document.querySelector('.todo-items-gropu');
    this.todos.forEach((todo) => {
      const todoItem = document.createElement('li');
      todoItem.className = 'todo-item';
      todoItem.id = todo.index;
      todoItem.innerHTML = `<input type="checkbox" id="todo-compleate"
      >
      <p class="todo-des">
        ${todo.description}
      </p>
      <button class="btn-three-dot"><img src="${threeDotIcon}" alt="..."></button>`;

      todoContainer.appendChild(todoItem);
    });
  }
}

const todos = new Todos();

window.onload = () => {
  todos.render();
  document.querySelector('.btn-submit').innerHTML = `<img src='${enterIcon}' alt='submit'/>`;
};