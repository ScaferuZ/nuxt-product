<script setup>
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/product/ProductTable.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold tracking-tight">Products</h1>
      <NuxtLink to="/products/create">
        <Button>Add Product</Button>
      </NuxtLink>
    </div>

    <ProductTable />
  </div>
</template>
