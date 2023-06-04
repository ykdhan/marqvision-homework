import { usePopupStore } from "../stores/popup";
import ReferenceSetting from "./popup/ReferenceSetting";

export interface PopupProps {
  type: string;
  data: any;
}

const Popup = (props: PopupProps) => {
  const setReferenceSetting = usePopupStore(
    (state) => state.setReferenceSetting
  );

  const handleClickDim = () => {
    setReferenceSetting(null);
  };

  return (
    <div className={`popup popup-${props.type}`}>
      <div className="container">
        {props.type === "reference" && <ReferenceSetting id={props.data.id} />}
      </div>

      <div className="dim" onClick={handleClickDim} />
    </div>
  );
};

export default Popup;
