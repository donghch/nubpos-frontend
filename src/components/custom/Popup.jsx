
import "./Popup.css";

function Popup({show, children}) {

    if (show === true)
        return (
            <div className="popup-overlay">
                <div className="popup">
                    { children }
                </div>
            </div>
        );
    else
        return (
            <></>
        );
}

export default Popup;