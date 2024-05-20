document.addEventListener('DOMContentLoaded', function () {
    let interval = null;
    let time = 0;
    let isPaused = false;

    const display = document.getElementById('display');
    const buttonContainer = document.getElementById('buttonContainer');

    function startTimer() {
        const userInput = document.getElementById("timeInput").value;
        time = userInput * 60;
        const startTime = Date.now(); // Record the start time

        // Store start time and remaining time in local storage
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('remainingTime', time);

        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(updateTime, 1000);
    }

    function updateTime() {
        if (!isPaused) {
            time -= 1;
            localStorage.setItem('remainingTime', time); // Update remaining time in local storage

            if (time <= 0) {
                clearInterval(interval);
                buttonContainer.style.display = "block";
                alert('Time is up!');
            }

            display.innerHTML =
                Math.floor(time / 3600).toString().padStart(2, "0") + ":" +
                Math.floor((time % 3600) / 60).toString().padStart(2, "0") + ":" +
                Math.floor((time % 60)).toString().padStart(2, "0");
        }
    }

    // Check if there's stored time in local storage and resume the timer
    const storedRemainingTime = localStorage.getItem('remainingTime');
    if (storedRemainingTime) {
        time = parseInt(storedRemainingTime);
        startTimer();
    }

    document.getElementById('startButton').addEventListener('click', startTimer);


    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', function () {
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

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            li.classList.add('slide-out');
            setTimeout(() => {
                li.remove();
            }, 500); // Duration of the slide-out animation
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            li.remove();
        });

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';
        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(removeBtn);

        li.appendChild(taskButtons);
        taskList.appendChild(li);
    }
});
