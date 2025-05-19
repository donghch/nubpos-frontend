
import { HStack } from "@chakra-ui/react";
import {useState} from "react";



/* Helper Components */

function ScannedItemsView({itemData}) {
    return (
        <p>This is scanned items</p>
    );
}

function SaleBriefView() {
    return (
        <p>This is sale brief</p>
    );
}

/* Main Component */

const rootLayoutProps = {
    height: "100vh",
    alignItems: "top",
    gap: "0"
}

function SalePanel() {

    const [scannedItems, setScannedItems] = useState([]);

    return (
        <HStack {...rootLayoutProps}>
            <ScannedItemsView />
            <SaleBriefView />
        </HStack>
    );

}

export default SalePanel;