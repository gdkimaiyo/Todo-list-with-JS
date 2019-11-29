// Const Variables
const form = document.querySelector('form');
const ol = document.querySelector('ol');
const input = document.getElementById('todoItem');
// Other Variables
let newTodos;

if (localStorage.getItem("todos")) {
  newTodos = JSON.parse(localStorage.getItem("todos"));
} else {
  newTodos = [];
}

// assign allTodos
localStorage.setItem("todos",JSON.stringify(newTodos));
const allTodos = JSON.parse(localStorage.getItem("todos"));

form.addEventListener('submit', function addTodo(e) {
  e.preventDefault();

  // TODO:
  if (input.value.length > 0) {
    if (typeof(Storage) !== "undefined") {
      const lastId = allTodos.length > 0 ? allTodos.length - 1 : 0;
      const id = lastId + 1;
      const completed = false;
      const task = input.value;

      const newTask = {id, task, completed};
      newTodos.push(newTask);
      console.log(newTask);

      localStorage.setItem("todos",JSON.stringify(newTodos));
      todoGenerator(newTask.task);

      input.value = "";
    } else {
      // No web storage Support.
      console.log("No web storage Support!");
    }
  }

});

// Display all existing information
console.log(allTodos);
allTodos.forEach(item => {
  todoGenerator(item.task);
});

const myli = document.querySelectorAll('li');
for (var i=0; i<myli.length; i++) {
  if (i > 0) {
    myli[i].addEventListener('click',function(e) {
      e.preventDefault();
    });
  }
}




function todoGenerator(todo) {
  const li = document.createElement('li');
  li.textContent = todo;
  ol.appendChild(li);
}
