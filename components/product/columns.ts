import { h } from "vue";
import type { IProduct } from "~/types/IProduct";
import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "@/components/product/DataTableDropdown.vue";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";

export function getColumns(onDelete: (product: IProduct) => void): ColumnDef<IProduct>[] {
  return [
    {
      accessorKey: "title",
      header: ({ column }) => {
        return h(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          },
          () => ["Title", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
        );
      },
      cell: ({ row }) => h("div", { class: "lowercase text-left" }, row.getValue("title")),
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return h(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          },
          () => ["Price", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
        );
      },
      cell: ({ row }) => {
        const price = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price);

        return h("div", { class: "text-center font-medium" }, formatted);
      },
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return h(
          Button,
          {
            variant: "ghost",
            onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
          },
          () => ["Category", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
        );
      },
      cell: ({ row }) => {
        return h("div", { class: "font-medium text-center" }, row.getValue("category"));
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;

        return h(DropdownAction, {
          product,
          onDeleteProduct: onDelete,
        });
      },
    },
  ];
}
