import Table from "@/components/custom/Table.jsx"
import Popup from "@/components/custom/Popup.jsx";
import {Button, Flex, Text, Input, Stack} from "@chakra-ui/react";
import {useEffect, useState, useRef, useCallback} from "react";
import {Toaster, toaster} from "@/components/ui/toaster.jsx";
import axios from "axios";
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

const apiUrl = "http://localhost:3000";

/* Helper Functions */

async function fetchInventory() {
    const res = await axios.get(`${apiUrl}/inventory`);
    if (res.status === 200)
        return res.data;
    else
        throw Error(res.status);
}

async function addItem(item) {
    try {
        const res = await axios.post(`${apiUrl}/inventory`, item);
        return res.status === 201;
    } catch (err) {
        return false;
    }
}

function InventoryView() {

    const [inventoryData, setInventoryData] = useState([]);
    const [itemManageOpened, setItemManageOpened] = useState(false);
    const [itemAddOpened, setItemAddOpened] = useState(false);
    const [seed, setSeed] = useState(0);
    const selectedItem = useRef(null);

    { /* Add Item Popup Variables */}
    const itemPopupSaveButton = useRef(null);
    const addItemInfoHandle = {
        id: useRef(null),
        name: useRef(null),
        price: useRef(null),
        stock: useRef(null)
    };

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
        disableButton(itemPopupSaveButton);
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
        addItem({
                id: addItemInfoHandle.id.current.value,
                name: addItemInfoHandle.name.current.value,
                price: Number(addItemInfoHandle.price.current.value),
                stock: Number(addItemInfoHandle.stock.current.value)
            }
        ).then(result => {
            if (result === true) {
                showSaveSuccessMsg();
                closeItemAdd();
                setSeed(Math.random());
            } else {
                showSaveErrorMsg();
            }
        } )
    }

    /* Data Fetching */
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
            // we could trigger the fetch by changing the seed
        }, [seed]
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
                <Stack gap={"0.5rem"}>
                    <Flex justify={"flex-start"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Item Management</Text>
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
                </Stack>
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
                        <Input type={"text"} ref={ addItemInfoHandle.id } maxWidth={"70%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Item Name</Text>
                        <Input type={"text"} ref={ addItemInfoHandle.name } maxWidth={"70%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    { /* Item Price */ }
                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Price</Text>
                        <Input type={"number"} ref={ addItemInfoHandle.price } min={"0"} step={"0.01"} maxWidth={"70%"}
                               pattern={"[0-9]*\.?[0-9]+"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                    </Stack>

                    { /* Item Stock */ }
                    <Stack direction={"row"} align={"center"} justify={"space-between"}>
                        <Text flexShrink={0} width={"20%"}>Stock</Text>
                        <Input type={"number"} ref={ addItemInfoHandle.stock } min={"0"} maxWidth={"70%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
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