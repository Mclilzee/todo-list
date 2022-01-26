import {
  changeInformation,
  createTodoItem,
  toggleComplete,
  removeTodoItem,
} from "./todoItemsDOM";
import { format } from "date-fns";

function newForm(element) {
  element.addEventListener("click", () => {
    element.style.pointerEvents = "none";
    const formContainer = defaultView();
    const formChildren = formContainer.childNodes;
    const form = formChildren[1];

    formChildren[0].addEventListener("click", () => {
      document.body.removeChild(formContainer);
      element.style.pointerEvents = "auto";
    });

    document.body.appendChild(formContainer);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = e.target.titleInput.value;
      const description = e.target.textArea.value;
      const date = e.target.datePicker.value;

      createTodoItem(title, description, new Date(date));

      document.body.removeChild(formContainer);
      element.style.pointerEvents = "auto";
    });
  });
}

function filledForm(todoItem, index) {
  const isComplete = todoItem.complete;

  const formContainer = defaultView(true, isComplete);
  const formChildren = formContainer.childNodes;
  const form = formChildren[2];

  form.titleInput.value = todoItem.title;
  form.textArea.value = todoItem.description;
  form.datePicker.value = format(todoItem.dueDate, "yyyy-MM-dd'T'HH:mm");
  form.submitButton.value = "Apply Changes";

  formChildren[0].addEventListener("click", () => {
    document.body.removeChild(formContainer);
    document.getElementById("addTodoItem").style.pointerEvents = "auto";
  });

  formChildren[1].addEventListener("click", () => {
    toggleComplete(todoItem);
    document.body.removeChild(formContainer);
    document.getElementById("addTodoItem").style.pointerEvents = "auto";

  });

  formChildren[3].addEventListener("click", () => {
    removeTodoItem(index);
    document.body.removeChild(formContainer);
    document.getElementById("addTodoItem").style.pointerEvents = "auto";

  });

  document.body.appendChild(formContainer);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitter = e.submitter.value;
    const title = e.target.titleInput.value;
    const description = e.target.textArea.value;
    const date = e.target.datePicker.value;

    changeInformation(todoItem, title, description, new Date(date));
    document.body.removeChild(formContainer);
    document.getElementById("addTodoItem").style.pointerEvents = "auto";
  });
}

function defaultView(includeButtons, isComplete) {
  const formContainer = document.createElement("div");
  formContainer.id = "newTodoForm";
  const formCloseButton = document.createElement("button");
  formCloseButton.textContent = "X";
  formCloseButton.id = "formCloseButton";
  formContainer.appendChild(formCloseButton);

  if (includeButtons) {
    const completeButton = document.createElement("button");
    completeButton.classList.add("acitvityButton");
    completeButton.id = "completeButton";
    if (isComplete) {
      completeButton.textContent = "Set Active";
    } else {
      completeButton.textContent = "Set Complete";
    }

    formContainer.appendChild(completeButton);
  }
  const titleLabel = document.createElement("label");
  titleLabel.textContent = "Title:";
  const titleInput = document.createElement("input");
  titleInput.autocomplete = "off";
  titleInput.type = "text";
  titleInput.name = "titleInput";
  titleInput.id = "titleInput";
  titleInput.required = true;

  const textAreaLable = document.createElement("label");
  textAreaLable.textContent = "Description:";
  const textArea = document.createElement("textarea");
  textArea.autocomplete = "off";
  textArea.id = "textAreaInput";
  textArea.name = "textArea";
  textArea.rows = 20;
  textArea.cols = 100;

  const datePicker = document.createElement("input");
  datePicker.id = "dateInput";
  datePicker.name = "datePicker";
  datePicker.type = "datetime-local";
  datePicker.required = true;
  datePicker.max = "9999-12-31T23:59";

  const submitButton = document.createElement("input");
  submitButton.name = "submitButton";
  submitButton.value = "Add Item";
  submitButton.id = "submitButtonInput";
  submitButton.type = "submit";

  const form = document.createElement("form");
  form.name = "form";

  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(textAreaLable);
  form.appendChild(textArea);
  form.appendChild(datePicker);
  form.appendChild(submitButton);

  formContainer.appendChild(form);

  if (includeButtons) {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Activity";
    deleteButton.classList.add("acitvityButton");
    deleteButton.classList.add("deleteButton");
    formContainer.appendChild(deleteButton);
  }

  return formContainer;
}

export { newForm, filledForm };
