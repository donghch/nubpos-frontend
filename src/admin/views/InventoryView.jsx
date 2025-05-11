import Table from "@/components/custom/Table.jsx"
import SearchBar from "@/components/custom/SearchBar.jsx"
import Popup from "@/components/custom/Popup.jsx";
import {Button, Pagination, Flex, Text, Input} from "@chakra-ui/react";
import {useEffect, useState, useRef, useCallback} from "react";
import {Toaster, toaster} from "@/components/ui/toaster.jsx";
import axiosMockInstance from "@/mock/index.js";
import "@/mock/mocks.js";

const tableTitles = {
    id: "Item ID",
    name: "Item Name",
    price: "Price",
    stock: "Stock",
    operations: "Operations"
};

const data = [
    {
        id: 10,
        name: "Bomb",
        price: 30.5,
        stock: 30,
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

    const openInventoryManagement = itemInfo => {
        selectedItem.current = itemInfo;
        setItemManageOpened(true);
    };

    const closeInventoryManagement = () => {
        selectedItem.current = null;
        setItemManageOpened(false);
    };

    const showSaveSuccessMsg = () => {
        toaster.create(
            {
                title: "Item Information Saved",
                type: "success"
            }
        );
    };

    const showSaveErrorMsg = () => {
        toaster.create(
            {
                title: "Item Information Save Failed",
                type: "error"
            }
        );
    };

    useEffect(
        () => {
            fetchInventory().then(
                data => {
                    data = data.map(
                        item => {
                            item["operations"] = (
                                <Button key={`inventory-button-${item.id}`}
                                        onClick={() => openInventoryManagement(item)}>Manage</Button>
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
            <SearchBar/>
            <Table header={tableTitles} data={inventoryData}/>


            { /* Item Management Popup */}
            <Popup show={itemManageOpened}>
                <Flex justify={"flex-start"}>
                    <Text fontSize={"2xl"}>Item Management</Text>
                </Flex>

                { /* Item Information */ }
                <Flex justify={"space-between"} gap={2}>
                    Item Name
                    <Input type={"text"} defaultValue={selectedItem.current ? selectedItem.current.name : ""}/>
                </Flex>

                { /* Item Price */ }
                <Flex justify={"space-between"} gap={2}>
                    Item Price
                    <Input type={"number"} defaultValue={selectedItem.current ? selectedItem.current.price : ""}/>
                </Flex>

                { /* Item Stock */ }
                <Flex justify={"space-between"} gap={2}>
                    Item Stock
                    <Input type={"number"} defaultValue={selectedItem.current ? selectedItem.current.stock : ""}/>
                </Flex>


                { /* Popup Operation Buttons */ }
                <Flex justify={"flex-end"} gap={2}>
                    <Button onClick={showSaveErrorMsg}>Save</Button>
                    <Button onClick={closeInventoryManagement}>Close</Button>
                </Flex>
            </Popup>
            <Toaster/>
        </>

    );
}

export default InventoryView;