import { ref } from "vue";

const joke = ref(null);
const loading = ref(false);
const error = ref(null);
const jokeType = ref("random");
const favorites = ref([]);

const stored = localStorage.getItem("favorites");
if (stored) {
  try {
    favorites.value = JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse favorites from localStorage");
  }
}

export function useJokes() {
  const fetchJoke = async () => {
    loading.value = true;
    error.value = null;

    const baseURL = "https://official-joke-api.appspot.com/jokes";
    const endpoint =
      jokeType.value === "programming"
        ? `${baseURL}/programming/random`
        : `${baseURL}/random`;

    try {
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch joke");
      const data = await res.json();
      joke.value = jokeType.value === "programming" ? data[0] : data;
    } catch (err) {
      error.value = err.message;
      joke.value = null;
    } finally {
      loading.value = false;
    }
  };

  const toggleJokeType = () => {
    jokeType.value = jokeType.value === "random" ? "programming" : "random";
  };

  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const addToFavorites = (j) => {
    if (!isFavorite(j)) {
      favorites.value = [...favorites.value, j];
      saveFavorites();
    }
  };

  const removeFromFavorites = (j) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== j.id);
    saveFavorites();
  };

  const isFavorite = (j) => {
    return favorites.value.some((fav) => fav.id === j.id);
  };

  const rateJoke = (id, rating) => {
    const joke = favorites.value.find((j) => j.id === id);
    if (joke) {
      joke.rating = rating;
      saveFavorites();
    }
  };

  return {
    joke,
    loading,
    error,
    jokeType,
    fetchJoke,
    toggleJokeType,
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    rateJoke,
  };
}
