
import Table from "@/components/custom/Table.jsx"
import SearchBar from "@/components/custom/SearchBar.jsx"

const tableTitles = ["Item ID", "Item Name", "Price", "Operations"]

function InventoryView() {

    return (
        <>
            <p>There are more problems</p>
            <SearchBar />
            <Table header={tableTitles} />
        </>

    );
}

export default InventoryView;