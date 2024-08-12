const apiUrl = 'https://strengthened-olivine-narwhal.glitch.me/'; // Ändern Sie dies zu Ihrer Glitch-URL

async function addTodo() {
    const input = document.getElementById('todoInput');
    const todo = input.value.trim();
    if (todo) {
        try {
            const response = await fetch(`${apiUrl}/todos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: todo })
            });
            if (response.ok) {
                input.value = '';
                await loadTodos();
            }
        } catch (error) {
            console.error('Fehler beim Hinzufügen:', error);
        }
    }
}

async function loadTodos() {
    try {
        const response = await fetch(`${apiUrl}/todos`);
        const todos = await response.json();
        const list = document.getElementById('todoList');
        list.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Fehler beim Laden:', error);
    }
}

loadTodos();

// Service Worker Registrierung
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => console.log('Service Worker registriert', reg))
        .catch(err => console.log('Service Worker nicht registriert', err));
}