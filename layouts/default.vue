<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow">
      <div class="container mx-auto px-4 py-3">
        <NuxtLink to="/" class="text-xl font-bold">Product Management</NuxtLink>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>
