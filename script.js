// Récupère les éléments du DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const plannedList = document.getElementById('plannedList');
const inProgressList = document.getElementById('inProgressList');
const doneList = document.getElementById('doneList');

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = createTaskItem(taskText, 'planned');
    plannedList.appendChild(li);

    taskInput.value = '';
    taskInput.focus();
}

function createTaskItem(taskText, status) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
            ${status === 'planned' ? '<button class="start-btn" onclick="moveToInProgress(this)">✓</button>' : ''}
            ${status === 'in-progress' ? '<button class="finish-btn" onclick="moveToDone(this)">✓</button><button class="redo-btn" onclick="moveToPlanned(this)">↺</button>' : ''}
            ${status === 'done' ? '<button class="redo-btn" onclick="moveToInProgress(this)">↺</button>' : ''}
            <button class="delete-btn" onclick="deleteTask(this)">✕</button>
        </div>
    `;
    return li;
}

function moveToInProgress(btn) {
    const taskItem = btn.closest('li');
    const taskText = taskItem.querySelector('span').textContent;
    const newItem = createTaskItem(taskText, 'in-progress');
    inProgressList.appendChild(newItem);
    taskItem.remove();
}

function moveToDone(btn) {
    const taskItem = btn.closest('li');
    const taskText = taskItem.querySelector('span').textContent;
    const newItem = createTaskItem(taskText, 'done');
    doneList.appendChild(newItem);
    taskItem.remove();
}

function moveToPlanned(btn) {
    const taskItem = btn.closest('li');
    const taskText = taskItem.querySelector('span').textContent;
    const newItem = createTaskItem(taskText, 'planned');
    plannedList.appendChild(newItem);
    taskItem.remove();
}

let taskToDelete = null;

function deleteTask(btn) {
    taskToDelete = btn.closest('li');
    document.getElementById('confirmModal').classList.add('active');
}

function confirmDelete() {
    if (taskToDelete) {
        taskToDelete.remove();
        taskToDelete = null;
    }
    hideModal();
}

function hideModal() {
    document.getElementById('confirmModal').classList.remove('active');
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.getElementById('confirmDelete').addEventListener('click', confirmDelete);
document.getElementById('cancelDelete').addEventListener('click', hideModal);

