type ToDoListActionBarProps = {
  incompleteTodosCount: number;
  completedTodosCount: number;
  handleClearCompleted: () => void;
};

const ToDoListActionBar = ({
  incompleteTodosCount,
  completedTodosCount,
  handleClearCompleted,
}: ToDoListActionBarProps) => {
  return (
    <div className="px-6 sm:px-8 py-6 bg-gray-50 border-t border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Counter */}
        <div className="flex items-center gap-2">
          <span
            data-testid="todo-count"
            className="inline-flex items-center px-4 py-2 rounded-lg bg-white text-sm font-semibold text-gray-700 shadow-sm border border-gray-200"
          >
            <span className="text-indigo-600 mr-1.5">
              {incompleteTodosCount}
            </span>
            {incompleteTodosCount === 1 ? " item" : " items"} left
          </span>
        </div>

        {/* Clear Completed Button */}
        {completedTodosCount > 0 && (
          <button
            onClick={handleClearCompleted}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200 font-medium text-sm border border-red-200 hover:border-red-300"
          >
            <svg
              className="size-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Clear completed ({completedTodosCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default ToDoListActionBar;
