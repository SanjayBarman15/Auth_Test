"use client";
import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import todoService from "../services/TodoService";
import { AxiosError } from "axios";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getTodos();
      setTodos(data);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (title: string, description: string) => {
    try {
      const newTodo = await todoService.createTodo(title, description);
      setTodos([...todos, newTodo]);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to add todo");
    }
  };

  const handleUpdateTodo = async (title: string, description: string) => {
    if (!editingTodo) return;
    try {
      const updatedTodo = await todoService.updateTodo(
        editingTodo._id,
        title,
        description,
        editingTodo.completed
      );
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
      setEditingTodo(null);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Failed to delete todo");
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const originalTodo = todos.find((todo) => todo._id === id);
      if (!originalTodo) {
        console.error("Todo not found for toggling completion");
        return;
      }
      const updatedTodo = await todoService.updateTodo(
        id,
        originalTodo.title,
        originalTodo.description,
        completed
      );
      setTodos(
        todos.map((todo) => (todo._id === updatedTodo._id ? updatedTodo : todo))
      );
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(
        error.response?.data?.message || "Failed to toggle todo completion"
      );
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-gray-100 to-indigo-100 py-8">
      <div className="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-indigo-700 drop-shadow">
          My Todo List
        </h1>
        <div className="mb-6">
          <TodoForm
            currentTodo={editingTodo}
            onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo}
            onCancel={() => setEditingTodo(null)}
          />
        </div>
        <hr className="my-6 border-gray-200" />
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mr-2"></div>
            <span className="text-lg text-indigo-600 font-semibold">
              Loading todos...
            </span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <span className="text-lg text-red-600 font-semibold">
              Error: {error}
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {todos.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">
                No todos yet. Add one above!
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="transition-transform duration-200 hover:scale-[1.01] hover:shadow-lg rounded-lg bg-gray-50 border border-gray-200"
                >
                  <TodoItem
                    todo={todo}
                    onEdit={setEditingTodo}
                    onDelete={handleDeleteTodo}
                    onToggleComplete={handleToggleComplete}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
