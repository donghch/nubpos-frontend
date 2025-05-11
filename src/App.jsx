import {useState} from 'react'
import {Grid, GridItem} from "@chakra-ui/react";
import {IoCartOutline, IoSettingsOutline} from "react-icons/io5";
import {NavLink} from "react-router";

import "./App.css";
import "./index.css"

function App() {

    return (
        <div id={"app"}>
            <Grid templateColumns="repeat(5, 1fr)" gap={6} id={"entryGrid"}>
                <GridItem colSpan={3} as={NavLink} to={"/sale"} id={"saleButton"} bg={"#E4580B"} color={"white"}>
                    <IoCartOutline style={{width: "50%", height: "50%"}} />
                </GridItem>
                <GridItem colSpan={2} as={NavLink} to={"/admin"} id={"adminButton"} bg={"#2C3D73"} color={"white"}>
                    <IoSettingsOutline style={{width: "50%", height: "50%"}} />
                </GridItem>
            </Grid>
        </div>
    );
}

export default App;
