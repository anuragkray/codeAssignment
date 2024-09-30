import "./styles.css";
import { useState, useEffect, useMemo } from "react";

export default function ToDoApp() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  //Fetching API
  useEffect(() => {
    (async function fetchData() {
      try {
        const data = await fetch("https://dummyjson.com/todos?limit=10");
        const response = await data.json();
        const updatedTodos = response.todos.map((item) => ({
          ...item,
          completed: false,
        }));
        setData(updatedTodos);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  //Handle input
  const handleInput = (event) => {
    const { value } = event.target;
    setInput(value);
  };

  //Handle Add Task button
  const handleAddTask = () => {
    setData((prevData) => [
      ...prevData,
      { id: Date.now(), todo: input, userId: "", completed: false },
    ]);
    setInput("");
  };

  //Handle checkbox
  const handleCheckBox = (id) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  //For completed section
  const completedList = useMemo(() => {
    const completed = data.filter((item) => item.completed);
    return completed;
  }, [data]);

  //Handle delete button
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <div className="container">
        <div className="todo-column">
          <h2>To-Do</h2>
          <ul id="todo-list">
            {data &&
              data.map(
                (item) =>
                  !item.completed && (
                    <li key={item.id}>
                      <input
                        type="checkbox"
                        onClick={() => handleCheckBox(item.id)}
                      />{" "}
                      {item.todo}
                      <button onClick={() => handleDelete(item.id)}>
                        Delete
                      </button>
                    </li>
                  )
              )}
          </ul>
        </div>
        <div className="completed-column">
          <h2>Completed</h2>
          <ul id="completed-list">
            {completedList &&
              completedList.map((item) => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    onClick={() => handleCheckBox(item.id)}
                    checked={item.completed}
                  />
                  {item.todo}
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="add-task">
        <input
          type="text"
          id="new-task"
          placeholder="Enter new task"
          onChange={handleInput}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
}
