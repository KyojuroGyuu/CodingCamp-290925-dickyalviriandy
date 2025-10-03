/// Initialize an empty array to store todo items
let todos = [];

function addTodo() {
    /// Get input values
    const todoInput = document.getElementById("todo-input");
    const todoDate = document.getElementById("todo-date");
    const todo = todoInput.value;
    const date = todoDate.value;    
    /// Validate input fields
    if (!validateInput(todo, date)) return;
    /// Create a new todo object
    const newTodo = {
        task: todo,
        date: date
    };
    /// Add the new todo to the todos array
    todos.push(newTodo);
    /// Clear input fields
    todoInput.value = '';
    todoDate.value = '';
    /// Render the updated todo list
    renderTodo();
}

function renderTodo() {
    /// Get the todo list container
    const todoList = document.getElementById("todo-list-body");

    /// Clear existing list
    todoList.innerHTML = '';

    /// Render each todo item
    todos.forEach((todo, index) => {
        let listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td class="py-2 px-4 border-b">${todo.task}</td>
            <td class="py-2 px-4 border-b">${todo.date}</td>
            <td class="py-2 px-4 border-b">${todo.status || 'Pending'}</td>
            <td class="py-2 px-4 border-b">
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTodo(${index})">Delete</button>
            </td>
        `;
        todoList.appendChild(listItem);
    });
}

function deleteAllTodo() {
    /// Clear the todos array
    todos = [];                 
    /// Render the empty todo list
    renderTodo();
}

function filterTodo() { 
    /// Get the filter date value
    const filterDate = document.getElementById('filter-date').value;
    if (!filterDate) {
        renderTodo(); 
        return;
    }
    const filteredTodos = todos.filter(todo => todo.date === filterDate);
    renderFilteredTodoList(filteredTodos);
}

function renderFilteredTodoList(filteredTodos) {
    /// Get the todo list container
    const todoList = document.getElementById("todo-list-body");
    /// Clear existing list
    todoList.innerHTML = '';
    /// Render each filtered todo item
    filteredTodos.forEach((todo, index) => {
        let listItem = document.createElement('tr');
        listItem.innerHTML = `
            <td class="py-2 px-4 border-b">${todo.task}</td>
            <td class="py-2 px-4 border-b">${todo.date}</td>
            <td class="py-2 px-4 border-b">${todo.status || 'Pending'}</td>
            <td class="py-2 px-4 border-b">
                <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="deleteTodo(${index})">Delete</button>
            </td>
        `;
        todoList.appendChild(listItem);
    });
}

/// Validate input fields
function validateInput(todo, date) {
    if (todo.trim() === '' || date.trim() === '') {
        alert("Please fill in both the task and date fields.");
        return false;
    }
    return true;
}

/// Delete a specific todo item by index
function deleteTodo(index) {
    /// Remove the todo item at the specified index
    todos.splice(index, 1);
    /// Render the updated todo list
    renderTodo();
}