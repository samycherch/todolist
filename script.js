// Récupère les éléments du DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Fonction pour ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Veuillez entrer une tâche !');
        return;
    }

    // Crée un élément <li>
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <button id="btn1" onclick="markAsDone(this)">✓</button>
        <button id="btn2" onclick="deleteTask(this)">✗</button>
    `;


    // Ajoute la tâche à la liste
    taskList.appendChild(li);

    // Vide l'input
    taskInput.value = '';
    taskInput.focus();
}

// Fonction pour supprimer une tâche
function markAsDone(btn) {
    const taskItem = btn.parentElement;
    taskItem.classList.toggle('completed');

    if (taskItem.classList.contains('completed')) {
        btn.textContent = '↩';
        btn.title = 'Non terminée';
        btn.style.backgroundColor = '#3309b2';
    } else {
        btn.textContent = '✓';
        btn.title = 'Terminée';
        btn.style.backgroundColor = '#2ecc71';
    }
}
function deleteTask(btn) {
    btn.parentElement.remove();
}

// Ajoute un événement au bouton
addBtn.addEventListener('click', addTask);

// Ajoute un événement pour ajouter avec la touche Entrée
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Fonction pour marquer une tâche comme terminée
taskList.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        e.target.classList.toggle('completed');
    }
});