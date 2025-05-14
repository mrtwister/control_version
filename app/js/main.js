document.addEventListener('DOMContentLoaded', function() {
    // Элементы модального окна добавления базы
    const addBaseModal = document.getElementById('add-base-modal');
    const addBaseBtn = document.getElementById('add-base-btn');
    const closeAddBaseModal = document.querySelector('#add-base-modal .close');
    const cancelAddBtn = document.getElementById('cancel-add-btn');
    
    // Элементы модального окна удаления
    const deleteModal = document.getElementById('delete-modal');
    const closeDeleteModal = document.querySelector('#delete-modal .close');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    // Форма добавления базы
    const addBaseForm = document.getElementById('add-base-form');
    
    // Открытие модального окна добавления базы
    addBaseBtn.addEventListener('click', function() {
        addBaseModal.style.display = 'block';
    });
    
    // Обработчики для кнопок удаления
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const dbName = row.querySelector('td:first-child a').textContent;
            document.getElementById('delete-db-name').textContent = dbName;
            deleteModal.style.display = 'block';
        });
    });
    
    // Закрытие модальных окон
    closeAddBaseModal.onclick = function() {
        addBaseModal.style.display = 'none';
    };
    
    closeDeleteModal.onclick = function() {
        deleteModal.style.display = 'none';
    };
    
    cancelAddBtn.onclick = function() {
        addBaseModal.style.display = 'none';
    };
    
    cancelDeleteBtn.onclick = function() {
        deleteModal.style.display = 'none';
    };
    
    window.onclick = function(event) {
        if (event.target == addBaseModal) {
            addBaseModal.style.display = 'none';
        }
        if (event.target == deleteModal) {
            deleteModal.style.display = 'none';
        }
    };
    
    // Обработка формы добавления базы
    addBaseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const data = {
            baseName: document.getElementById('base-name').value,
            baseServer: document.getElementById('base-server').value,
            basedb: document.getElementById('base-db').value,
            baseDescription: document.getElementById('base-description').value,
            baseOwner: document.getElementById('base-owner').value                    
        }
        
    try {
        // Отправляем POST-запрос
        const response = fetch('addbase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        });

    } catch (err) {
        //document.getElementById('result').textContent = 'Ошибка сети: ' + err;
    }
        
        // Очистка формы и закрытие модального окна
        addBaseForm.reset();
        addBaseModal.style.display = 'none';
    });
    
    // Подтверждение удаления
    function addListenersButtons() {
        const buttons = document.querySelectorAll('#delete-db')

        buttons.forEach(item => {
            item.addEventListener('click',(event) => {
                const button = event.target
                const id = button.getAttribute('data-id')

                const modalButton = document.querySelector('#confirm-delete-btn')
                modalButton.setAttribute('data-id',id)
            })
        })

    }

    addListenersButtons()
    document.getElementById('confirm-delete-btn').addEventListener('click', function(event) {
        const dbName = document.getElementById('delete-db-name').textContent;
        const button = event.target
        const id = button.getAttribute('data-id')
        
        deleteModal.style.display = 'none';

        try {
        // Отправляем POST-запрос
        const response = fetch('deletebase/' + id, {
        method: 'POST',
        });

    } catch (err) {
        //document.getElementById('result').textContent = 'Ошибка сети: ' + err;
    }
        
    });
});