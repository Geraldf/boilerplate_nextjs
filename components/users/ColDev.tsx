import { User } from "@prisma/client"
import { createColumnHelper } from "@tanstack/react-table"

import { Checkbox } from "@/components/ui/checkbox"
import { IndeterminateCheckbox } from "@/components/IndeterminateCheckbox"

export const ColDev = () => {
  const columnHelper = createColumnHelper<User>()
  return [
    {
      id: "select-col",

      header: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      // cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.email, {
      id: "email",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Email</span>,
    }),
    columnHelper.accessor("guest", {
      header: () => "Guest",
      cell: (info) => <Checkbox checked={info.renderValue()!} />,
      enableResizing: true,
      size: 10,
    }),
    columnHelper.accessor("active", {
      header: () => "Active",
      cell: (info) => <Checkbox checked={info.getValue()!} />,
      enableResizing: true,
    }),
  ]
}
