"use client";

import { DataTable } from "@/components/common/data-table";
import useBooks from "../action";
import { ColumnDef } from "@tanstack/react-table";
import { Book } from "@/validations/books.validation";
import { ArrowDown, ArrowUp, Pencil, Trash2 } from "lucide-react";
import DropdownAction from "@/components/common/dropdown-action";
import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Books() {
  const { dataBooks, isLoadingBooks, refetchBooks, totalData } = useBooks();
  const pathname = usePathname();
  const [selectedAction, setSelectedAction] = useState<{
    data: Book;
    type: "detail" | "update" | "delete";
  } | null>(null);

  const columns: ColumnDef<Book>[] = [
    {
      accessorKey: "image",
      enableHiding: false,
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        return (
          <div
            className="flex gap-2 font-medium items-center"
            onClick={() => column.toggleSorting(undefined, true)}
          >
            Cover
            {sorted === "asc" && <ArrowUp className="size-3" />}
            {sorted === "desc" && <ArrowDown className="size-3" />}
          </div>
        );
      },
      cell: ({ row }) => (
        <Image
          src={row.getValue("image")}
          alt={row.getValue("name")}
          width={100}
          height={100}
          className="truncate max-w-xs"
        />
      ),
    },
    {
      accessorKey: "name",
      enableHiding: false,
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        return (
          <div
            className="flex gap-2 font-medium items-center"
            onClick={() => column.toggleSorting(undefined, true)}
          >
            Book Title
            {sorted === "asc" && <ArrowUp className="size-3" />}
            {sorted === "desc" && <ArrowDown className="size-3" />}
          </div>
        );
      },
      cell: ({ row }) => {
        return <div className="truncate max-w-xs">{row.getValue("name")}</div>;
      },
    },

    {
      accessorKey: "description",
      enableHiding: false,
      header: () => {
        return <div className="!cursor-default">Description</div>;
      },
      cell: ({ row }) => (
        <div className="truncate max-w-xs">
          {row.getValue("description") ? row.getValue("description") : "-"}
        </div>
      ),
    },
    {
      accessorKey: "author",
      enableHiding: false,
      header: () => {
        return <div className="!cursor-default">Author</div>;
      },
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("author")}</div>
      ),
    },
    {
      accessorKey: "subject",
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        return (
          <div
            className="flex gap-2 font-medium items-center"
            onClick={() => column.toggleSorting(undefined, true)}
          >
            Subject
            {sorted === "asc" && <ArrowUp className="size-3" />}
            {sorted === "desc" && <ArrowDown className="size-3" />}
          </div>
        );
      },
      cell: ({ row }) => {
        return (
          <div className="truncate max-w-xs">
            {row.getValue("subject") ? row.getValue("subject") : "-"}
          </div>
        );
      },
    },
    {
      accessorKey: "year",
      header: ({ column }) => {
        const sorted = column.getIsSorted();
        return (
          <div
            className="flex gap-2 font-medium items-center"
            onClick={() => column.toggleSorting(undefined, true)}
          >
            Year
            {sorted === "asc" && <ArrowUp className="size-3" />}
            {sorted === "desc" && <ArrowDown className="size-3" />}
          </div>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("year")}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="flex justify-center">Actions</div>,
      cell: ({ row }) => {
        return (
          <DropdownAction
            menu={[
              {
                label: (
                  <span className="flex items-center gap-2">
                    <Pencil />
                    Edit
                  </span>
                ),
                variant: "default",
                action: () => {
                  setSelectedAction({
                    data: row.original,
                    type: "update",
                  });
                },
              },
              {
                label: (
                  <span className="flex items-center gap-2">
                    <Trash2 className="text-red-400" />
                    Delete
                  </span>
                ),
                variant: "destructive",
                action: () => {
                  setSelectedAction({
                    data: row.original,
                    type: "delete",
                  });
                },
              },
            ]}
          />
        );
      },
    },
  ];

  return (
    <DataTable
      pathname={pathname}
      isLoading={isLoadingBooks}
      data={dataBooks || []}
      columns={columns}
      refetch={refetchBooks}
      totalData={totalData}
    />
  );
}
