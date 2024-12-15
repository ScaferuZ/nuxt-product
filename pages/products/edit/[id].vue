<script setup lang="ts">
import { productAPI } from "~/services/product/product.api";
import type { ProductFormType } from "~/schemas/product.schema";
import ProductForm from "~/components/Form/ProductForm.vue";
import LoaderOverlay from "~/components/ui/loaderoverlay/LoaderOverlay.vue";

const route = useRoute();
const router = useRouter();

const isLoading = ref(false);
const isSubmitting = ref(false);
const product = ref<ProductFormType | null>(null);
const error = ref<string | null>(null);
const submitError = ref<string | null>(null);
const hasUnsavedChanges = ref(false);
const { showSuccess } = useNotification();

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

const fetchProduct = async () => {
  isLoading.value = true;
  try {
    const { data } = await productAPI.getById(Number(route.params.id));
    product.value = {
      title: data.title,
      price: Number(data.price),
      description: data.description,
      category: data.category,
    };
    console.log("Fetched product:", product.value); // Debug log
  } catch (error) {
    error.value = "Failed to load product";
    console.error("Error fetching product:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleSubmit = async (values: ProductFormType) => {
  isSubmitting.value = true;
  submitError.value = null;
  try {
    await productAPI.update(Number(route.params.id), {
      ...values,
      price: Number(values.price),
    });
    hasUnsavedChanges.value = false;
    showSuccess("Product updated successfully");
    router.push("/");
  } catch (error) {
    submitError.value = error.message;
    console.error("Error updating product:", error);
  } finally {
    isSubmitting.value = false;
  }
};

const handleDirtyChange = (isDirty: boolean) => {
  hasUnsavedChanges.value = isDirty;
};

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <div>
    <LoaderOverlay :is-loading="isLoading || isSubmitting" />

    <h1 class="text-3xl font-bold tracking-tight mb-6">Edit Product</h1>

    <Alert variant="destructive" v-if="error" class="mb-6">
      <AlertDescription>{{ error }}</AlertDescription>
    </Alert>

    <!-- Only render form when we have product data -->
    <template v-if="!isLoading && product">
      <ProductForm
        :key="product.title"
        :initial-values="product"
        :is-submitting="isSubmitting"
        :submit-error="submitError"
        @submit="handleSubmit"
        @dirty-change="handleDirtyChange"
      />
    </template>
  </div>
</template>
