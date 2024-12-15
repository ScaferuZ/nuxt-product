<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Button } from "@/components/ui/button";
import { productSchema, type ProductFormType } from "~/schema/product.schema.ts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, alertDescription } from "@/components/ui/alert";

const props = defineProps<{
  initialValues?: ProductFormType | null;
  isSubmitting: boolean;
  submitError?: string | null;
}>();

const emit = defineEmits<{
  submit: [values: ProductFormType];
  dirtyChange: [isDirty: boolean];
}>();

const defaultValues = {
  title: "",
  price: 0,
  description: "",
  category: "",
};

const form = useForm({
  validationSchema: toTypedSchema(productSchema),
  initialValues: props.initialValues ?? defaultValues,
});

watch(
  () => props.initialValues,
  (newValues) => {
    if (newValues) {
      form.setValues({
        title: newValues.title,
        price: Number(newValues.price),
        description: newValues.description,
        category: newValues.category,
      });
    }
  },
  { deep: true },
);

watch(
  () => form.meta.value.dirty,
  (isDirty) => {
    emit("dirtyChange", isDirty);
  },
);

const onSubmit = form.handleSubmit((values) => {
  emit("submit", values);
});
</script>
<template>
  <form @submit="onSubmit" class="space-y-6">
    <Alert variant="destructive" v-if="submitError">
      <AlertDescription>{{ submitError }}</AlertDescription>
    </Alert>

    <FormField v-slot="{ field }" name="title" :validate="form.validateField">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input
            v-bind="field"
            placeholder="Enter product title"
            :disabled="isSubmitting"
            :model-value="field.value"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="price" :validate="form.validateField">
      <FormItem>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input
            v-bind="field"
            type="number"
            step="0.01"
            placeholder="Enter price"
            :disabled="isSubmitting"
            :model-value="field.value"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="category" :validate="form.validateField">
      <FormItem>
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Input
            v-bind="field"
            placeholder="Enter category"
            :disabled="isSubmitting"
            :model-value="field.value"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ field }" name="description" :validate="form.validateField">
      <FormItem>
        <FormLabel>Description</FormLabel>
        <FormControl>
          <Textarea
            v-bind="field"
            placeholder="Enter product description"
            :disabled="isSubmitting"
            :model-value="field.value"
            @update:model-value="field.onChange"
            @blur="field.onBlur"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex justify-end gap-4">
      <Button type="button" variant="ghost" @click="$router.back()" :disabled="isSubmitting">
        Cancel
      </Button>
      <Button type="submit" :disabled="isSubmitting">
        <template v-if="isSubmitting">
          <span class="i-lucide-loader-2 animate-spin mr-2" />
          Saving...
        </template>
        <span v-else>Save</span>
      </Button>
    </div>

    <p v-if="form.meta.dirty" class="text-sm text-muted-foreground">You have unsaved changes</p>
  </form>
</template>
