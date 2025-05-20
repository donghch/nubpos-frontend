
import {HStack, VStack, Text, Button, Container} from "@chakra-ui/react";
import { NavLink } from "react-router";
import {useState} from "react";

/* Helper Components */

const scannedItemsViewProps = {

};

const saleViewToolbarProps = {
    padding: "0.5rem",
    borderBottom: "1px solid gray",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
};

const saleViewButtonProps = {
    fontSize: "1.3rem"
};

function SaleView({itemData}) {

    return (
        <VStack spacing={2}>
            { /* Toolbar */ }
            <Container {...saleViewToolbarProps}>
                <Button as={NavLink} to={"/"} {...saleViewButtonProps}>Return to Home</Button>
                <Button background={"red"} {...saleViewButtonProps}>Clear All Items</Button>
            </Container>
        </VStack>
    );
}

const saleBriefViewStyles = {
    width: "30vw",
    borderLeft: "1px solid gray",
};

const saleBriefTitleProps = {
    display: "inline-block",
    width: "100%",
    textAlign: "center",
    fontSize: "1.7rem",
    paddingTop: "0.3rem",
    paddingBottom: "0.3rem",
};

const saleBriefVStackProps = {
    spacing: 2
};

const saleBriefOperationProps = {
    position: "fixed",
    bottom: "0",
    right: "0",
    width: "30vw",
    justifyContent: "center",
    textAlign: "center"
};

const saleBriefOperationButtonProps = {
    width: "100%",
    height: "2em",
    fontSize: "2.5rem",
    background: "#42b883",
    margin: "0.3em",
    padding: "0em",
}

function SaleBriefView() {
    return (
        <div style={saleBriefViewStyles}>
            <VStack {...saleBriefVStackProps}>
                <Text {...saleBriefTitleProps}>Sale Summary</Text>
                <Container></Container>
            </VStack>
            { /* Sale Operations */}
            <div style={saleBriefOperationProps}>
                <Button {...saleBriefOperationButtonProps}>Checkout</Button>
            </div>
        </div>
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
            <div style={{width: "70vw"}}>
                <SaleView />
            </div>
            <SaleBriefView />
        </HStack>
    );

}

export default SalePanel;