document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна
    const loadModal = document.getElementById('load-modal');
    const closeLoadModal = document.querySelector('#load-modal .close');
    const cancelLoadBtn = document.getElementById('cancel-load-btn');
    
    // Заполнение таблицы правок
    const changesList = document.getElementById('changes-list');
    const authors = ['Роман', 'Илья', 'Леонид'];
    const tasks = ['TASK-123', 'TASK-456', 'TASK-789', 'TASK-101', 'TASK-112'];
    const descriptions = [
        'Исправление ошибки в документе реализации',
        'Добавление нового отчета',
        'Оптимизация запроса',
        'Обновление конфигурации',
        'Доработка интерфейса'
    ];
    
    // Генерация 30 случайных правок
    for (let i = 1; i <= 30; i++) {
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
        const dateStr = randomDate.toLocaleDateString('ru-RU');
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${dateStr}</td>
            <td>${randomAuthor}</td>
            <td>${randomTask}</td>
            <td>${randomDescription}</td>
            <td><button class="btn load-change-btn" data-id="${i}" data-date="${dateStr}" data-task="${randomTask}">Загрузить</button></td>
        `;
        changesList.appendChild(row);
    }
    
    // Обработчики для кнопок загрузки
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('load-change-btn')) {
            const changeId = e.target.getAttribute('data-id');
            const changeDate = e.target.getAttribute('data-date');
            const changeTask = e.target.getAttribute('data-task');
            
            document.getElementById('load-date').textContent = changeDate;
            document.getElementById('load-task').textContent = changeTask;
            document.getElementById('confirm-load-btn').setAttribute('data-id', changeId);
            
            loadModal.style.display = 'block';
        }
    });
    
    // Закрытие модального окна
    closeLoadModal.onclick = function() {
        loadModal.style.display = 'none';
    };
    
    cancelLoadBtn.onclick = function() {
        loadModal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target == loadModal) {
            loadModal.style.display = 'none';
        }
    };
    
    // Подтверждение загрузки
    document.getElementById('confirm-load-btn').addEventListener('click', function() {
        const changeId = this.getAttribute('data-id');
        alert(`Запрос на загрузку отправлен по адресу: loadchanges/${changeId}`);
        loadModal.style.display = 'none';
    });
    
    // Применение фильтра
    document.getElementById('apply-filter-btn').addEventListener('click', function() {
        const selectedAuthor = document.getElementById('author-filter').value;
        const rows = document.querySelectorAll('#changes-list tr');
        
        rows.forEach(row => {
            const author = row.querySelector('td:nth-child(3)').textContent;
            if (selectedAuthor === 'all' || author === selectedAuthor) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    
    // Экспорт правок
    document.getElementById('export-btn').addEventListener('click', function() {
        alert('Правки выгружены');
    });
});