import { useEffect, useState } from "react";
import { useTodoStore } from "../../stores/todo";
import { usePopupStore } from "../../stores/popup";

export interface ReferenceSettingProps {
  id: string;
}

const ReferenceSetting = (props: ReferenceSettingProps) => {
  const todos = useTodoStore((state) => state.todos);
  const setTodoReferences = useTodoStore((state) => state.setTodoReferences);
  const setReferenceSetting = usePopupStore(
    (state) => state.setReferenceSetting
  );

  const [references, setReferences] = useState<string[]>([]);

  const handleChangeReference = (id: string) => {
    const index = references.findIndex((ref) => ref === id);

    if (index > -1) {
      setReferences([
        ...references.slice(0, index),
        ...references.slice(index + 1),
      ]);
    } else {
      setReferences([...references, id]);
    }
  };

  const handleClickSave = () => {
    setTodoReferences(props.id, references);
    setReferenceSetting(null);
  };

  useEffect(() => {
    const found = todos.find((item) => item.id === props.id);
    setReferences(found?.references || []);
  }, [props.id, todos]);

  return (
    <>
      <h2 className="title">References</h2>
      <ul className="list">
        {todos.length > 1 ? (
          todos
            .filter((todo) => todo.id !== props.id)
            .map((todo) => {
              return (
                <li className="item" key={`reference-${todo.id}`}>
                  <div className="checkbox">
                    <input
                      id={`reference-${todo.id}`}
                      className="input"
                      type="checkbox"
                      checked={
                        references.findIndex((ref) => ref === todo.id) > -1
                      }
                      onChange={() => handleChangeReference(todo.id)}
                    />
                    <label className="label" htmlFor={`reference-${todo.id}`} />
                  </div>
                  <span className="tag">{todo.id}</span>
                  <p className="content">{todo.content}</p>
                </li>
              );
            })
        ) : (
          <div className="empty">You need at least 2 items to do.</div>
        )}
      </ul>
      <button type="button" className="button submit" onClick={handleClickSave}>
        Save
      </button>
    </>
  );
};

export default ReferenceSetting;
