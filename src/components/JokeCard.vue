<template>
  <div
    class="border p-4 rounded-xl shadow bg-white max-w-xl mx-auto text-center"
  >
    <p class="text-lg font-semibold mb-4">{{ joke.setup }}</p>

    <transition name="fade">
      <p v-if="showPunchline" class="text-gray-700 font-medium mt-2">
        {{ joke.punchline }}
      </p>
    </transition>

    <button
      @click="showPunchline = !showPunchline"
      class="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
    >
      {{ showPunchline ? "Hide Punchline" : "Reveal Punchline" }}
    </button>
    <button
      @click="toggleFavorite"
      class="mt-2 bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded"
    >
      {{ isFavorite(joke) ? "★ Remove from Favorites" : "☆ Add to Favorites" }}
    </button>
  </div>
</template>

<!-- <script setup>
  import { ref } from 'vue'
  defineProps({
    joke: {
      type: Object,
      required: true,
    },
  })
  
  const showPunchline = ref(false)
  </script> -->

<!-- <script setup>
import { ref, defineExpose } from "vue";

defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const showPunchline = ref(false);

const reset = () => {
  showPunchline.value = false;
};

defineExpose({
  reset,
});
</script> -->

<script setup>
import { ref } from "vue";
import { useJokes } from "../composables/useJokes";

const { joke } = defineProps({
  joke: {
    type: Object,
    required: true,
  },
});

const showPunchline = ref(false);

const { addToFavorites, removeFromFavorites, isFavorite } = useJokes();

const toggleFavorite = () => {
  if (isFavorite(joke)) {
    removeFromFavorites(joke);
  } else {
    addToFavorites(joke);
  }
};

const reset = () => {
  showPunchline.value = false;
};

defineExpose({ reset });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
