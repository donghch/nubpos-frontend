
import { Grid, GridItem, Button } from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router";
import { useState, useEffect } from "react";
import { LuWarehouse } from "react-icons/lu";
import { TbDeviceAnalytics } from "react-icons/tb";

import "./AdminPanel.css";

function AdminPanel() {

    const [currentTab, setCurrentTab] = useState(0);

    return (
        <div id={"admin-panel"}>
            <Grid templateColumns="repeat(14, 1fr)" spacing={2} id={"admin-panel-layout"}>
                <GridItem colSpan={2} >
                    <Grid templateRows={"repeat(3, 1fr)"} spacing={2} height={"100%"} bg={"black"} id="admin-panel-navbar">
                        <GridItem color={"white"} as={NavLink} to={"inventory"} className={"admin-navbar-item"}>
                            <LuWarehouse style={{ height: "60%", width: "60%" }} />
                        </GridItem>
                        <GridItem color={"white"} as={NavLink} to={"analytics"} className={"admin-navbar-item"}>
                            <TbDeviceAnalytics style={{ height: "60%", width: "60%" }} />
                        </GridItem>
                        <GridItem color={"white"} as={NavLink} to={"/"} className={"admin-navbar-item"}>

                        </GridItem>
                    </Grid>
                </GridItem>
                <GridItem className={"panel-content"} colSpan={12}>
                    <Outlet />
                </GridItem>
            </Grid>
        </div>
    )
}

export default AdminPanel;