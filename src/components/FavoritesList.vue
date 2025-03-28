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
        class="p-4 bg-white rounded-xl shadow-lg border border-gray-300 h-full flex flex-col justify-between"
      >
        <p class="font-semibold text-lg">{{ joke.setup }}</p>
        <p
          class="text-gray-600 mt-2 transition duration-300"
          :class="{
            'blur-sm cursor-pointer': !revealedPunchlines.has(joke.id),
          }"
          @mouseenter="reveal(joke.id)"
        >
          {{ joke.punchline }}
        </p>
        <div class="flex justify-center mt-2">
          <span
            v-for="r in 5"
            :key="r"
            class="cursor-pointer text-2xl transition"
            :class="[
              (hoveredRating[joke.id] ?? joke.rating) >= r
                ? 'text-yellow-400'
                : 'text-gray-600',
            ]"
            @mouseover="setHover(joke.id, r)"
            @mouseleave="clearHover(joke.id)"
            @click="rateJoke(joke.id, r)"
            >★</span
          >
        </div>
        <div class="flex justify-center mt-4">
          <button
            @click="removeFromFavorites(joke)"
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useJokes } from "../composables/useJokes";

const { favorites, removeFromFavorites, rateJoke } = useJokes();

const revealedPunchlines = ref(new Set());
const hoveredRating = ref({});

const reveal = (id) => {
  revealedPunchlines.value.add(id);
};

const setHover = (id, value) => {
  hoveredRating.value[id] = value;
};

const clearHover = (id) => {
  hoveredRating.value[id] = null;
};
</script>
