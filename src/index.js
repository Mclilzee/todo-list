import {endOfWeek, startOfToday, startOfTomorrow} from 'date-fns';
import {newForm} from './form';
import './style.css';
import {createTodoItem} from './todoItemsDOM';

const addTodoButton = document.createElement('button');
addTodoButton.textContent = 'New Todo';
addTodoButton.id = 'addTodoItem';
newForm(addTodoButton);

document.body.appendChild(addTodoButton);

const items = JSON.parse(localStorage.getItem('items'));
if (items) {
  items.forEach((item) => {
    createTodoItem(item.title, item.description, new Date(item.dueDate));
  });
} else {
  createTodoItem(
      'Click me for Information',
      'Create new Todo Items with "New Todo" ' +
      ' button, delete items and change their' +
      ' values by clicking on them. change date by clicking on the date',
      startOfTomorrow(),
  );
  createTodoItem(
      'Color depends on due Date',
      'Red for today, orange for Tommorow, green ' +
      'for after Tommorow, and grey means time is due',
      startOfToday(),
  );
  createTodoItem('Go Swimming', 'very Old', new Date(endOfWeek(2)));
}
