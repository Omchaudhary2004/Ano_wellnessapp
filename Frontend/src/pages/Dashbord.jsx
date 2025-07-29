import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");

  const getToday = () => new Date().toISOString().split("T")[0];

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks", { withCredentials: true })
      .then(res => {
        setTasks(res.data.tasks || []);
        setUserName(res.data.user?.name || "User");
        setLoading(false);
      })
      .catch(err => {
        console.log("Unauthorized:", err);
        navigate("/login");
      });
  }, [navigate]);

  const handleAddTask = async () => {
    if (!taskText.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { text: taskText, date: getToday() },
        { withCredentials: true }
      );
      setTasks(prev => [...prev, res.data]);
      setTaskText("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}/toggle`,
        {},
        { withCredentials: true }
      );
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const getStreakMap = () => {
    const map = {};
    tasks.forEach(task => {
      if (task.completed) {
        map[task.date] = true;
      }
    });
    return map;
  };

  const renderGrid = () => {
    const map = getStreakMap();
    const grid = [];
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const key = date.toISOString().split("T")[0];
      const isDone = map[key];
      grid.push(
        <div
          key={key}
          className={`dot ${isDone ? "done" : "undone"}`}
          title={key}
        />
      );
    }
    return grid.reverse();
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1 className="app-title">Wellness Tracker</h1>
        <div className="header-right">
          <p className="user-name">Welcome, {userName}</p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="task-input-group">
          <input
            type="text"
            placeholder="New task..."
            className="task-input"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <button className="add-button" onClick={handleAddTask}>
            Add
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <span className={`task-text ${task.completed ? "completed" : ""}`}>
                {task.text} ({task.date})
              </span>
              <button onClick={() => toggleTask(task._id)} className="toggle-button">
                {task.completed ? "Undo" : "Complete"}
              </button>
            </li>
          ))}
        </ul>

        <div className="streak-section">
          <h2 className="streak-title">Your Streak (Last 365 Days)</h2>
          <div className="streak-grid">{renderGrid()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;