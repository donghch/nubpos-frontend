import Table from "@/components/custom/Table.jsx"
import SearchBar from "@/components/custom/SearchBar.jsx"
import Popup from "@/components/custom/Popup.jsx";
import {Button, Flex, Text, Input, Stack} from "@chakra-ui/react";
import {useEffect, useState, useRef, useCallback} from "react";
import {Toaster, toaster} from "@/components/ui/toaster.jsx";
import axiosMockInstance from "@/mock/index.js";
import "@/mock/mocks.js";
import "./InventoryView.css"

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
        operations: <Button>Manage</Button>
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
    const [itemAddOpened, setItemAddOpened] = useState(false);
    const selectedItem = useRef(null);

    { /* Add Item Popup Variables */}
    const itemPopupSaveButton = useRef(null);

    const openInventoryManagement = itemInfo => {
        selectedItem.current = itemInfo;
        setItemManageOpened(true);
    };

    const closeInventoryManagement = () => {
        selectedItem.current = null;
        setItemManageOpened(false);
    };

    { /* Add Item Popup Functions */}
    const openItemAdd = () => {
        setItemAddOpened(true);
    }

    const closeItemAdd = () => {
        setItemAddOpened(false);
    }

    const enableButton = (button, color) => {
        button.current.style["background"] = color;
        button.current.disabled = false;
    }

    const disableButton = (button) => {
        button.current.style["background"] = "grey";
        button.current.disabled = true;
    }

    const showSaveSuccessMsg = () => {
        toaster.create(
            {
                title: "Item Information Saved",
                type: "success"
            }
        );
        itemPopupSaveButton.current.style["background"] = "grey";
        itemPopupSaveButton.current.disabled = true;
        console.log(itemPopupSaveButton.current);
    };

    const showSaveErrorMsg = () => {
        toaster.create(
            {
                title: "Item Information Save Failed",
                type: "error"
            }
        );
    };

    const addItemSave = () => {
        showSaveSuccessMsg();
        disableButton(itemPopupSaveButton);
    }

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

            <Flex justify={"space-between"} gap={2} alignItems={"center"}>
                <Button className={"top-bar-button"} background={"green"}
                        onClick={openItemAdd} fontSize={"150%"}>Add Item</Button>
            </Flex>
            <Table header={tableTitles} data={inventoryData}/>

            { /* Item Management Popup */}
            <Popup show={itemManageOpened}>
                <Flex justify={"flex-start"}>
                    <Text fontSize={"2xl"}>Item Management</Text>
                </Flex>

                { /* Item Information */ }
                <Flex justify={"space-between"} gap={2}>
                    <Text text-align={"center"}>Item Name</Text>
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

            { /* Add Item Popup */ }
            <Popup show={itemAddOpened}>
                <Stack gap="0.5rem">
                    <Flex justify={"space-between"} gap={"0.5rem"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Add Item</Text>
                        <Button>Scan Item Code</Button>
                    </Flex>

                    { /* Item Information */ }
                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Item ID</Text>
                        <Input type={"text"} maxWidth={"70%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Item Name</Text>
                        <Input type={"text"} maxWidth={"70%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    { /* Item Price */ }
                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Price</Text>
                        <Input type={"number"} min={"0"} step={"0.01"} maxWidth={"70%"}
                               pattern={"[0-9]*\.?[0-9]+"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    { /* Item Stock */ }
                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Stock</Text>
                        <Input type={"number"} min={"0"} maxWidth={"70%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    { /* Popup Operation Buttons */ }
                    <Stack direction={"row"} justify={"end"}>
                        <Button onClick={addItemSave} ref={itemPopupSaveButton}>Save</Button>
                        <Button onClick={closeItemAdd}>Close</Button>
                    </Stack>
                </Stack>
            </Popup>

            <Toaster/>
        </>
    );
}

export default InventoryView;