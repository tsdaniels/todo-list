import "./App.css";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function App() {
  const [todos, setTodos] = useLocalStorage("todos", [
    { id: 0, title: "milk", completed: true },
    { id: 1, title: "bread", completed: false },
  ]);

  const [newTodo, setNewTodo] = useLocalStorage("");
  const [count, setCount] = useState(0);

  const handleInputChange = (event) => {
    const value = event.target.value;
    if (!todos.some((todo) => todo.title == value)) {
      setNewTodo(value);
    }
  };

  function hitButton() {
    setCount(count + 1);
  }

  function handleAddTodo(title) {
    if (newTodo.trim() != "") {
      setTodos([
        ...todos,
        {
          ...todos,
          id: Date.now(),
          title: title,
          completed: false,
        },
      ]);
    }
    setNewTodo("");
  }

  function toggleChecked(id, completed) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function handleRemoveTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  async function logCats() {
    const response = await fetch("https://cat-fact.herokuapp.com/facts/");
    if (response.status === 404) {
      throw new Error("request not found");
    }
    if (response.ok) {
      console.log("uhh it worked?");
    }
    const cats = await response.json();
    console.log(cats);
    cats.forEach((fact) => {
      console.log(fact.text);
    });
  }
  logCats();
  return (
    <div className="App">
      <h1>To do List</h1>
      <input
        className="searchBar"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Whats on your mind?"
      />
      <button
        className="add-btn"
        onClick={() => handleAddTodo(newTodo)}
        type="submit"
      >
        Add
      </button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label className="custom-checkbox">
              <div className="wrapper">
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => toggleChecked(todo.id, e.target.checked)}
                />
              </div>
            </label>
            <span className="checkmark"></span>
            {todo.title}

            <div className="delete-container">
              <button
                className="delete-btn"
                onClick={() => handleRemoveTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
