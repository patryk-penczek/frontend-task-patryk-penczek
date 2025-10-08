import { clsx } from "clsx";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const API_URL = `http://localhost:3000`;

export function App() {
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

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="What needs to be done?"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </form>

      <fieldset>
        <legend className="text-base font-semibold leading-6 text-gray-900">
          Todo list
        </legend>
        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {todos.map((todo) => (
            <div
              key={todo.id}
              data-testid="todo-item"
              className={clsx(
                "relative flex items-start py-4",
                todo.completed && "line-through",
              )}
            >
              <div className="min-w-0 flex-1 text-sm leading-6">
                <label
                  className="select-none font-medium text-gray-900"
                  data-testid="todo-title"
                >
                  {todo.title}
                </label>
              </div>
              <div className="ml-3 flex h-6 items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo)}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="flex h-8 items-center justify-between">
        <span
          data-testid="todo-count"
          className="text-sm font-medium leading-6 text-gray-900"
        >
          {incompleteTodosCount} {incompleteTodosCount === 1 ? "item" : "items"}{" "}
          left
        </span>
        {completedTodosCount > 0 && (
          <button
            onClick={handleClearCompleted}
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Clear completed
          </button>
        )}
      </div>
    </div>
  );
}
