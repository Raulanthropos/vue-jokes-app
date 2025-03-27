<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="flex flex-col items-center space-y-4">
      <h1 class="text-3xl font-bold text-center">Joke Collection App</h1>

      <div class="flex space-x-4">
        <button
          @click="toggleJokeType"
          class="bg-black hover:bg-neutral-800 hover:text-yellow-400 text-white px-4 py-2 rounded transition-colors duration-600"
          >
          Type: {{ jokeType }}
        </button>

        <button
          @click="handleFetch"
          class="bg-white hover:bg-neutral-200 hover:text-yellow-600 text-black px-4 py-2 rounded transition-colors duration-600"
          >
          Get Joke
        </button>
      </div>

      <p v-if="loading" class="text-gray-600 animate-ping">Loading...</p>
      <p v-if="error" class="text-red-600">{{ error }}</p>

      <JokeCard v-if="joke" :joke="joke" ref="jokeCardRef" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useJokes } from "./composables/useJokes";
import JokeCard from "./components/JokeCard.vue";

const jokeCardRef = ref(null);

const { joke, loading, error, jokeType, fetchJoke, toggleJokeType } =
  useJokes();

const handleFetch = () => {
  if (jokeCardRef.value) jokeCardRef.value.reset();
  fetchJoke();
};
</script>
