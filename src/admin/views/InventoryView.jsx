
import Table from "@/components/custom/Table.jsx"
import SearchBar from "@/components/custom/SearchBar.jsx"
import SearchPopup from "@/components/custom/SearchPopup.jsx";
import { Button, Pagination } from "@chakra-ui/react";
import axiosMockInstance from "@/mock/index.js";
import "@/mock/mocks.js";
import {useEffect, useState, useRef, useCallback} from "react";

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

/* Helper Functions */

const inventoryURL = "http://localhost:8888/inventory";

async function fetchInventory() {
    const res = await axiosMockInstance.get(inventoryURL);
    if (res.status === 200)
        return res.data;
    else
        throw Error(res.status);
}

function InventoryView() {

    const [inventoryData, setInventoryData] = useState([]);
    const [itemManageOpened, setItemManageOpened] = useState(false);
    const selectedItem = useRef(null);

    const manageInventoryItem = useCallback(
        itemInfo => {
            selectedItem.current = itemInfo;
            setItemManageOpened(true);
            console.log(`Current Item: ${itemInfo.name}`)
        }, []
    );

    useEffect(
        () => {
            fetchInventory().then(
                data => {
                    data = data.map(
                        item => {
                            item["operations"] = (
                                <Button key={`inventory-button-${item.id}`} onClick={() => manageInventoryItem(item)}>Manage</Button>
                            );
                            return item;
                        }
                    )
                    setInventoryData(data);
                },
                err => {
                    console.log(err);
                }
            )
        }, []
    );

    return (
        <>
            <p>There are more problems</p>
            <SearchBar />
            <Table header={tableTitles} data={inventoryData} />
            <SearchPopup />
        </>

    );
}

export default InventoryView;