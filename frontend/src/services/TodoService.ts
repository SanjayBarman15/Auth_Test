import api from "./api";

const todoService = {
  getTodos: async () => {
    const response = await api.get("/api/todos");
    return response.data;
  },

  createTodo: async (title: string, description: string) => {
    const response = await api.post("/api/todos", { title, description });
    return response.data;
  },

  updateTodo: async (
    id: string,
    title: string,
    description: string,
    completed: boolean
  ) => {
    const response = await api.put(`/api/todos/${id}`, {
      title,
      description,
      completed,
    });
    return response.data;
  },

  deleteTodo: async (id: string) => {
    const response = await api.delete(`/api/todos/${id}`);
    return response.data;
  },
};

export default todoService;
