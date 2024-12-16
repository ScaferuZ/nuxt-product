<script setup lang="ts">
import { getColumns } from "./columns";
import DataTable from "@/components/ui/datatable/DataTable.vue";
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

const handleDelete = async () => {
  try {
    await deleteProduct();
    showSuccess("Product deleted successfully");
  } catch (error) {
    showError("Failed to delete product");
  }
};

const columns = getColumns((product) => confirmDelete(product));

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="py-10 mx-auto">
    <div v-if="error" class="text-red-500 mb-4">Error loading products: {{ error }}</div>

    <DataTable :columns="columns" :data="products" :loading="isLoading" />

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
