
import "./Popup.css";

function Popup({show, children}) {
    return (
        <div className="popup-overlay" style={{display: show ? "block" : "none"}}>
            <div className="popup">
                { children }
            </div>
        </div>
    );
}

export default Popup;