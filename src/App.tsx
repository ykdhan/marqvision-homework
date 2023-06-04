import "./assets/scss/common.scss";
import React, { useEffect, useState } from "react";
import Todo, { TodoProps } from "./components/Todo";
import { useTodoStore } from "./stores/todo";

export const filters = ["all", "active", "completed"];

const App = () => {
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const [filter, setFilter] = useState<string>(filters[0]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [list, setList] = useState<TodoProps[]>([]);

  const handleChangeNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleKeyDownNewTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.length) {
      const target = e.target as HTMLInputElement;
      setNewTodo(target.value);
      handleClickAdd();
    }
  };

  const handleClickAdd = async () => {
    addTodo(newTodo);
    setNewTodo("");
  };

  const handleClickFilter = (filter: string) => {
    setFilter(filter);
  };

  useEffect(() => {
    setList(
      todos.filter((todo) => {
        if (filter === "all") return true;
        else if (filter === "active") return todo.completedAt.length === 0;
        else if (filter === "completed") return todo.completedAt.length > 0;
        return true;
      })
    );
  }, [filter, todos]);

  return (
    <>
      <header className="header">
        <h1 className="title">TODO</h1>
      </header>
      <main className="content">
        <section id="add">
          <input
            className="input"
            type="text"
            placeholder="What to do?"
            value={newTodo}
            onChange={handleChangeNewTodo}
            onKeyDown={handleKeyDownNewTodo}
          />
          <button
            className="button"
            type="button"
            onClick={handleClickAdd}
            disabled={!newTodo}
          >
            Add
          </button>
        </section>

        <section id="todos">
          <div className="top">
            <span className="total">
              {list.length} {list.length > 1 ? "tasks" : "task"}
            </span>
            <ul className="filters">
              {filters.map((item: string, index: number) => {
                return (
                  <li key={`filter-${index}`}>
                    <button
                      type="button"
                      className={`button ${filter === item ? "active" : ""}`}
                      onClick={() => handleClickFilter(item)}
                    >
                      {item[0].toUpperCase() + item.substring(1)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {list.length ? (
            <ul className="list">
              {list.map((todo) => {
                return (
                  <Todo
                    key={`todo-${todo.id}`}
                    id={todo.id}
                    content={todo.content}
                    references={todo.references}
                    createdAt={todo.createdAt}
                    updatedAt={todo.updatedAt}
                    completedAt={todo.completedAt}
                  />
                );
              })}
            </ul>
          ) : (
            <div className="empty">You have nothing to do.</div>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
