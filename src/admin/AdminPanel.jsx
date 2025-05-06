
import { Grid, GridItem } from "@chakra-ui/react";

import "./AdminPanel.css";

function AdminPanel() {

    return (
        <div id={"admin-panel"}>
            <Grid templateColumns="repeat(7, 1fr)" spacing={2} id={"admin-panel-layout"}>
                <GridItem id="admin-panel-navbar" colSpan={2}>

                </GridItem>
                <GridItem id="admin-panel-content" colSpan={5}>
                    Boom
                </GridItem>
            </Grid>
        </div>
    )
}

export default AdminPanel;