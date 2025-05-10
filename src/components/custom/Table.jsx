
import "./table.css"

function Table({ header, data }) {

    // render helpers
    let renderedHeaders = [];
    for (const key in header) {
        renderedHeaders.push(
            <th key={key} scope={"col"} >{ header[key] }</th>
        );
    }

    const renderedItems = data.map(
        item => {
            let result = [];

            for (const key in header) {
                result.push(<td key={key}>{ item[key] }</td>)
            }

            return (
                <tr key={item.id}>
                    { result }
                </tr>
            );
        }
    )

    return (
        <table>
            <thead>
                <tr>
                    { renderedHeaders }
                </tr>
            </thead>
            <tbody>
                {renderedItems}
            </tbody>
            <tfoot></tfoot>
        </table>
    );

}

export default Table;