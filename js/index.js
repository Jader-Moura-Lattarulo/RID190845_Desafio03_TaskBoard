let tasks = [
    { id: 1, description: 'Implementar tela de listagem de tarefas', tag: 'frontend', date: '27/11/2024', done: false },
    { id: 2, description: 'Criar endpoint para cadastro de tarefas', tag: 'backend', date: '27/11/2024', done: false },
    { id: 3, description: 'Implementar protótipo da listagem de tarefas', tag: 'ux', date: '27/11/2024', done: true }
];

const markDone = (taskId) =>{ 
    const taskItem = document.getElementById(`task-${taskId}`);
    const taskTitle = taskItem.querySelector('.component-title');
    const button = taskItem.querySelector('.conclude-btn');
    const chekedMark = taskItem.querySelector('.checked-mark');
    
    taskTitle.style.color ='#B1BACB';
    taskTitle.style.textDecorationLine = 'line-through';
    button.classList.add('hidden-button');
    chekedMark.classList.remove('hidden-mark');
}

window.onload = () => {    
    tasks.forEach((task, index) => {
        const list = document.getElementById('task-list');

        const taskItem = document.createElement('li');
        taskItem.classList.add('taskItem');
        taskItem.id = `task-${index + 1}`;

        const componentContainer = document.createElement('div');
        componentContainer.classList.add('component-container');

        const textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        const taskTitle = document.createElement('h2');
        taskTitle.id = 'taskTitle';
        taskTitle.classList.add('component-title');
        taskTitle.textContent = task.description;

        const tagDateContainer = document.createElement('div');
        tagDateContainer.classList.add('tag_date-container');

        const tag = document.createElement('p');
        tag.id = 'tag';
        tag.textContent = task.tag;

        const date = document.createElement('p');
        date.id = 'date';
        date.textContent = `Criado em: ${task.date}`;

        tagDateContainer.appendChild(tag);
        tagDateContainer.appendChild(date);

        textContainer.appendChild(taskTitle);
        textContainer.appendChild(tagDateContainer);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const concludeBtn = document.createElement('button');
        concludeBtn.classList.add('conclude-btn');
        concludeBtn.textContent = 'Concluir';
        concludeBtn.addEventListener('click', () => markDone(task.id));

        const checkedMark = document.createElement('div');
        checkedMark.classList.add('checked-mark', 'hidden-mark');

        const checkedImg = document.createElement('img');
        checkedImg.src = '/images/checked-mark.svg';
        checkedImg.alt = 'checked-mark';
        checkedMark.appendChild(checkedImg);

        buttonContainer.appendChild(concludeBtn);
        buttonContainer.appendChild(checkedMark);

        componentContainer.appendChild(textContainer);
        componentContainer.appendChild(buttonContainer);

        taskItem.appendChild(componentContainer);
        list.appendChild(taskItem);
    });    
}
