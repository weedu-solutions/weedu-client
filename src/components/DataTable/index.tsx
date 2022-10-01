
export function DataTable({ data }: any) {
  const columns = data[0] && Object.keys(data[0])

  return (
    <table>
      <thead>
        <tr>{ data[0] && columns.map((heading: any) => <th>{heading}</th>)}</tr>
      </thead>
      <tbody>
        {data.map((row:any) =>
          <tr>
            {
              columns.map((column: any) => <td>{row[column]}</td>)
            }
          </tr> 
        )}
      </tbody>
    </table>
  )
}
