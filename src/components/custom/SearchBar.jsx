
import { Input, Button } from '@chakra-ui/react';

import "./SearchBar.css"

function SearchBar({margin = "10px 0px 10px 0px"}) {

    return (
        <div className="search-bar" style={{margin: margin}}>
            <Input />
            <Button>Search</Button>
        </div>
    );

}

export default SearchBar;
