import { StoreApi, UseBoundStore, create } from "zustand";
import { TodoProps } from "../components/Todo";
import { createTodo, deleteTodo, updateTodo } from "../lib/Models";

export interface useTodoStoreType {
  todos: TodoProps[];
  addTodo: (content: string) => void;
  editTodo: (id: string, content: string) => void;
  completeTodo: (id: string, date: string) => void;
  setTodoReferences: (id: string, references: string[]) => void;
  deleteTodo: (id: string) => void;
}

export const useTodoStore: UseBoundStore<StoreApi<useTodoStoreType>> = create(
  (set) => ({
    todos: [] as TodoProps[],
    addTodo: (content) => {
      const params = new URLSearchParams({
        content,
      });
      createTodo(params).then((res) => {
        if (res) {
          set((state) => ({ todos: [...state.todos, res] }));
        }
      });
    },
    editTodo: (id, content) => {
      const params = new URLSearchParams({
        content: content,
      });
      updateTodo(id, params).then((res) => {
        if (res) {
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
          set(() => ({ todos: res }));
        }
      });
    },
    deleteTodo: (id) => {
      deleteTodo(id).then((res) => {
        if (res) {
          set(() => ({ todos: res }));
        }
      });
    },
  })
);
