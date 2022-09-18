import React, { useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";

const myHeaders = [
  "WEEK ENDING",
  "RETAIL SALES",
  "WHOLESALE SALES",
  "UNIT SOLD",
  "RETAIL MARGIN",
];

function Table({ data }) {
  const [sales] = useState(data.sales);

  const fields = Object.keys(sales[0]);

  let index = 0;
  const COLUMS = [];

  for (let field of fields) {
    let object = { Header: 1, accessor: 1 };

    object.Header = myHeaders[index];
    index++;
    object.accessor = field;
    COLUMS.push(object);
  }

  const columns = useMemo(() => COLUMS, []);
  const content = useMemo(() => sales, []);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns,
        data: content,
      },
      useSortBy
    );

  return (
    <div>
      <h5>Note: Click headers: Ascending order, Descending order, and back to Default order</h5>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
