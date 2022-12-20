//------------------Seleçao de elementos------------------
const todoForm = document.querySelector('#todo-form');
//SHIFT+ALT+ PRA BAIXO
//seleciona o igual e "CTRL+D" para selecionar a outra sequencia ao mesmo tempo
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const editForm = document.querySelector('#edit-form');
const editIput = document.querySelector('#edit-input');
const cancelEditBtn = document.querySelector('#cancel-edit-btn');
const searchInput = document.querySelector('#search-input');
const eraseBtn = document.querySelector('#erase-button');
const filterBtn = document.querySelector('#filter-select');
let oldInputValue;

//------------------Funçoes------------------
//criaçao de div para adicionar task e seus botoes
const saveTodo = (text, done = 0, save = 1) => {
  const todo = document.createElement('div');
  todo.classList.add('todo');

  const todoTittle = document.createElement('h3');
  todoTittle.innerText = text;
  todo.appendChild(todoTittle);

  const doneBtn = document.createElement('button');
  doneBtn.classList.add('finish-todo');
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
  todo.appendChild(doneBtn);

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-todo');
  editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
  todo.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('remove-todo');
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  todo.appendChild(deleteBtn);

  // Utilizando dados da localStorage
  if (done) {
    todo.classList.add('done');
  }

  if (save) {
    saveTodoLocalStorage({ text, done: 0 });
  }

  todoList.appendChild(todo);

  //Limpar Input apos adicionar uma task e apos adicionar voltar o foco no input.
  todoInput.value = '';
  todoInput.focus();
};
const toggleForms = () => {
  editForm.classList.toggle('hide');
  todoForm.classList.toggle('hide');
  todoList.classList.toggle('hide');
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll('.todo');

  todos.forEach((todo) => {
    let todoTittle = todo.querySelector('h3');
    if (todoTittle.innerText === oldInputValue) {
      todoTittle.innerText = text;
      // Utilizando dados da localStorage
      updateTodoLocalStorage(oldInputValue, text);
    }
  });
};

const getSearchedTodos = (search) => {
  const todos = document.querySelectorAll('.todo');

  todos.forEach((todo) => {
    const todoTitle = todo.querySelector('h3').innerText.toLowerCase();

    todo.style.display = 'flex';

    console.log(todoTitle);

    if (!todoTitle.includes(search)) {
      todo.style.display = 'none';
    }
  });
};

const filterTodos = (filterValue) => {
  const todos = document.querySelectorAll('.todo');

  switch (filterValue) {
    case 'all':
      todos.forEach((todo) => (todo.style.display = 'flex'));

      break;

    case 'done':
      todos.forEach((todo) =>
        todo.classList.contains('done')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none')
      );

      break;

    case 'todo':
      todos.forEach((todo) =>
        !todo.classList.contains('done')
          ? (todo.style.display = 'flex')
          : (todo.style.display = 'none')
      );

      break;

    default:
      break;
  }
};

//------------------Eventos------------------
//Salvando o que esta no imput
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

//Clique dos botoes

document.addEventListener('click', (e) => {
  const targetEl = e.target;
  //pega a div mais proxima
  const parentEl = targetEl.closest('div');

  //se o 'elemento pai' existe, checagem de pre-requisito para ter um titulo
  let todoTittle;
  if (parentEl && parentEl.querySelector('h3')) {
    todoTittle = parentEl.querySelector('h3').innerText;
  }

  //botao de feito
  if (targetEl.classList.contains('finish-todo')) {
    //ao clicar no botao 'feito', ele vai para a classe done
    //usa o toggle ao inves de "add" para finalizar e desfinalizar
    parentEl.classList.toggle('done');
  }
  //botao de remover
  if (targetEl.classList.contains('remove-todo')) {
    parentEl.remove();
  }
  //botao de editar
  if (targetEl.classList.contains('edit-todo')) {
    toggleForms();

    editIput.value = todoTittle;
    oldInputValue = todoTittle;
  }
});

//botao cancelar ediçao
cancelEditBtn.addEventListener('click', (e) => {
  e.preventDefault();

  toggleForms();
});

//botao de adionar adiçao
editForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editInputValue = editIput.value;
  if (editInputValue) {
    //atualizar
    updateTodo(editInputValue);
  }
  toggleForms();
});

searchInput.addEventListener('keyup', (e) => {
  const search = e.target.value;

  getSearchedTodos(search);
});

eraseBtn.addEventListener('click', (e) => {
  e.preventDefault();

  searchInput.value = '';

  searchInput.dispatchEvent(new Event('keyup'));
});

filterBtn.addEventListener('change', (e) => {
  const filterValue = e.target.value;

  filterTodos(filterValue);
});

// Local Storage
const getTodosLocalStorage = () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || [];

  return todos;
};

const loadTodos = () => {
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.done, 0);
  });
};

const saveTodoLocalStorage = (todo) => {
  const todos = getTodosLocalStorage();

  todos.push(todo);

  localStorage.setItem('todos', JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  const filteredTodos = todos.filter((todo) => todo.text != todoText);

  localStorage.setItem('todos', JSON.stringify(filteredTodos));
};

const updateTodoStatusLocalStorage = (todoText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoText ? (todo.done = !todo.done) : null
  );

  localStorage.setItem('todos', JSON.stringify(todos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText) => {
  const todos = getTodosLocalStorage();

  todos.map((todo) =>
    todo.text === todoOldText ? (todo.text = todoNewText) : null
  );

  localStorage.setItem('todos', JSON.stringify(todos));
};

loadTodos();
