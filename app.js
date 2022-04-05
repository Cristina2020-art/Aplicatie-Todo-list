//GET elements from document
const inputTodo = document.querySelector('.input-todo');
const btnAdd = document.querySelector('.btn-add-todo');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todos');
const deleteAllBtn = document.querySelector('.btn-delete-all');

//Event Listeners

btnAdd.addEventListener('click', addTodos);
todoList.addEventListener('click', deleteTodosAndCheck);
filterOption.addEventListener('click', filterTodos);
deleteAllBtn.addEventListener('click', deleteAllTodos);
document.addEventListener('DOMContentLoaded', getTodos);

//Add todos
function addTodos(e) {
	e.preventDefault();
	if (inputTodo.value == '') {
		const warningDiv = document.createElement('div');
		warningDiv.classList.add('alert-warning');
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('Please fill out the field!'));
		warningDiv.appendChild(p);
		const parent = document.querySelector('.message');
		parent.insertBefore(warningDiv, parent.childNodes[0]);
		setTimeout(() => {
			warningDiv.remove();
		}, 2000);
	} else {
		//create todos div
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('.todo-div');
		//Create list item
		const newTodo = document.createElement('li');
		newTodo.innerText = inputTodo.value;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);
		saveToLocalStorage(inputTodo.value);

		//check button

		const completeBtn = document.createElement('button');
		completeBtn.innerHTML = '<i class="fas fa-check"></i>';
		completeBtn.classList.add('complete-btn');
		todoDiv.appendChild(completeBtn);
		//Delete button
		const deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
		deleteBtn.classList.add('delete-btn');
		todoDiv.appendChild(deleteBtn);
		//Append to the list

		todoList.appendChild(todoDiv);

		const successDiv = document.createElement('div');
		successDiv.classList.add('alert-success');
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('Todo was successfully added!'));
		successDiv.appendChild(p);
		const parent = document.querySelector('.message');
		parent.insertBefore(successDiv, parent.childNodes[0]);

		setTimeout(() => {
			successDiv.remove();
		}, 2000);
	}

	inputTodo.value = '';
}

function deleteTodosAndCheck(e) {
	const item = e.target;
	if (item.classList[0] === 'delete-btn') {
		const todo = item.parentElement;
		todo.classList.add('fall');
		deleteFromLocalStorage(todo);
		todo.addEventListener('transitionend', () => {
			todo.remove();
		});
	}

	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodos(e) {
	const todos = todoList.childNodes;
	todos.forEach(function(todo) {
		switch (e.target.value) {
			case 'all':
				todo.style.display = 'flex';
				break;
			case 'completed':
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case 'uncompleted':
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveToLocalStorage(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteFromLocalStorage(todo) {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	const todoText = todo.children[0].innerHTML;
	const indexOf = todos.indexOf(todoText);
	todos.splice(indexOf, 1);

	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}

	todos.forEach((todo) => {
		//Create Todos Div
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		//Create list item
		const newTodo = document.createElement('li');
		newTodo.innerText = todo;
		newTodo.classList.add('todo-item');
		todoDiv.appendChild(newTodo);

		//Check button
		const completeBtn = document.createElement('button');
		completeBtn.innerHTML = '<i class="fas fa-check"></i>';
		completeBtn.classList.add('complete-btn');
		todoDiv.appendChild(completeBtn);
		//Delete button
		const deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
		deleteBtn.classList.add('delete-btn');
		todoDiv.appendChild(deleteBtn);
		//Append to the list

		todoList.appendChild(todoDiv);
	});
}

function deleteAllTodos(e) {
	e.preventDefault();
	let todos;

	if (localStorage.getItem('todos') === null) {
		todos = [];
		const alarmingDiv = document.createElement('div');
		alarmingDiv.classList.add('alarm-warning');
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('Please add todos!!!'));
		alarmingDiv.appendChild(p);
		const parent = document.querySelector('.message');
		parent.insertBefore(alarmingDiv, parent.childNodes[0]);
		setTimeout(() => {
			alarmingDiv.remove();
		}, 2000);
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
		const alarmingDiv = document.createElement('div');
		alarmingDiv.classList.add('alarm-warning');
		const p = document.createElement('p');
		p.appendChild(document.createTextNode('All todos will be deleted!'));
		alarmingDiv.appendChild(p);
		const parent = document.querySelector('.message');
		parent.insertBefore(alarmingDiv, parent.childNodes[0]);
		setTimeout(() => {
			alarmingDiv.remove();
		}, 2000);
		setTimeout(() => {
			todoList.classList.add('deleted');
			todoList.addEventListener('transitionend', () => {
				todoList.remove();
			});

			todos = localStorage.removeItem('todos');
			window.location.reload();
		}, 3000);
	}
}
