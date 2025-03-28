<template>
  <div class="mt-10 px-4 w-full">
    <h2 class="text-2xl font-bold mb-6 text-center">Favorites</h2>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search jokes..."
      class="mb-6 w-full p-2 border border-gray-300 rounded"
    />

    <div
      v-if="filteredFavorites.length === 0"
      class="text-gray-500 text-center"
    >
      No favorites found.
    </div>

    <div v-else class="flex flex-wrap justify-center gap-6">
      <div
        v-for="joke in filteredFavorites"
        :key="joke.id"
        class="w-full sm:w-72 p-4 bg-white rounded-xl shadow-lg border border-gray-300 flex flex-col justify-between"
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
                : 'text-gray-300',
            ]"
            @mouseover="setHover(joke.id, r)"
            @mouseleave="clearHover(joke.id)"
            @click="rateJoke(joke.id, r)"
          >
            ★
          </span>
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
import { ref, computed } from "vue";
import { useJokes } from "../composables/useJokes";

const { favorites, removeFromFavorites, rateJoke } = useJokes();

const revealedPunchlines = ref(new Set());
const hoveredRating = ref({});
const searchTerm = ref("");

const reveal = (id) => {
  revealedPunchlines.value.add(id);
};

const setHover = (id, value) => {
  hoveredRating.value[id] = value;
};

const clearHover = (id) => {
  hoveredRating.value[id] = null;
};

const filteredFavorites = computed(() => {
  return favorites.value.filter(
    (joke) => joke.setup.toLowerCase().includes(searchTerm.value.toLowerCase())
    // ||
    // joke.punchline.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>
