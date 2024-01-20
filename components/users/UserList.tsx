"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { ColumnDef, ColumnResizeDirection, ColumnResizeMode, RowData, RowSelectionState, SortingState, createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";



import { IndeterminateCheckbox } from "../IndeterminateCheckbox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ColDev } from "./ColDev";


declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<User>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    return (
      <>
        <Input
          className=" h-full border-none bg-transparent px-1"
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      </>
    )
  },
}

const handleDelete = (rowSelection: RowSelectionState) => {
  console.log(JSON.stringify(rowSelection, null, 2))
}
function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
}
const columnHelper = createColumnHelper<User>()

const columns = ColDev()

// function ColDev() {
//   return [
//     {
//       id: "select-col",

//       header: ({ table }) => (
//         <IndeterminateCheckbox
//           checked={table.getIsAllRowsSelected()}
//           indeterminate={table.getIsSomeRowsSelected()}
//           onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
//         />
//       ),
//       cell: ({ row }) => (
//         <IndeterminateCheckbox
//           checked={row.getIsSelected()}
//           disabled={!row.getCanSelect()}
//           onChange={row.getToggleSelectedHandler()}
//         />
//       ),
//     },
//     columnHelper.accessor("id", {
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor("name", {
//       cell: (info) => info.getValue(),
//     }),
//     columnHelper.accessor((row) => row.email, {
//       id: "email",
//       cell: (info) => <i>{info.getValue()}</i>,
//       header: () => <span>Email</span>,
//     }),
//     columnHelper.accessor("guest", {
//       header: () => "Guest",
//       cell: (info) => <Checkbox checked={info.renderValue()!} />,
//       enableResizing: true,
//       size: 10,
//     }),
//     columnHelper.accessor("active", {
//       header: () => "Active",
//       cell: (info) => <Checkbox checked={info.getValue()!} />,
//       enableResizing: true,
//     }),
//   ]
// }

export function UserList(user: User[]) {
  const [data, setData] = React.useState(user.user)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({}) //manage your own row selection state
  const [columnResizeMode, setColumnResizeMode] =
    React.useState<ColumnResizeMode>("onChange")

  const [columnResizeDirection, setColumnResizeDirection] =
    React.useState<ColumnResizeDirection>("ltr")
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const router = useRouter()

  const update = async (User: User) => {
    await fetch(`/api/user/${User.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    })
    router.refresh()
  }
  const table = useReactTable({
    data,
    columns,
    defaultColumn: defaultColumn,
    state: {
      sorting,
      rowSelection, //pass the row selection state back to the table instance
    },
    initialState: {
      pagination: {
        pageSize: 9,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection, //hoist up the row selection state to your own scope
    enableRowSelection: true,
    enableColumnResizing: true,
    columnResizeMode,
    columnResizeDirection,
   
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()

        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
        update({ ...data[rowIndex], [columnId]: value })
      },
    },
  })

  return (
    <div className="mx-auto flex h-screen  w-full flex-col ">
      <table className="w-full border ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b bg-slate-400 uppercase text-gray-100"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-4 text-left font-medium ${
                    header.id === "select-col" ? "w-1" : ""
                  }`}
                >
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? "cursor-pointer select-none flex min-w-[36px]"
                          : "",
                        onClick: header.column.getToggleSortingHandler(),
                        onDoubleClick: () => header.column.resetSize(),
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                        className: `resizer ${
                          table.options.columnResizeDirection
                        } ${header.column.getIsResizing() ? "isResizing" : ""}`,
                      }}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <span className="pl-2">↑</span>,
                        desc: <span className="pl-2">↓</span>,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`border-b border-gray-200  hover:bg-slate-200 `}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border-l px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className=" px-4 text-left  ">
              <IndeterminateCheckbox
                {...{
                  checked: table.getIsAllPageRowsSelected(),
                  indeterminate: table.getIsSomePageRowsSelected(),
                  onChange: table.getToggleAllPageRowsSelectedHandler(),
                }}
              />
            </td>
            <td className="text-xs" colSpan={20}>
              Page Rows ({table.getRowModel().rows.length})
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="mt-1 flex w-full flex-col items-center gap-2 text-xs sm:flex-row">
        <div className="mb-2 sm:mb-0 sm:mr-auto">
          <span className="mr-2">Items per page</span>
          <select
            className="w-16 rounded border border-gray-200 p-1"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[2, 4, 6, 8].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <button
            className={`${
              !table.getCanPreviousPage()
                ? "bg-gray-100"
                : "hover:curstor-pointer bg-gray-100 hover:bg-gray-200"
            } rounded p-1`}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="h-5 w-5">{"<<"}</span>
          </button>
          <button
            className={`${
              !table.getCanPreviousPage()
                ? "bg-gray-100"
                : "hover:curstor-pointer bg-gray-100 hover:bg-gray-200"
            } rounded p-1`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="h-5 w-5">{"<"}</span>
          </button>
          <span className="flex items-center gap-1">
            <input
              min={1}
              max={table.getPageCount()}
              type="number"
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="w-10 rounded border p-1"
            />
            de {table.getPageCount()}
          </span>
          <button
            className={`${
              !table.getCanNextPage()
                ? "bg-gray-100"
                : "hover:curstor-pointer bg-gray-100 hover:bg-gray-200"
            } rounded p-1`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="h-5 w-5">{">"}</span>
          </button>
          <button
            className={`${
              !table.getCanNextPage()
                ? "bg-gray-100"
                : "hover:curstor-pointer bg-gray-100 hover:bg-gray-200"
            } rounded p-1`}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="h-5 w-5">{">>"}</span>
          </button>
        </div>
        <div></div>
      </div>
      <div className="mb-2 text-xs sm:mb-0 sm:mr-auto">
        {Object.keys(rowSelection).length} of{" "}
        {table.getPreFilteredRowModel().rows.length} Total Rows Selected
        {Object.keys(rowSelection).length > 0 && (
          <Button variant="destructive" className="h-4 p-0 px-1 " onClick={() => {handleDelete(rowSelection)}} >delete</Button>
        )}
      </div>
    </div>
  )
}