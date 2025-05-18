
import { Tabs, Text } from "@chakra-ui/react";
import Table from "@/components/custom/Table.jsx";
import {useEffect, useState} from "react";

/* Sale Record Table */

const saleRecordTableHeaders = {
    id: "Sale ID",
    date: "Sale Date",
    details: "Details"
};

const testRecord = [
    {
        id: "1",
        date: Date.now(),
        details: "Details"
    }
];

function SaleRecordTable({saleData}) {

    // TODO: Fetch and process sale data
    const [seed, setSeed] = useState(0);
    useEffect(() => {})

    return (
        <Table header={saleRecordTableHeaders} data={saleData}>

        </Table>
    );
}

/* CSS Properties */
const tabTextProps = {
    fontSize: "2xl"
};

function AnalyticsView() {

    const [saleData, setSaleData] = useState({});

    return (
        <Tabs.Root defaultValue={"general-stats"}>
            <Tabs.List>
                <Tabs.Trigger value={"general-stats"}>
                    <Text {...tabTextProps}>General</Text>
                </Tabs.Trigger>
                <Tabs.Trigger value={"sale-records"}>
                    <Text {...tabTextProps}>Sale Records</Text>
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value={"general-stats"}>
                This is general stats
            </Tabs.Content>
            <Tabs.Content value={"sale-records"}>
                <SaleRecordTable saleData={testRecord} />
            </Tabs.Content>
        </Tabs.Root>
    );

}

export default AnalyticsView;