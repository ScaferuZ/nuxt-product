<script setup>
import { Button } from "@/components/ui/button";
import ProductList from "@/components/product/ProductList.vue";
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold tracking-tight">Products</h1>
      <NuxtLink to="/products/create">
        <Button>Add Product</Button>
      </NuxtLink>
    </div>

    <ProductList />
  </div>
</template>
