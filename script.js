document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.querySelector("form");
    const taskTableBody = document.querySelector("tbody");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {

        taskTableBody.innerHTML = "";

        tasks.forEach(task => {
            const row = document.createElement("tr");

            const taskNameCell = document.createElement("td");
            taskNameCell.textContent = task.taskName;
            row.appendChild(taskNameCell);

            const priorityCell = document.createElement("td");
            priorityCell.textContent = task.priority;
            priorityCell.style.backgroundColor = task.priority === "High" ? "red" : "green";
            row.appendChild(priorityCell);

            const statusCell = document.createElement("td");
            const statusButton = document.createElement("button");
            statusButton.textContent = task.status === "completed" ? "Completed" : "Pending";
            statusButton.addEventListener("click", function() {
                task.status = task.status === "completed" ? "pending" : "completed";
                statusButton.textContent = task.status === "completed" ? "Completed" : "Pending";
                localStorage.setItem("tasks", JSON.stringify(tasks));
            });
            statusCell.appendChild(statusButton);
            row.appendChild(statusCell);

            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", function() {

                tasks = tasks.filter(t => t.taskName !== task.taskName);

                localStorage.setItem("tasks", JSON.stringify(tasks));

                renderTasks();
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            taskTableBody.appendChild(row);
        });
    }

    renderTasks();

    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskName = document.getElementById("task").value;
        const priority = document.getElementById("priority").value;

        if (taskName.trim() === "" || priority.trim() === "") {
            alert("Please enter task name and select priority.");
            return;
        }

        tasks.push({ taskName, priority, status: "pending" });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
        taskForm.reset();
    });
});
