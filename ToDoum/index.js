// Local storage
window.addEventListener('load', () => {
    todoums = JSON.parse(localStorage.getItem('toudoums')) || [];
    const nameInput = document.querySelector('#nom');
    const newTodoumForm = document.querySelector('#new-todoum-form')


    // set nom "nom ici"
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    })

    newTodoumForm.addEventListener('submit' ,e => {
        e.preventDefault();

        const todoum = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }

        todoums.push(todoum);

        localStorage.setItem('toudoums', JSON.stringify(todoums));

        e.target.reset();

        DisplayTodoums();
    })

    DisplayTodoums();
})

// afficher les toudoums
function DisplayTodoums() {
    const todoumsList = document.querySelector('#todoum-list')

    todoumsList.innerHTML = '';

    todoums.forEach(todoum => {
        const todoumObjet = document.createElement('div');
        todoumObjet.classList.add('todoum-objet')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit = document.createElement('button');
        const deletebutton = document.createElement('button');


        // Barrer les todoums fini pt.1
        input.type = 'checkbox';
        input.checked = todoum.done;
        span.classList.add('bubble');


        // Set la category
        if (todoum.category == 'detente') {
            span.classList.add('detente');
        } else {
            span.classList.add('travail');
        }

        // afficher les todoums
        content.classList.add('todoum-content');
        actions.classList.add('action')
        edit.classList.add('modifier');
        deletebutton.classList.add('sup');

        content.innerHTML = `<input type="text" value="${todoum.content}" readonly>`;
        edit.innerHTML = 'Modifier';
        deletebutton.innerHTML = 'Annuler';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deletebutton);
        todoumObjet.appendChild(label);
        todoumObjet.appendChild(content);
        todoumObjet.appendChild(actions);

        todoumsList.appendChild(todoumObjet);

        // Barre le todoum si fini
        if (todoum.done) {
            todoumObjet.classList.add('fini');
        }

        input.addEventListener('click', (e) => {
            todoum.done = e.target.checked;
            localStorage.setItem('toudoums', JSON.stringify(todoums));

            if (todoum.done) {
                todoumObjet.classList.add('fini');
            }   else {
                todoumObjet.classList.remove('fini');
            }

            DisplayTodoums();
        })

        // modifier le texte
        edit.addEventListener('click', (e) => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', true);
                todoum.content = e.target.value;
                localStorage.setItem('toudoums', JSON.stringify(todoums));
                DisplayTodoums();
            })
        })

        deletebutton.addEventListener('click', (e)=> {
            todoums = todoums.filter(t => t != todoum);
            localStorage.setItem('toudoums', JSON.stringify(todoums));
            DisplayTodoums();
        })
    })
}
