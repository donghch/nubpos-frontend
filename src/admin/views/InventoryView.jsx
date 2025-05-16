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

/* Style Object Definitions */
const inventoryFormStyle = {
    direction: "column",
    align: "center",
    justify: "center",
    width: "100%"
};

const inventoryFormItemStyle = {
    direction: "row",
    align: "center",
    justify: "end",
    width: "95%"
};

function InventoryView() {

    const [inventoryData, setInventoryData] = useState([]);
    const [itemManageOpened, setItemManageOpened] = useState(false);
    const [itemAddOpened, setItemAddOpened] = useState(false);
    const [seed, setSeed] = useState(0);
    const selectedItem = useRef(null);

    /* Add Item Popup Variables */
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

    /* Add Item Popup Functions */
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

    /* Item Table Operation Entry */
    function inventoryItemOperationBar(item) {
        return (
            <Stack direction={"row"} justify={"center"} align={"center"}>
                <Button key={`inventory-button-${item.id}-manage`}
                    onClick={() => openInventoryManagement(item)}>Manage</Button>
                <Button key={`inventory-button-${item.id}-delete`} background={"red"}>Delete</Button>
            </Stack>
        )
    }

    /* Data Fetching */
    useEffect(
        () => {
            fetchInventory().then(
                data => {
                    data = data.map(
                        item => {
                            item["operations"] = inventoryItemOperationBar(item);
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
                <Stack gap={"0.5rem"} justify={"center"}>
                    <Flex justify={"flex-start"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Item Management</Text>
                    </Flex>

                    <Stack {...inventoryFormStyle}>
                        { /* Item Information */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Name</Text>
                            <Input type={"text"} width={"80%"} defaultValue={selectedItem.current ? selectedItem.current.name : ""}/>
                        </Stack>

                        { /* Item Price */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Price</Text>
                            <Input type={"number"} width={"80%"} defaultValue={selectedItem.current ? selectedItem.current.price : ""}/>
                        </Stack>

                        { /* Item Stock */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Stock</Text>
                            <Input type={"number"} width={"80%"} defaultValue={selectedItem.current ? selectedItem.current.stock : ""}/>
                        </Stack>
                    </Stack>

                    { /* Popup Operation Buttons */ }
                    <Stack direction={"row"} justify={"end"}>
                        <Button onClick={showSaveErrorMsg}>Save</Button>
                        <Button onClick={closeInventoryManagement}>Close</Button>
                    </Stack>
                </Stack>
            </Popup>

            
            { /* Add Item Popup */ }
            <Popup show={itemAddOpened}>
                <Stack gap="0.5rem">
                    <Flex justify={"space-between"} gap={"0.5rem"}>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>Add Item</Text>
                        <Button>Scan Item Code</Button>
                    </Flex>

                    <Stack {...inventoryFormStyle}>
                        { /* Item Information */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Item ID</Text>
                            <Input type={"text"} ref={ addItemInfoHandle.id } maxWidth={"80%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                        </Stack>

                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Item Name</Text>
                            <Input type={"text"} ref={ addItemInfoHandle.name } maxWidth={"80%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                        </Stack>

                        { /* Item Price */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Price</Text>
                            <Input type={"number"} ref={ addItemInfoHandle.price } min={"0"} step={"0.01"} maxWidth={"80%"}
                                   pattern={"[0-9]*\.?[0-9]+"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                        </Stack>

                        { /* Item Stock */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Stock</Text>
                            <Input type={"number"} ref={ addItemInfoHandle.stock } min={"0"} maxWidth={"80%"} onChange={() => enableButton(itemPopupSaveButton, "black")}/>
                        </Stack>
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