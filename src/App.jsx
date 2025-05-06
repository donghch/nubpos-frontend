import { useState } from 'react'
import { Grid, GridItem } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";

import "./App.css";
import "./index.css"

function App() {

    return (
        <div id={"app"}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6} id={"entryGrid"}>
                <GridItem colSpan={3}>
                    <Button id={"saleButton"} bg={"#E4580B"}>
                        <IoCartOutline />
                    </Button>
                </GridItem>
                <GridItem colSpan={2}>
                    <Button id={"adminButton"} bg={"#2C3D73"}>
                        <IoSettingsOutline />
                    </Button>
                </GridItem>
            </Grid>
        </div>
    );
}

export default App;
