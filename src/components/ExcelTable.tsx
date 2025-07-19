'use client'
export default function ExcelTable({
  data,
  onEdit,
}: {
  data: any[]
  onEdit: (updatedData: any[]) => void
}) {
  const headers = Object.keys(data[0])

  const handleChange = (rowIdx: number, key: string, value: string) => {
    const newData = [...data]
    newData[rowIdx][key] = value
    onEdit(newData)
  }
  console.log('ExcelTable data:', data)

  return (
    <div className="overflow-auto mt-6">
      <table className="min-w-full border text-sm text-gray-800">
        <thead className="bg-blue-100">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-4 py-2 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="odd:bg-white even:bg-gray-50">
              {headers.map((header) => (
                <td key={header} className="px-4 py-2 border">
                  <input
                    type="text"
                    value={row[header]}
                    onChange={(e) => handleChange(idx, header, e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
