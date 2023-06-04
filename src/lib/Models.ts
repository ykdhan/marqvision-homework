import { TodoProps } from "../components/Todo";
import { requestAPI } from "./Utils";

export interface APIResponse<T> {
  success: boolean;
  result: T;
}

export const getTodos = async () => {
  const res = await requestAPI<APIResponse<TodoProps[]>>("GET", "/todos");
  return res.success ? res.result : false;
};

export const createTodo = async (params: URLSearchParams) => {
  const res = await requestAPI<APIResponse<TodoProps>>("POST", "/todo", params);
  return res.success ? res.result : false;
};

export const updateTodo = async (id: string, params: URLSearchParams) => {
  const res = await requestAPI<APIResponse<TodoProps[]>>(
    "PUT",
    `/todo/${id}`,
    params
  );
  return res.success ? res.result : false;
};

export const deleteTodo = async (id: string) => {
  const res = await requestAPI<APIResponse<TodoProps[]>>(
    "DELETE",
    `/todo/${id}`
  );
  return res.success ? res.result : false;
};
