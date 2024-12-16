<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

import {
  FlexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";

import { valueUpdater } from "../../../lib/utils.ts";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
}>();

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  getFilteredRowModel: getFilteredRowModel(),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
  },
});
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        class="max-w-sm"
        placeholder="Filter products..."
        :model-value="table.getColumn('title')?.getFilterValue() as string"
        @update:model-value="table.getColumn('title')?.setFilterValue($event)"
      />
    </div>

    <div class="border rounded-md">
      <Table v-if="!loading">
        <TableHeader>
          <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() ? 'selected' : undefined"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colspan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
      <div v-if="loading" class="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton class="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton class="h-4 w-[80px]" /></TableHead>
              <TableHead><Skeleton class="h-4 w-[100px]" /></TableHead>
              <TableHead><Skeleton class="h-4 w-[50px]" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="i in 5" :key="i">
              <TableCell><Skeleton class="h-6 w-[250px]" /></TableCell>
              <TableCell><Skeleton class="h-6 w-[80px]" /></TableCell>
              <TableCell><Skeleton class="h-6 w-[100px]" /></TableCell>
              <TableCell><Skeleton class="h-8 w-8" /></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div v-if="!loading" class="flex items-center justify-end py-4 space-x-2 mr-4">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
  </div>
</template>
