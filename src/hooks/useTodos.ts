import { useEffect, useState } from "react";
import { Todo } from "../types/todo.type";

const API_URL = `http://localhost:3000`;

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: inputValue }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setInputValue("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t.id === todo.id ? updatedTodo : t)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleClearCompleted = async () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    try {
      await Promise.all(
        completedTodos.map((todo) =>
          fetch(`${API_URL}/todos/${todo.id}`, { method: "DELETE" }),
        ),
      );
      setTodos(todos.filter((todo) => !todo.completed));
    } catch (error) {
      console.error("Failed to clear completed todos:", error);
    }
  };

  const incompleteTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;
  const hasTodos = todos.length > 0;

  return {
    todos,
    inputValue,
    incompleteTodosCount,
    completedTodosCount,
    hasTodos,
    actions: {
      setInputValue,
      handleSubmit,
      handleToggleComplete,
      handleClearCompleted,
    },
  };
};
export default useTodos;
