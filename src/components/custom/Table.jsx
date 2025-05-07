
import "./table.css"

function Table({ header, data }) {

    // render helpers
    const renderedHeaders = header.map(
        item => <th scope="col">{item}</th>
    );

    return (
        <table>
            <thead>
            { renderedHeaders }
            </thead>
            <tbody></tbody>
            <tfoot></tfoot>
        </table>
    );

}

export default Table;