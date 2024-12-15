<script setup lang="ts">
defineProps<{
  isLoading: boolean;
}>();
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-2">
        <span class="i-lucide-loader-2 h-8 w-8 animate-spin text-primary" />
        <p class="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  </Transition>
</template>
