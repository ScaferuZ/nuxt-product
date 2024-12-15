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
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

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
const currentPage = ref(1);
const itemsPerPage = 10;

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value;

  // change query to lowercase so that the search is case-insensitive
  const query = searchQuery.value.toLowerCase();
  return products.value.filter(
    (product) =>
      product.title.toLowerCase().includes(query) || product.category.toLowerCase().includes(query),
  );
});

// find out how much pages are there based on the products length
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

// reset to page 1 when search query changes
watch(searchQuery, () => {
  currentPage.value = 1;
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
        <TableRow v-for="product in paginatedProducts" :key="product.id">
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

    <div v-if="totalPages > 1" class="flex justify-center">
      <Pagination class="flex items-center gap-1">
        <PaginationFirst
          class="h-9 w-9 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
          :disabled="currentPage === 1"
          @click="currentPage = 1"
        />
        <PaginationPrev
          class="h-9 w-9 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
          :disabled="currentPage === 1"
          @click="currentPage--"
        />

        <PaginationList class="flex items-center gap-1">
          <PaginationListItem v-for="page in totalPages" :key="page" :value="String(page)">
            <button
              class="h-9 w-9 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
              :class="{
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground':
                  currentPage === page,
              }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
          </PaginationListItem>
        </PaginationList>

        <PaginationNext
          class="h-9 w-9 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
          :disabled="currentPage === totalPages"
          @click="currentPage++"
        />
        <PaginationLast
          class="h-9 w-9 rounded-md border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground"
          :disabled="currentPage === totalPages"
          @click="currentPage = totalPages"
        />
      </Pagination>
    </div>

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
