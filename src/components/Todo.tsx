import React, { useCallback, useEffect, useState } from "react";
import { getTodayDate } from "../lib/Utils";
import { useTodoStore } from "../stores/todo";
import { usePopupStore } from "../stores/popup";

export interface TodoProps {
  id: string;
  content: string;
  references: string[];
  createdAt: string;
  updatedAt: string;
  completedAt: string;
}

const Todo = (props: TodoProps) => {
  const todos = useTodoStore((state) => state.todos);
  const editTodo = useTodoStore((state) => state.editTodo);
  const completeTodo = useTodoStore((state) => state.completeTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const setReferenceSetting = usePopupStore(
    (state) => state.setReferenceSetting
  );

  const [editable, setEditable] = useState<boolean>(false);
  const [content, setContent] = useState<string>(props.content);
  const [completed, setCompleted] = useState<string>(props.completedAt || "");

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleKeyDownValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && content.length) handleClickSave();
  };

  const handleChangeCompleted = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        if (
          props.references.length &&
          !props.references.every(
            (id) => todos.find((todo) => todo.id === id)?.completedAt.length
          )
        ) {
          alert("References need to be completed first.");
          return;
        }

        const date = getTodayDate();
        setCompleted(date);
        completeTodo(props.id, date);
      } else {
        setCompleted("");
        completeTodo(props.id, "");
      }
    },
    [completeTodo, props.id, props.references, todos]
  );

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

  const handleClickReferenceSetting = () => {
    setReferenceSetting(props.id);
  };

  useEffect(() => {
    setCompleted(props.completedAt);
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
        <div className="reference-container">
          <button
            type="button"
            className="button reference-button"
            onClick={handleClickReferenceSetting}
          >
            🔗
          </button>
          <ul className="references">
            {props.references.map((reference) => {
              return (
                <li key={`ref-${reference}`} className="tag">
                  {reference}
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="dates">
          <li>Created {props.createdAt}</li>
          {props.updatedAt.length > 0 && <li>Updated {props.updatedAt}</li>}
        </ul>
      </div>
    </li>
  );
};

export default Todo;
