import { StoreApi, UseBoundStore, create } from "zustand";
import { TodoProps } from "../components/Todo";
import { createTodo, deleteTodo, updateTodo } from "../lib/Models";

const storeTodos = (todos: TodoProps[]) => {
  window.localStorage.setItem("marqvision-todos", JSON.stringify(todos));
};

export interface useTodoStoreType {
  todos: TodoProps[];
  setTodos: (todos: TodoProps[]) => void;
  addTodo: (content: string) => void;
  editTodo: (id: string, content: string) => void;
  completeTodo: (id: string, date: string) => void;
  setTodoReferences: (id: string, references: string[]) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore: UseBoundStore<StoreApi<useTodoStoreType>> = create(
  (set) => ({
    todos: [] as TodoProps[],
    setTodos: (todos) => {
      set(() => ({ todos: todos }));
    },
    addTodo: (content) => {
      const params = new URLSearchParams({
        content,
      });
      createTodo(params).then((res) => {
        if (res) {
          set((state) => {
            const todos = [...state.todos, res];
            storeTodos(todos);
            return {
              todos: todos,
            };
          });
        }
      });
    },
    editTodo: (id, content) => {
      const params = new URLSearchParams({
        content: content,
      });
      updateTodo(id, params).then((res) => {
        if (res) {
          storeTodos(res);
          set(() => ({ todos: res }));
        }
      });
    },
    completeTodo: (id, date) => {
      const params = new URLSearchParams({
        completedAt: date,
      });
      updateTodo(id, params).then((res) => {
        if (res) {
          storeTodos(res);
          set(() => ({ todos: res }));
        }
      });
    },
    setTodoReferences: (id, references) => {
      const params = new URLSearchParams({
        references: JSON.stringify(references),
      });
      updateTodo(id, params).then((res) => {
        if (res) {
          storeTodos(res);
          set(() => ({ todos: res }));
        }
      });
    },
    deleteTodo: (id) => {
      deleteTodo(id).then((res) => {
        if (res) {
          storeTodos(res);
          set(() => ({ todos: res }));
        }
      });
    },
  })
);
