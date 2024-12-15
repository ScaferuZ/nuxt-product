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

const { showSuccess, showError } = useNotification();

const searchQuery = ref("");
const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;

  // change query to lowercase so that the search is case-insensitive
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(
    (product) =>
      product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
  );
});

const handleDelete = async () => {
  try {
    await deleteProduct();
    showSuccess("Product deleted successfully");
  } catch (error) {
    showError("Failed to delete product");
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center space-x-2">
      <Input v-model="searchQuery" placeholder="Search by title or category..." class="max-w-sm">
        <template #prefix>
          <span class="i-lucide-search h-4 w-4 text-muted-foreground" />
        </template>
      </Input>
    </div>

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
        <TableRow v-for="product in filteredProducts" :key="product.id">
          <TableCell>{{ product.title }}</TableCell>
          <TableCell>${{ product.price }}</TableCell>
          <TableCell>{{ product.category }}</TableCell>
          <TableCell class="text-right space-x-2">
            <Button variant="ghost" size="sm" asChild>
              <NuxtLink :to="`/products/edit/${product.id}`">Edit</NuxtLink>
            </Button>
            <Button variant="destructive" size="sm" @click="confirmDelete(product)">
              Delete
            </Button>
          </TableCell>
        </TableRow>
        <TableRow v-if="filteredProducts.length === 0">
          <TableCell colspan="4" class="h-24 text-center"> No products found. </TableCell>
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
          <Button variant="destructive" :disabled="isDeleting" @click="handleDelete">
            {{ isDeleting ? "Deleting..." : "Delete" }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
