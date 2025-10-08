import clsx from "clsx";
import { Todo } from "../types/todo.type";

type ToDoListProps = {
  todos: Todo[];
  handleToggleComplete: (todo: Todo) => void;
};

const TodoList = ({ todos, handleToggleComplete }: ToDoListProps) => {
  return (
    <div className="px-6 sm:px-8 py-4">
      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No tasks yet</p>
          <p className="text-gray-400 text-sm mt-2">
            Add your first task to get started
          </p>
        </div>
      ) : (
        <fieldset>
          <legend className="sr-only">Todo list</legend>
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                data-testid="todo-item"
                className={clsx(
                  "group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-200",
                  todo.completed
                    ? "bg-gray-50 hover:bg-gray-100"
                    : "bg-white hover:bg-indigo-50 hover:shadow-md",
                )}
              >
                {/* Checkbox */}
                <div className="flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo)}
                    className="h-5 w-5 rounded-md border-2 border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:border-indigo-400"
                  />
                </div>

                {/* Todo Text */}
                <div className="flex-1 min-w-0">
                  <label
                    className={clsx(
                      "block text-base cursor-pointer select-none transition-all duration-200",
                      todo.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-900 font-medium",
                    )}
                    data-testid="todo-title"
                  >
                    {todo.title}
                  </label>
                </div>

                {/* Completion Badge */}
                {todo.completed && (
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✓ Done
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </fieldset>
      )}
    </div>
  );
};

export default TodoList;
