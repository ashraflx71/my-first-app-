// مصفوفة لتخزين المهام
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    
    if (taskText !== "") {
        tasks.push({ text: taskText, completed: false });
        input.value = "";
        updateTasks();
        saveTasks();
    }
}

function updateTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">×</button>
        `;
        taskList.appendChild(li);
    });
    
    checkCelebration();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateTasks();
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTasks();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// ميزة الاحتفال 🎉
function checkCelebration() {
    const allDone = tasks.length > 0 && tasks.every(t => t.completed);
    if (allDone) {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// تحميل المهام عند فتح الصفحة
window.onload = updateTasks;
