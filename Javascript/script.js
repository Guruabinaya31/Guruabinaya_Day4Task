// Get references to DOM elements
const taskInput = document.getElementById('myInput');
const addTaskBtn = document.querySelector('.addbtn');
const taskList = document.getElementById('myUL');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('todoTasks')) || [];

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) {
            li.classList.add('checked');
        }
        li.textContent = task.text;
        
        // Create delete button
        const deleteSpan = document.createElement('span');
        deleteSpan.innerHTML = '&times;';
        deleteSpan.className = 'close';
        deleteSpan.onclick = () => {
            tasks.splice(index, 1);
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
            renderTasks();
        };
        li.appendChild(deleteSpan)
        li.onclick = () => {
            task.completed = !task.completed;
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
            renderTasks();
        };
        taskList.appendChild(li);
    });
}

// Function to add a new task
function newElement() {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        tasks.push({ 
            text: taskText, 
            completed: false 
        });
        
        // Save to localStorage
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        
        // Clear input
        taskInput.value = '';
        
        // Re-render tasks
        renderTasks();
    } else {
        alert("You must write something!");
    }
}

// Add click event to the add button
addTaskBtn.onclick = newElement;

renderTasks();