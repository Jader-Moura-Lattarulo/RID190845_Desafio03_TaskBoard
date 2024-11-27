let tasks = [
    {id: 1, description: 'Implementar tela de listagem de tarefas', tag: 'frontend', date: '27/11/2024', done: false},
    {id: 2, description: 'Criar endpoint para cadastro de tarefas', tag: 'backend', date: '27/11/2024', done: false},
    {id: 3, description: 'Implementar protótiopo da listagem de tarefas', tag: 'ux', date: '27/11/2024', done: true}
]

window.onload = () => {    
    tasks.forEach((task) => {
        const list = document.getElementById('task-list');

        const taskList = document.createElement('li');

        taskList.textContent = task.description;

        list.appendChild(taskList);
    });    
}