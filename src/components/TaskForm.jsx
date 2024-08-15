import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";

const TaskForm = ({ setTasks }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    description: "", // Added description field
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (taskData.tags.some((item) => item === tag)) {
      const filterTags = taskData.tags.filter((item) => item !== tag);
      setTaskData((prev) => {
        return { ...prev, tags: filterTags };
      });
    } else {
      setTaskData((prev) => {
        return { ...prev, tags: [...prev.tags, tag] };
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.task.length < 3) {
      alert("Task must be at least 3 characters long.");
      return;
    }

    // Log taskData to verify it includes the description
    console.log(taskData);
    setTasks((prev) => [...prev, taskData]);
    setTaskData({
      task: "",
      description: "", // Reset description field
      status: "todo",
      tags: [],
    });
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="task"
          value={taskData.task}
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />
        <textarea
          name="description"
          value={taskData.description}
          className="task_description1"
          placeholder="Enter task description"
          onChange={handleChange}
        />

        <div className="task_form_bottom_line">
          <div>
            <Tag tagName="Home" selectTag={selectTag} selected={checkTag("Home")} />
            <Tag tagName="Office" selectTag={selectTag} selected={checkTag("Office")} />
            <Tag tagName="Gym" selectTag={selectTag} selected={checkTag("Gym")} />
            <Tag tagName="General" selectTag={selectTag} selected={checkTag("General")} />
          </div>

          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">To do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button type="submit" className="task_submit">
              + Add Task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;
