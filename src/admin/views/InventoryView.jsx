
import Table from "@/components/custom/Table.jsx"
import SearchBar from "@/components/custom/SearchBar.jsx"
import SearchPopup from "@/components/custom/SearchPopup.jsx";
import { Button } from "@chakra-ui/react";

const tableTitles = {
    id: "Item ID",
    name: "Item Name",
    price: "Price",
    operations: "Operations"
};

const data = [
    {
        id: 10,
        name: "Bomb",
        price: 30.5,
        operations: <Button>Shit</Button>
    }
];

function InventoryView() {


    return (
        <>
            <p>There are more problems</p>
            <SearchBar />
            <Table header={tableTitles} data={data} />
            <SearchPopup />
        </>

    );
}

export default InventoryView;