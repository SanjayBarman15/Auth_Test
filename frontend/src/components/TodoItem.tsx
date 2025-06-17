import React from "react";

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  };
  onEdit: (todo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  }) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm">
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo._id, !todo.completed)}
          className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <div className="flex-grow">
          <h3
            className={`text-lg font-semibold ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm text-gray-600 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
