import Todo from "./todo.js";
import { format } from "date-fns";
import { filledForm } from "./form.js";
const dateFormatter = "p PP";

const items = [];

function createTodoItem(title, description, dueDate) {
  items.push(new Todo(title, description, dueDate));

  populateDOM();
}

function removeTodoItem(id) {
  items.splice(id, 1);

  populateDOM();
}

function changeInformation(todoItem, title, desc, date) {
  todoItem.editValues(title, desc, date);

  populateDOM();
}

function populateDOM() {
  document.body.removeChild(document.getElementById("list"));

  const list = document.createElement("div");
  list.id = "list";

  for (let i = 0; i < items.length; i++) {
    const todoItem = items[i];

    const item = document.createElement("div");
    item.classList.add("itemContainer");
    item.classList.add(`priority-${todoItem.priority}`);

    const itemTitle = document.createElement("h3");
    itemTitle.textContent = todoItem.title;
    itemTitle.id = i;
    itemTitle.classList.add("itemTitle");

    itemEventListener(itemTitle, todoItem);

    const itemDate = document.createElement("h3");
    itemDate.textContent = format(todoItem.dueDate, dateFormatter);
    itemDate.classList.add("itemDate");
    dateEventListener(itemDate, todoItem);

    if (todoItem.complete) {
      itemTitle.classList.add("complete");
      itemDate.classList.add("complete");
    }

    item.appendChild(itemTitle);
    item.appendChild(itemDate);

    list.appendChild(item);
  }

  document.body.appendChild(list);
}

function dateEventListener(element, todoItem) {
  element.addEventListener(
    "click",
    (e) => {
      const form = document.createElement("form");
      const datePicker = document.createElement("input");
      datePicker.name = "date";
      datePicker.type = "datetime-local";

      form.appendChild(datePicker);
      element.appendChild(form);

      form.addEventListener("change", (e) => {
        const dateTime = new Date(form.date.value);
        changeInformation(
          todoItem,
          todoItem.title,
          todoItem.description,
          dateTime
        );
      });
    },
    { once: true }
  );
}

function itemEventListener(element, todoItem) {
  element.addEventListener("click", (e) => {
    filledForm(todoItem);
  });
}

function toggleComplete(todoItem) {
  todoItem.complete = !todoItem.complete;
  populateDOM();
}

export { createTodoItem, removeTodoItem, changeInformation, toggleComplete };
