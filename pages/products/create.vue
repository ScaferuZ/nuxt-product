<script setup lang="ts">
import { productAPI } from "~/services/product/product.api";
import type { ProductFormType } from "~/schema/product.schema";
import ProductForm from "~/components/Form/ProductForm.vue";
import LoaderOverlay from "~/components/ui/loaderoverlay/LoaderOverlay.vue";

const router = useRouter();
const isSubmitting = ref(false);
const submitError = ref<string | null>(null);
const hasUnsavedChanges = ref(false);
const { showSuccess, showError } = useNotification();

onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges.value) {
    const answer = window.confirm("You have unsaved changes. Are you sure you want to leave?");
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});

const handleSubmit = async (values: ProductFormType) => {
  isSubmitting.value = true;
  submitError.value = null;
  try {
    await productAPI.create({
      ...values,
      price: Number(values.price),
    });
    hasUnsavedChanges.value = false;
    showSuccess("Product created successfully");
    router.push("/");
  } catch (error) {
    submitError.value = "Failed to create product";
    console.error("Error creating product:", error);
    showError("Failed to create product");
  } finally {
    isSubmitting.value = false;
  }
};

const handleDirtyChange = (isDirty: boolean) => {
  hasUnsavedChanges.value = isDirty;
};
</script>

<template>
  <LoaderOverlay :isLoading="isSubmitting" />
  <div>
    <h1 class="text-3xl font-bold tracking-tight mb-6">Create Product</h1>
    <ProductForm
      :is-submitting="isSubmitting"
      :submit-error="submitError"
      @submit="handleSubmit"
      @dirty-change="handleDirtyChange"
    />
  </div>
</template>
