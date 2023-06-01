import "./assets/scss/common.scss";

const App = () => {
  const handleClickAdd = () => {};

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
                <button type="button" className="button active">
                  All
                </button>
              </li>
              <li>
                <button type="button" className="button">
                  Active
                </button>
              </li>
              <li>
                <button type="button" className="button">
                  Completed
                </button>
              </li>
            </ul>
          </div>

          <ul className="list">
            <li className="todo">
              <div className="checkbox">
                <input id="check" className="input" type="checkbox" />
                <label className="label" htmlFor="check" />
              </div>
              <div className="value">Todo 1</div>
              <div className="actions">
                <button type="button" className="button">
                  Edit
                </button>
                <button type="button" className="button">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
};

export default App;
