<template>
  <div class="mt-10 px-4 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-6 text-center">Favorites</h2>

    <div v-if="favorites.length === 0" class="text-gray-500 text-center">
      No favorites yet.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="joke in favorites"
        :key="joke.id"
        class="p-4 bg-white rounded-xl shadow-lg border border-gray-300"
      >
        <p class="font-semibold text-lg">{{ joke.setup }}</p>
        <p class="text-gray-600 mt-2">{{ joke.punchline }}</p>
        <button
          @click="removeFromFavorites(joke)"
          class="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useJokes } from "../composables/useJokes";

const { favorites, removeFromFavorites } = useJokes();
</script>
