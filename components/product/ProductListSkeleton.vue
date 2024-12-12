<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
</script>

<template>
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Title</TableHead>
        <TableHead>Price</TableHead>
        <TableHead>Category</TableHead>
        <TableHead class="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow v-for="n in 5" :key="n">
        <TableCell><Skeleton class="h-4 w-[250px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[60px]" /></TableCell>
        <TableCell><Skeleton class="h-4 w-[100px]" /></TableCell>
        <TableCell class="text-right">
          <div class="flex justify-end gap-2">
            <Skeleton class="h-8 w-16" />
            <Skeleton class="h-8 w-16" />
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</template>
