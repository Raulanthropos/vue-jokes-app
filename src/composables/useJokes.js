import { ref } from "vue";

export function useJokes() {
  const joke = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const jokeType = ref("random");

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

  return {
    joke,
    loading,
    error,
    jokeType,
    fetchJoke,
    toggleJokeType,
  };
}
