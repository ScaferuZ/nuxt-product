import { productAPI } from "~/services/product/product.api";
import type { IProduct } from "~/types/IProduct";

export const useProducts = () => {
  const products = ref<IProduct[]>([]);
  const isLoading = ref(false);
  const isDeleting = ref(false);
  const error = ref<Error | null>(null);
  const productToDelete = ref<IProduct | null>(null);

  const confirmDelete = (product: IProduct) => {
    productToDelete.value = product;
  };

  const cancelDelete = () => {
    productToDelete.value = null;
  };

  const fetchProducts = async () => {
    isLoading.value = true;
    try {
      const { data } = await productAPI.getAll();
      products.value = data;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error("An unknown error occurred");
    } finally {
      isLoading.value = false;
    }
  };

  const deleteProduct = async (id: number) => {
    if (!productToDelete.value) return;

    isDeleting.value = true;

    try {
      await productAPI.delete(productToDelete.value.id);
      products.value = products.value.filter((product) => product.id !== productToDelete.value?.id);
      productToDelete.value = null;
    } catch (err) {
      error.value = err instanceof Error ? err : new Error("An unknown error occurred");
    } finally {
      isDeleting.value = false;
    }
  };

  return {
    products,
    isLoading,
    isDeleting,
    error,
    productToDelete,
    fetchProducts,
    confirmDelete,
    cancelDelete,
    deleteProduct,
  };
};
