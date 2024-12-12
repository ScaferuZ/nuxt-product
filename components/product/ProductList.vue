<script setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const {
  products,
  isLoading,
  isDeleting,
  error,
  productToDelete,
  fetchProducts,
  confirmDelete,
  cancelDelete,
  deleteProduct,
} = useProducts();

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div>
    <div v-if="error" class="text-red-500 mb-4">Error loading products: {{ error.message }}</div>

    <ProductListSkeleton v-if="isLoading" />

    <Table v-else>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Category</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow v-for="product in products" :key="product.id">
          <TableCell>{{ product.title }}</TableCell>
          <TableCell>${{ product.price }}</TableCell>
          <TableCell>{{ product.category }}</TableCell>
          <TableCell class="text-right space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <NuxtLink :to="`/products/${product.id}`">Edit</NuxtLink>
            </Button>
            <Button variant="destructive" size="sm" @click="confirmDelete(product)">
              Delete
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Dialog :open="!!productToDelete" @update:open="cancelDelete">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{{ productToDelete?.title }}"?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" @click="cancelDelete">Cancel</Button>
          <Button variant="destructive" :disabled="isDeleting" @click="deleteProduct">
            {{ isDeleting ? "Deleting..." : "Delete" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
