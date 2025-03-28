<template>
  <div class="mt-10 px-4 w-full">
    <h2 class="text-2xl font-bold mb-6 text-center">Favorites</h2>
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search jokes..."
      class="mb-6 w-full p-2 border border-gray-300 rounded"
    />
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <div class="w-full md:w-1/2">
        <select
          v-model="minRating"
          class="w-full p-2 border border-gray-300 rounded"
        >
          <option value="0">All Ratings</option>
          <option v-for="r in 5" :key="r" :value="r">
            Rated {{ r }} ⭐ & up
          </option>
        </select>
      </div>
      <div class="w-full md:w-1/2">
        <select
          v-model="sortBy"
          class="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Unsorted</option>
          <option value="alpha">Alphabetically</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>

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
              (hoveredRating[joke.id] ?? joke.rating ?? 0) >= r
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
    <div class="mt-8 text-center" v-if="filteredFavorites.length">
      <p class="text-lg font-semibold">
        Total: {{ filteredFavorites.length }} jokes
      </p>
      <p class="text-lg font-semibold" v-if="averageRating !== null">
        Average rating: {{ averageRating.toFixed(1) }} ⭐
      </p>
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
const minRating = ref(0);

const reveal = (id) => {
  revealedPunchlines.value.add(id);
};

const setHover = (id, value) => {
  hoveredRating.value[id] = value;
};

const clearHover = (id) => {
  hoveredRating.value[id] = null;
};

const sortBy = ref("");

const filteredFavorites = computed(() => {
  return favorites.value
    .filter((joke) => {
      return (
        joke.setup.toLowerCase().includes(searchTerm.value.toLowerCase()) &&
        (minRating.value === 0 || joke.rating >= minRating.value)
      );
    })
    .sort((a, b) => {
      if (sortBy.value === "alpha") {
        return a.setup.localeCompare(b.setup);
      } else if (sortBy.value === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
});

const averageRating = computed(() => {
  const rated = filteredFavorites.value.filter((j) => j.rating !== null);
  if (rated.length === 0) return null;
  const sum = rated.reduce((acc, j) => acc + j.rating, 0);
  return sum / rated.length;
});
</script>
