import { Todo, TodoStatus } from "../types/Todo";
import axiosInstance from "../utils/axiosInstance";

const API_URL = "/todos";

const token = JSON.parse(localStorage.getItem("token") ?? "");

const createTodo = async (todo: Todo): Promise<Todo> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, todo, config);

  return response.data;
};

const getTodos = async (): Promise<Todo[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log("getTodos() config: ", config);

  const response = await axiosInstance.get(API_URL, config);

  console.log("getTodos() response: ", response);
  return response.data;
};

const updateTodoStatus = async (todo: Todo): Promise<Todo> => {
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

const deleteTodo = async (
  todo: Todo | undefined
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
  updateTodoStatus,
  deleteTodo,
};

export default todoService;
