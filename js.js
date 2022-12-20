//Seleçao de elementos
const todoForm = document.querySelector('#todo-form');
//SHIFT+ALT+ PRA BAIXO
//seleciona o igual e "CTRL+D" para selecionar a outra sequencia ao mesmo tempo
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editIput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');

//Funçoes
//criaçao de div para adicionar task e seus botoes
const saveTodo = (text) => {
    const todo = document.createElement('div')
    todo.classList.add('todo')

    const todoTittle = document.createElement('h3')
    todoTittle.innerText = text
    todo.appendChild(todoTittle)

    const doneBtn = document.createElement('button')
    doneBtn.classList.add('finish-todo')
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)
   
    const editBtn = document.createElement('button')
    editBtn.classList.add('edit-todo')
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)
    
    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('remove-todo')
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)
    
    //Limpar Input apos adicionar uma task e apos adicionar voltar o foco no input.
    todoInput.value = "";
    todoInput.focus();
}

//Eventos
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value

  if(inputValue){
    saveTodo(inputValue)
  }
});
