var mouseCoordinates = [];

document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    const timestamp = Date.now();
    mouseCoordinates.push([clientX, clientY, timestamp]);
});

document.getElementById('sendDataBtn').addEventListener('click', async () => {
    if (mouseCoordinates.length === 0) {
        alert('Нет данных для отправки.');
        return;
    }

    try {
        const response = await fetch('/api/mouse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mouseCoordinates),
        });

        if (response.ok) {
            alert('Данные отправлены.');
            mouseCoordinates = []; 
        } else {
            const errorText = await response.text(); 
            console.error('Ошибка при отправке данных:', errorText);
            alert('Ошибка при отправке данных: ' + response.statusText);
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
});
