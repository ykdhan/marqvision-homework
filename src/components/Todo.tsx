import { useState } from "react";

export interface TodoProps {
  id: string;
  value: string;
  references: string[];
  createdAt: string;
  updatedAt: string;
}

const Todo = (props: TodoProps) => {
  const [editable, setEditable] = useState<boolean>(false);
  const [value, setValue] = useState<string>(props.value);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClickSave = () => {
    setEditable(false);
  };

  const handleClickEdit = () => {
    setEditable(true);
  };

  return (
    <li className="todo">
      <div className="checkbox">
        <input id="check" className="input" type="checkbox" />
        <label className="label" htmlFor="check" />
      </div>
      <div className="body">
        {editable ? (
          <input
            type="text"
            className="input"
            onChange={handleChangeValue}
            value={value}
          />
        ) : (
          <span className="value">{value}</span>
        )}
      </div>
      <div className="actions">
        {editable ? (
          <button type="button" className="button" onClick={handleClickSave}>
            Save
          </button>
        ) : (
          <button type="button" className="button" onClick={handleClickEdit}>
            Edit
          </button>
        )}
        <button type="button" className="button">
          Delete
        </button>
      </div>
    </li>
  );
};

export default Todo;
