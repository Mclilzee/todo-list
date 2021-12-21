import Todo from "./todo.js";
import { format } from "date-fns";
const dateFormatter = "kk:mm EEE dd/MM/yyyy";

const items = [];

function createTodoItem(title, description, dueDate, priority) {
  items.push(new Todo(title, description, dueDate, priority));

  populateDOM();
}

function removeTodoItem(id) {
  items.splice(id, 1);

  populateDOM();
}

function getTodoItem(id) {
  return items[id];
}

function populateDOM() {
  const list = document.querySelector("#list");
  document.querySelectorAll(".itemContainer").forEach((container) => {
    list.removeChild(container);
  });

  for (let i = 0; i < items.length; i++) {
    const todoItem = items[i];

    const item = document.createElement("div");
    item.classList.add("itemContainer");
    item.classList.add(`priority-${todoItem.priority}`);

    item.id = i;

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = todoItem.title;
    itemTitle.classList.add("itemTitle");

    const itemDate = document.createElement("h3");
    itemDate.textContent = format(todoItem.dueDate, dateFormatter);
    itemDate.classList.add("itemDate");

    item.appendChild(itemTitle);
    item.appendChild(itemDate);

    list.appendChild(item);
  }
}

export { createTodoItem, removeTodoItem, getTodoItem };
