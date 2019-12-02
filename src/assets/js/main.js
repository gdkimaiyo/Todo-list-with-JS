// Const Variables
const form = document.querySelector('form');
const ol = document.querySelector('ol');
const input = document.querySelector('#todoItem');
// Other Variables
let allTodos;

if (localStorage.getItem("todos")) {
  allTodos = JSON.parse(localStorage.getItem("todos"));
} else {
  allTodos = [];
}

// assign allTodos
localStorage.setItem("todos",JSON.stringify(allTodos));

// localStorage.clear();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (typeof(Storage) !== "undefined") {
    const inputTxt = input.value.trim();
    if (inputTxt !== '') {
      addTodos(inputTxt);
      // Reset and focus input
      input.value = "";
      input.focus();
    }
  } else {
    // No web storage Support.
    console.log("No Web Storage Support!");
  }
});

// Display all existing information
console.log(allTodos);
allTodos.forEach(item => {
  todoGenerator(item.task,item.id);
});

// Mark Todo task as complete
const list = document.querySelector('.todo-list');
list.addEventListener('click', (e) => {
  e.preventDefault();

  if (e.target.classList.contains('to-check')) {
    const todoKey = e.target.parentElement.dataset.key;
    taskCompleted(todoKey);
  }
});


// Functions
// Adding a Todo
function addTodos(text) {
  const newTodo = {
    id: allTodos.length > 0 ? allTodos[allTodos.length - 1].id + 1 : 1,
    task: text,
    completed: false
  };
  allTodos.push(newTodo);
  console.log(newTodo);

  localStorage.setItem("todos",JSON.stringify(allTodos));
  todoGenerator(newTodo.task, newTodo.id);
}

// Todo Generator
function todoGenerator(todo,id) {
  const li = document.createElement('li');
  li.setAttribute('data-key',id);

  // checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  const label = document.createElement('label');
  label.setAttribute('for',id);
  label.classList.add('check', 'to-check');
  // Span to hold Todo task
  const span = document.createElement('span');
  span.textContent = todo;
  // Delete button
  const delBtn = document.createElement('button');
  delBtn.classList.add('danger-btn', 'to-delete');
  delBtn.textContent = 'X';

  li.appendChild(delBtn);
  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(span);

  ol.appendChild(li);
}

// Task completed method
function taskCompleted(key) {
  const indx = allTodos.findIndex(item => item.id === Number(key));
  allTodos[indx].completed = !allTodos[indx].completed;

  const item = document.querySelector(`[data-key='${key}']`);
  if (allTodos[indx].completed) {
    item.classList.add('done');
  } else {
    item.classList.remove('done');
  }
}
