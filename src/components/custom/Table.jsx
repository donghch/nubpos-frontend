
import "./table.css"

function Table({ header, data }) {

    // render helpers
    let renderedHeaders = [];
    for (const key in header) {
        renderedHeaders.push(
            <th scope={"col"} >{ header[key] }</th>
        );
    }

    const renderedItems = data.map(
        item => {
            let result = [];

            for (const key in header) {
                result.push(<td>{ item[key] }</td>)
            }

            return (
                <tr>
                    { result }
                </tr>
            );
        }
    )

    return (
        <table>
            <thead>
                { renderedHeaders }
            </thead>
            <tbody>
                {renderedItems}
            </tbody>
            <tfoot></tfoot>
        </table>
    );

}

export default Table;