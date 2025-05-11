
import { Input } from "@chakra-ui/react";
import Keyboard from "react-simple-keyboard";

import "./SearchPopup.css";
import "react-simple-keyboard/build/css/index.css";

const keyboardLayout = {
    default: [
        "1 2 3",
        "4 5 6",
        "7 8 9",
        "* 0 #"
    ]
};

function SearchPopup() {

    return (
        <div className="search-popup">
            <Input height="50px" style={{fontSize: "30px"}}/>
            <Keyboard layout={keyboardLayout} />
        </div>
    );

}

export default SearchPopup;