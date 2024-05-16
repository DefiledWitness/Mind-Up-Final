

let interval = null;
let time = 0;
function startTimer() {
   const userInput = document.getElementById("timeInput").value;
   time = userInput * 60; 
   if (interval) {
       clearInterval(interval);
   }
   interval = setInterval(() => {
       time -= 1;
       if (time <= 0) {
           clearInterval(interval);
           buttonContainer.style.display = "block"; 

       }
       
       display.innerHTML =
           Math.floor(time / 3600).toString().padStart(2, "0") + ":" +
           Math.floor((time % 3600) / 60).toString().padStart(2, "0") + ":" +
           Math.floor((time % 60)).toString().padStart(2, "0");
   }, 1000);
}

document.getElementById('startButton').addEventListener('click', startTimer);
document.addEventListener('DOMContentLoaded', function () {
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
       taskList.appendChild(li);
   }
});