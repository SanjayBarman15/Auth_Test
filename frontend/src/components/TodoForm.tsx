import React, { useState, useEffect } from "react";

interface TodoFormProps {
  currentTodo?: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
  } | null;
  onSubmit: (title: string, description: string) => void;
  onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({
  currentTodo,
  onSubmit,
  onCancel,
}) => {
  const [title, setTitle] = useState(currentTodo ? currentTodo.title : "");
  const [description, setDescription] = useState(
    currentTodo ? currentTodo.description : ""
  );

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title);
      setDescription(currentTodo.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 mb-4 bg-white rounded-lg shadow-md"
    >
      <input
        type="text"
        placeholder="Todo Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Todo Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={3}
      ></textarea>
      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {currentTodo ? "Update Todo" : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
