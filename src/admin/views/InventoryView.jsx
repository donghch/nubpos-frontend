import Table from "@/components/custom/Table.jsx"
import Popup from "@/components/custom/Popup.jsx";
import {Button, Flex, Text, Input, Stack} from "@chakra-ui/react";
import {useEffect, useState, useRef} from "react";
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

const apiUrl = "http://localhost:3000";

/* Helper Functions */

const fetchInventory = async () => {
    const res = await axios.get(`${apiUrl}/inventory`);
    if (res.status === 200)
        return res.data;
    else
        throw Error(res.status);
}

const addItem = async (item) => {
    try {
        const res = await axios.post(`${apiUrl}/inventory`, item);
        return res.status === 201;
    } catch (err) {
        return false;
    }
}

const deleteItem = async (id) => {
    try {
        const res = await axios.delete(`${apiUrl}/inventory/${id}`);
        return res.status === 200;
    } catch (err) {
        return false;
    }
}

async function updateItem(item) {
    try {
        const res = await axios.put(`${apiUrl}/inventory/${item.id}`, item);
        return res.status === 200;
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

    const [seed, setSeed] = useState(0);
    const selectedItem = useRef(null);

    /* General Functions */
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

    /* Item Management Variables */
    const [itemManageOpened, setItemManageOpened] = useState(false);
    const addItemInfoHandle = {
        id: useRef(null),
        name: useRef(null),
        price: useRef(null),
        stock: useRef(null)
    };

    /* Item Management Functions */
    const openInventoryManagement = itemInfo => {
        selectedItem.current = itemInfo;
        setItemManageOpened(true);
    };

    const closeInventoryManagement = () => {
        selectedItem.current = null;
        setItemManageOpened(false);
    };

    const updateItemHandler = () => {
        updateItem(
            {
                id: selectedItem.current.id,
                name: updateItemInfoHandle.name.current.value,
                price: Number(updateItemInfoHandle.price.current.value),
                stock: Number(updateItemInfoHandle.stock.current.value)
            }
        ).then(
            result => {
                if (result === true) {
                    closeInventoryManagement();
                    showSaveSuccessMsg();
                    setSeed(Math.random());
                } else {
                    showSaveErrorMsg();
                }
            }
        )
    }

    /* Add Item Popup Variables */
    const [isAddItemSaveDisabled, setIsAddItemSaveDisabled] = useState(true);
    const [itemAddOpened, setItemAddOpened] = useState(false);
    const updateItemInfoHandle = {
        name: useRef(null),
        price: useRef(null),
        stock: useRef(null)
    };

    /* Add Item Popup Functions */
    const openItemAdd = () => {
        setItemAddOpened(true);
    }

    const closeItemAdd = () => {
        setItemAddOpened(false);
        setIsAddItemSaveDisabled(true);
    }

    const addItemHandler = () => {
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

    /* Delete Item Popup Variables */
    const [itemDeleteOpened, setItemDeleteOpened] = useState(false);

    /* Delete Item Popup Functions */
    const openDeleteItem = item => {
        selectedItem.current = item;
        setItemDeleteOpened(true);
    };

    const closeDeleteItem = () => {
        selectedItem.current = null;
        setItemDeleteOpened(false);
    };

    const showDeleteSuccessMsg = () => {
        toaster.create(
            {
                title: "Item Deleted",
                type: "success"
            }
        )
    };

    const showDeleteErrorMsg = () => {
        toaster.create(
            {
                title: "Failed to delete item",
                type: "error"
            }
        );
    };

    const deleteItemHandler = () => {
        deleteItem(selectedItem.current.id).then(result => {
            if (result === true) {
                closeDeleteItem();
                showDeleteSuccessMsg();
                setSeed(Math.random());
            } else {
                showDeleteErrorMsg();
                closeDeleteItem();
            }
        });
    }

    /* Helper Components */
    function inventoryItemOperationBar(item) {
        return (
            <Stack direction={"row"} justify={"center"} align={"center"}>
                <Button key={`inventory-button-${item.id}-manage`}
                    onClick={() => openInventoryManagement(item)}>Manage</Button>
                <Button key={`inventory-button-${item.id}-delete`}
                    onClick={ () => { openDeleteItem(item) }} background={"red"}>Delete</Button>
            </Stack>
        )
    }

    function popupTitle(text, children) {
        return (
            <Flex justify={"space-between"} gap={"0.5rem"}>
                <Text fontSize={"2xl"} fontWeight={"bold"}>{ text }</Text>
                {children}
            </Flex>
        );
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

                    { popupTitle("Item Management") }

                    <Stack {...inventoryFormStyle}>
                        { /* Item Information */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Name</Text>
                            <Input type={"text"} width={"80%"} ref={ updateItemInfoHandle.name } defaultValue={selectedItem.current ? selectedItem.current.name : ""}/>
                        </Stack>

                        { /* Item Price */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Price</Text>
                            <Input type={"number"} width={"80%"} ref={ updateItemInfoHandle.price } defaultValue={selectedItem.current ? selectedItem.current.price : ""}/>
                        </Stack>

                        { /* Item Stock */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Stock</Text>
                            <Input type={"number"} width={"80%"} ref={ updateItemInfoHandle.stock } defaultValue={selectedItem.current ? selectedItem.current.stock : ""}/>
                        </Stack>
                    </Stack>

                    { /* Popup Operation Buttons */ }
                    <Stack direction={"row"} justify={"end"}>
                        <Button onClick={ updateItemHandler }>Save</Button>
                        <Button onClick={ closeInventoryManagement }>Close</Button>
                    </Stack>
                </Stack>
            </Popup>

            
            { /* Add Item Popup */ }
            <Popup show={itemAddOpened}>
                <Stack gap="0.5rem">

                    { popupTitle("Add Item", (<Button>Scan Item Code</Button>)) }

                    <Stack {...inventoryFormStyle}>
                        { /* Item Information */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Item ID</Text>
                            <Input type={"text"} ref={ addItemInfoHandle.id } maxWidth={"80%"} onChange={() => setIsAddItemSaveDisabled(false)}/>
                        </Stack>

                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Item Name</Text>
                            <Input type={"text"} ref={ addItemInfoHandle.name } maxWidth={"80%"} onChange={() => setIsAddItemSaveDisabled(false)}/>
                        </Stack>

                        { /* Item Price */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Price</Text>
                            <Input type={"number"} ref={ addItemInfoHandle.price } min={"0"} step={"0.01"} maxWidth={"80%"}
                                   pattern={"[0-9]*\.?[0-9]+"} onChange={() => setIsAddItemSaveDisabled(false)}/>
                        </Stack>

                        { /* Item Stock */ }
                        <Stack {...inventoryFormItemStyle}>
                            <Text flexShrink={0}>Stock</Text>
                            <Input type={"number"} ref={ addItemInfoHandle.stock } min={"0"} maxWidth={"80%"} onChange={() => setIsAddItemSaveDisabled(false)}/>
                        </Stack>
                    </Stack>

                    { /* Popup Operation Buttons */ }
                    <Stack direction={"row"} justify={"end"}>
                        <Button onClick={addItemHandler} disabled={ isAddItemSaveDisabled }>Save</Button>
                        <Button onClick={closeItemAdd}>Close</Button>
                    </Stack>
                </Stack>
            </Popup>

            { /* Delete Confirmation Popup */}
            <Popup show={itemDeleteOpened}>

                <Stack gap="0.5rem">
                    { popupTitle("Sure to Delete?") }

                    <Stack>
                        <Button background={"red"} onClick={ deleteItemHandler }>YES, DELETE</Button>
                        <Button onClick={ closeDeleteItem }>NO</Button>
                    </Stack>
                </Stack>

            </Popup>

            <Toaster/>
        </>
    );
}

export default InventoryView;