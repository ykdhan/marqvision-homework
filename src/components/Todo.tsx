import React, { useEffect, useState } from "react";
import { getTodayDate } from "../lib/Utils";
import { useTodoStore } from "../stores/todo";

export interface TodoProps {
  id: string;
  content: string;
  references: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string;
}

const Todo = (props: TodoProps) => {
  const editTodo = useTodoStore((state) => state.editTodo);
  const completeTodo = useTodoStore((state) => state.completeTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const [editable, setEditable] = useState<boolean>(false);
  const [content, setContent] = useState<string>(props.content);
  const [completed, setCompleted] = useState<string>(props.completedAt || "");

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDownValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && content.length) handleClickSave();
  };

  const handleChangeCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
    completeTodo(props.id, e.target.checked ? getTodayDate() : "");
  };

  const handleClickSave = () => {
    editTodo(props.id, content);
    setEditable(false);
  };

  const handleClickEdit = () => {
    setEditable(true);
  };

  const handleClickDelete = () => {
    if (window && window.confirm("Delete item?")) {
      deleteTodo(props.id);
    }
  };

  useEffect(() => {
    setCompleted(props.completedAt || "");
  }, [props.completedAt]);

  return (
    <li className="todo">
      <div className="container">
        <span className="tag id">{props.id}</span>
      </div>

      <div className="container">
        <div className="checkbox">
          <input
            id={`check-${props.id}`}
            className="input"
            type="checkbox"
            checked={completed.length > 0}
            onChange={handleChangeCompleted}
          />
          <label className="label" htmlFor={`check-${props.id}`} />
        </div>

        <div className="body">
          {editable ? (
            <input
              type="text"
              className="input"
              onChange={handleChangeValue}
              onKeyDown={handleKeyDownValue}
              value={content}
            />
          ) : (
            <span className="value">{content}</span>
          )}
        </div>

        <div className="actions">
          {editable ? (
            <button
              type="button"
              className="button"
              onClick={handleClickSave}
              disabled={!content.length}
            >
              Save
            </button>
          ) : (
            <button type="button" className="button" onClick={handleClickEdit}>
              Edit
            </button>
          )}
          <button type="button" className="button" onClick={handleClickDelete}>
            Delete
          </button>
        </div>
      </div>
      <div className="container">
        <ul className="references">
          {props.references.map((reference) => {
            return <li className="tag">@{reference}</li>;
          })}
        </ul>
        <ul className="dates">
          <li>작성일 {props.createdAt}</li>
          {props.updatedAt.length > 0 && <li>최종수정일 {props.updatedAt}</li>}
        </ul>
      </div>
    </li>
  );
};

export default Todo;
