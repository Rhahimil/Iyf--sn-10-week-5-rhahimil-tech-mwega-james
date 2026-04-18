// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const itemsLeft = document.getElementById("items-left");
const filters = document.querySelectorAll(".filter");
const clearCompletedBtn = document.getElementById("clear-completed");

// State
let todos = [];
let currentFilter = "all";
let nextId = 1;

// Functions
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    li.dataset.id = todo.id;

    const textSpan = document.createElement("span");
    textSpan.className = "todo-text";
    textSpan.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTodo(todo.id);
    });

    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    // Double-click to edit
    li.addEventListener("dblclick", () => startEditing(todo.id, textSpan));

    return li;
}

function startEditing(id, textSpan) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = textSpan.textContent;
    input.className = "edit-input";

    textSpan.replaceWith(input);
    input.focus();
    input.select();

    const saveEdit = () => {
        const newText = input.value.trim();
        if (newText) {
            updateTodoText(id, newText);
        } else {
            deleteTodo(id);
        }
    };

    const cancelEdit = () => {
        const newSpan = document.createElement("span");
        newSpan.className = "todo-text";
        newSpan.textContent = textSpan.textContent;
        input.replaceWith(newSpan);
    };

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveEdit();
        } else if (e.key === "Escape") {
            cancelEdit();
        }
    });

    input.addEventListener("blur", saveEdit);
}

function updateTodoText(id, newText) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.text = newText;
        renderTodos();
    }
}

function renderTodos() {
    todoList.innerHTML = "";

    const filteredTodos = todos.filter(todo => {
        if (currentFilter === "active") return !todo.completed;
        if (currentFilter === "completed") return todo.completed;
        return true;
    });

    filteredTodos.forEach(todo => {
        const li = createTodoElement(todo);
        todoList.appendChild(li);
    });

    updateStats();
}

function addTodo(text) {
    if (!text.trim()) return;

    const todo = {
        id: nextId++,
        text: text.trim(),
        completed: false
    };

    todos.push(todo);
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

function updateStats() {
    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

function filterTodos(filter) {
    currentFilter = filter;
    filters.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === filter);
    });
    renderTodos();
}

function clearCompleted() {
    todos = todos.filter(t => !t.completed);
    renderTodos();
}

// Event Listeners
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
        addTodo(text);
        input.value = "";
    }
});

todoList.addEventListener("click", function(event) {
    const li = event.target.closest(".todo-item");
    if (li && !event.target.classList.contains("delete-btn")) {
        const id = parseInt(li.dataset.id);
        toggleTodo(id);
    }
});

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filterTodos(btn.dataset.filter);
    });
});

clearCompletedBtn.addEventListener("click", clearCompleted);

// Initialize
renderTodos();