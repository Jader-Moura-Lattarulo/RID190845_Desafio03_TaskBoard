const saveTaskBtn = document.querySelector('#save-task');

tasks = [];

const progressCounter = () => {
    const completedTaksCounterDisplay = document.getElementById('task-footer');
    const tasks = getTasksFromLocalStorage();

    const doneTasks = tasks.filter(({ done }) => done).length;
    let text;

    if (doneTasks === 0) text = `Nenhuma tarefa concluída`;
    if (doneTasks === 1) text = `${doneTasks} tarefa concluída`;
    if (doneTasks >= 2) text = `${doneTasks} tarefas concluídas`;

    completedTaksCounterDisplay.textContent = text;
} 

const getTasksFromLocalStorage = () => {
    const localTasks = JSON.parse(localStorage.getItem('tasks'));
    return localTasks ? localTasks : [];
}

const updateTaskList = () => {

    const newTaskList = getTasksFromLocalStorage();
    
    if(newTaskList.length > 0) {
        const taskList = document.getElementById('task-list');
        
        taskList.innerHTML = '';

        newTaskList.forEach((task, index) => {
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
            
            if (!task.done) {
                const buttonContainer = document.createElement('div');
                buttonContainer.classList.add('button-container');

                const concludeBtn = document.createElement('button');
                concludeBtn.classList.add('conclude-btn');
                concludeBtn.textContent = 'Concluir';
                concludeBtn.addEventListener('click', () => taskDone(task.id));
                buttonContainer.appendChild(concludeBtn);
                
                const checkedMark = document.createElement('div');
                checkedMark.classList.add('checked-mark', 'hidden-mark');
                
                const checkedImg = document.createElement('img');
                checkedImg.src = '/images/checked-mark.svg';
                checkedImg.alt = 'checked-mark';
                checkedMark.appendChild(checkedImg);
                buttonContainer.appendChild(checkedMark);
                componentContainer.appendChild(textContainer);
                componentContainer.appendChild(buttonContainer);
            } else {
                const buttonContainer = document.createElement('div');
                                
                const checkedMark = document.createElement('div');
                checkedMark.classList.add('checked-mark');
                
                const checkedImg = document.createElement('img');
                checkedImg.src = '/images/checked-mark.svg';
                checkedImg.alt = 'checked-mark';
                checkedMark.appendChild(checkedImg);
                buttonContainer.appendChild(checkedMark);
                componentContainer.appendChild(textContainer);
                componentContainer.appendChild(buttonContainer);
            }
            
            taskItem.appendChild(componentContainer);
            list.appendChild(taskItem);
        });    
    }
}

const getTaskDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}

const getNewTaskId = () => {
    const taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    const lastId = taskList[taskList.length - 1]?.id;

    return lastId ? lastId + 1 : 1;
}

const createTask = (description, tag) => {
    const tasks = getTasksFromLocalStorage();
    const id = getNewTaskId();
    const date = getTaskDate();

    const newTask = {id: id, description: description, tag: tag, date: date, done: false};

    console.log(newTask);

    tasks.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasks));

    updateTaskList(tasks);
    progressCounter();
}

saveTaskBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const description = document.querySelector('#descriptionInput').value;
    const tag = document.querySelector('#tagInput').value;

    createTask(description, tag);
});

taskDone = (taskId) => {
    const task = document.getElementById(`task-${taskId}`);
    
    task.done = true;
    
    progressCounter();
    markDone(taskId);
}

const markDone = (taskId) =>{ 

    const taskList = getTasksFromLocalStorage();
    const taskIndex = taskList.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        taskList[taskIndex].done = true;
        localStorage.setItem('tasks', JSON.stringify(taskList));
        updateTaskList();
        progressCounter();
    }
}

window.onload = () => {    
    updateTaskList();
    progressCounter();
}
