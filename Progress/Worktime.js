document.getElementById('startButton').addEventListener('click', () => {
    const userInput = document.getElementById('timeInput').value;
    chrome.runtime.sendMessage({ action: 'startTimer', time: userInput }, (response) => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else if (response && response.success) {
            console.log('Timer started');
            document.getElementById('buttonContainer').style.display = 'none'; // Hide the button when timer starts
        } else {
            console.error('Failed to start timer:', response.message);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const display = document.getElementById('display');
    const buttonContainer = document.getElementById('buttonContainer');

    function updateDisplay(time) {
        display.innerHTML =
            Math.floor(time / 3600).toString().padStart(2, '0') + ':' +
            Math.floor((time % 3600) / 60).toString().padStart(2, '0') + ':' +
            Math.floor((time % 60)).toString().padStart(2, '0');
        if (time <= 0) {
            buttonContainer.style.display = 'block';
        } else {
            buttonContainer.style.display = 'none'; // Ensure the button is hidden if time is not up
        }
    }

    function requestTimeUpdate() {
        chrome.runtime.sendMessage({ action: 'getTime' }, (response) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else if (response && response.time !== undefined) {
                updateDisplay(response.time);
            } else {
                console.error('Invalid response:', response);
            }
        });
    }

    requestTimeUpdate();
    setInterval(requestTimeUpdate, 1000); // Update the display every second

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        } else {
            alert('Please enter a task.');
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;
        taskList.appendChild(li);
    }
});
