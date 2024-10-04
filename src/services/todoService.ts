import { Todo, TodoStatus } from "../types/Todo";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "/todos";

const createTodo = async (todo: Todo, token: string): Promise<Todo> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, todo, config);

  return response.data;
};

const getTodos = async (token: string): Promise<Todo[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

const patchTodoStatus = async (todo: Todo, token: string): Promise<Todo> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.patch(
    `${API_URL}/${todo.id}/status`,
    { status: todo.status === "DONE" ? TodoStatus.OPEN : TodoStatus.DONE },
    config
  );

  return response.data;
};

const updateTodo = async (todo: Todo, token: string): Promise<Todo> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.put(
    `${API_URL}/${todo.id}`,
    {
      title: todo.title,
      description: todo.description,
    },
    config
  );

  return response.data;
};

const deleteTodo = async (
  todo: Todo | undefined,
  token: string
): Promise<Todo | undefined> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axiosInstance.delete(`${API_URL}/${todo?.id}`, config);
  return todo;
};

const todoService = {
  createTodo,
  getTodos,
  patchTodoStatus,
  updateTodo,
  deleteTodo,
};

export default todoService;
