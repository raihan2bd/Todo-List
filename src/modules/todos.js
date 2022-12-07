import { validateForm } from "./utils";
import { todoContainer, formInput, showMsg } from "./domSelector";

// Import necessary assets form source
import threeDotIcon from '../assets/three-dot-24.png';


export default class Todos {
  constructor() {
    if(localStorage.getItem('todos')) {
      this.todos = JSON.parse(localStorage.getItem('todos'));
    } else {
      this.todos = [];
    }
  }

  sortAndSave = () => {
    let todoArr = [...this.todos];
    // sorting the list
    todoArr.sort((a, b) => {
      if (a.index > b.index) {
        return 1;
      } if (a.index < b.index) {
        return -1;
      }
      return 0;
    });

    // rearrange the index
    let index = 0;
    todoArr.forEach((todo) => {
    index += 1;
    todo.index = index;
    });

    this.todos = [...todoArr];
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  // Render todo list
  render = () => {
    this.sortAndSave();
    if(this.todos.length>0) {
      let todoList = '';
      this.todos.forEach((todo) => {
      todoList += `
        <li class='todo-item' id='${todo.index}'>
          <input type="checkbox" id="todo-compleate">
          <p class="todo-des">
            ${todo.description}
          </p>
          <button class="btn-three-dot"><img src="${threeDotIcon}" alt="..."></button>
        </li>
      `
    });

    todoContainer.innerHTML = todoList;
    } else {
      todoContainer.innerHTML = `<p class="no-item">There is no todo to show! Please add a new one.</p>`;
    }
    
  }

  // onSubmit method
  onSubmit = (e) => {
    // Validate the form
    const description = formInput.value;
    const required = true,
    minLength = 3,
    maxLength = 255,
    specialChar = false;
    let isValid = validateForm(description, required, minLength, maxLength, specialChar);

    // Check if form has error or not

    if(isValid.isError === true && isValid.msg.length>=0) {
      showMsg.classList.add('form-error');
      showMsg.textContent = isValid.msg;
      formInput.classList.add('invalid')
    } else {
      // if form is empty add a new todo
      showMsg.classList.remove('form-error');
      showMsg.textContent = '';
      formInput.classList.remove('invalid');
      formInput.value = '';
      const index = this.todos.length + 1 || 1;
      const todo = {
        description,
        completed: false,
        index,
      }
      this.todos = [...this.todos, todo];
      // render the new todos on the dom
      this.render();
    }
  }
    
}