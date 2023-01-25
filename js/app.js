const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes name
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";
//Our variable
let LIST, id;
//get items from local storage
let data = localStorage.getItem("TODO");
//check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
//load items to user interface
function loadList(arr) {
  arr.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}
//clear storage
clear.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});

//Time
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add todo function

function addToDo(todo, id, done, trash) {
  if (trash) {
    return;
  }
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";
  const item = `
  <li class="item">
  <i class="fa ${DONE} co" job="complete" id=${id}></i>
  <p class="text ${LINE}">${todo}</p>
  <i class="fa fa-trash-o de" job="delete" id=${id}></i>
</li>
  `;

  list.insertAdjacentHTML("beforeend", item);
}

//add an item when a user press the enter key

document.addEventListener("keyup", (e) => {
  if (e.keyCode == 13) {
    let todo = input.value;

    if (todo) {
      addToDo(todo, id, false, false);
      LIST.push({
        name: todo,
        id: id,
        done: false,
        trash: false,
      });
      //add items to local storage
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});
//complete to do
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}
// remove to do
function removeTodo(element) {
  element.parentNode.remove();
  LIST[element.id].trash = true;
}
//target the items added dynamically
list.addEventListener("click", (e) => {
  const element = e.target;
  const elementJob = element.attributes.job.value;
  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "delete") {
    removeTodo(element);
  }
  //add items to local storage
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
