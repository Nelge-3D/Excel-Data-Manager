import { utils, writeFile } from "xlsx"

export function exportToExcel(data: any[], filename = "employees.xlsx") {
  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()
  utils.book_append_sheet(workbook, worksheet, "Employees")
  writeFile(workbook, filename)
}
