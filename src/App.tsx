import { useState } from "react";
import "./assets/scss/common.scss";
import Todo from "./components/Todo";

export enum FilterType {
  all,
  active,
  completed,
}

const App = () => {
  const [filter, setFilter] = useState<FilterType>(FilterType.all);

  const handleClickAdd = () => {};

  const handleClickFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  return (
    <>
      <header className="header">
        <h1 className="title">TODO</h1>
      </header>
      <main className="content">
        <section id="add">
          <input className="input" type="text" placeholder="What to do?" />
          <button className="button" type="button" onClick={handleClickAdd}>
            Add
          </button>
        </section>

        <section id="todos">
          <div className="top">
            <span className="total">total</span>
            <ul className="filters">
              <li>
                <button
                  type="button"
                  className={`button ${
                    filter === FilterType.all ? "active" : ""
                  }`}
                  onClick={() => handleClickFilter(FilterType.all)}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`button ${
                    filter === FilterType.active ? "active" : ""
                  }`}
                  onClick={() => handleClickFilter(FilterType.active)}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={`button ${
                    filter === FilterType.completed ? "active" : ""
                  }`}
                  onClick={() => handleClickFilter(FilterType.completed)}
                >
                  Completed
                </button>
              </li>
            </ul>
          </div>

          <ul className="list">
            <Todo
              id={"1"}
              value={"Todo1"}
              references={[]}
              createdAt="2023-06-02"
              updatedAt="2023-06-02"
            />
            <Todo
              id={"2"}
              value={"Todo2"}
              references={["1", "3"]}
              createdAt="2023-06-02"
              updatedAt="2023-06-02"
            />
            <Todo
              id={"3"}
              value={"Todo3"}
              references={[]}
              createdAt="2023-06-02"
              updatedAt="2023-06-02"
            />
            <Todo
              id={"4"}
              value={"Todo4"}
              references={[]}
              createdAt="2023-06-02"
              updatedAt="2023-06-02"
            />
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
