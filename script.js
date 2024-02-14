document.addEventListener("DOMContentLoaded", function() {
    const taskForm = document.querySelector("form");
    const taskTableBody = document.querySelector("tbody");

    // Load tasks from local storage or initialize as an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        // Clear the existing table rows
        taskTableBody.innerHTML = "";

        // Loop through each task and append it to the table
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
                // Remove the task from the tasks array
                tasks = tasks.filter(t => t.taskName !== task.taskName);
                // Update local storage
                localStorage.setItem("tasks", JSON.stringify(tasks));
                // Re-render the tasks
                renderTasks();
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            taskTableBody.appendChild(row);
        });
    }

    // Render tasks initially
    renderTasks();

    // Handle form submission
    taskForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const taskName = document.getElementById("task").value;
        const priority = document.getElementById("priority").value;

        if (taskName.trim() === "" || priority.trim() === "") {
            alert("Please enter task name and select priority.");
            return;
        }

        // Add the new task to the tasks array
        tasks.push({ taskName, priority, status: "pending" });
        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Re-render the tasks
        renderTasks();
        // Clear the form
        taskForm.reset();
    });
});
