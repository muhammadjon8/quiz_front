<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const items = ref([]);
const subCategName = ref("");
const noData = ref(false);
const subCategId = ref("");
const selectedAnswers = ref({}); // Track selected answers
const result = ref(""); // Store result of quiz checking

// Fetch data function
const fetchItems = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/quiz/subcategory/${id}`
    );
    items.value = response.data; // Ensure response.data is an array of items
  } catch (error) {
    noData.value = true;
    console.error("Error fetching data:", error);
  }
};

// Fetch subcategory name
const getSubcateg = async (id) => {
  try {
    const subName = await axios.get(
      `http://localhost:3000/api/sub-category/${id}`
    );
    subCategId.value = id;
    subCategName.value = subName.data.name;
  } catch (error) {
    console.error("Error fetching subcategory name:", error);
  }
};

// Handle fetching data after component mounts
onMounted(() => {
  const id = route.params.id; // Get ID from route params
  if (id) {
    getSubcateg(id);
    fetchItems(id);
  } else {
    noData.value = true;
    console.error("No ID provided in route params");
  }
});

const goBack = () => {
  router.go(-1);
};

// Check answers function
const checkAnswers = () => {
  let score = 0;
  const allAnswered = items.value.every((item) => selectedAnswers.value[item.id]);

  if (!allAnswered) {
    result.value = "All questions must be answered.";
    return;
  }

  items.value.forEach((item) => {
    if (selectedAnswers.value[item.id] === item.correct_answer) {
      score++;
    }
  });
  result.value = `You scored ${score} out of ${items.value.length}`;
};
</script>

<template>
  <div class="flex justify-between py-2">
    <h1 class="text-3xl py-3">{{ subCategName }}</h1>
  </div>

  <div
    v-for="item in items"
    :key="item.id"
    class="border shadow-lg p-5 mb-5 rounded-xl"
  >
    <div class="mb-4">
      <p class="text-lg font-bold">{{ item.question }}</p>
    </div>
    <div class="flex flex-col gap-2">
      <label class="flex items-center cursor-pointer">
        <input
          type="radio"
          :name="'quiz-' + item.id"
          :value="item.option1"
          v-model="selectedAnswers[item.id]"
          class="mr-2"
        />
        {{ item.option1 }}
      </label>
      <label class="flex items-center cursor-pointer">
        <input
          type="radio"
          :name="'quiz-' + item.id"
          :value="item.option2"
          v-model="selectedAnswers[item.id]"
          class="mr-2"
        />
        {{ item.option2 }}
      </label>
      <label class="flex items-center cursor-pointer">
        <input
          type="radio"
          :name="'quiz-' + item.id"
          :value="item.option3"
          v-model="selectedAnswers[item.id]"
          class="mr-2"
        />
        {{ item.option3 }}
      </label>
      <label class="flex items-center cursor-pointer">
        <input
          type="radio"
          :name="'quiz-' + item.id"
          :value="item.correct_answer"
          v-model="selectedAnswers[item.id]"
          class="mr-2"
        />
        {{ item.correct_answer }}
      </label>
    </div>
  </div>

  <div class="flex justify-center mt-4">
    <button
      @click="checkAnswers"
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Check Answers
    </button>
  </div>

  <div v-if="result" class="text-center mt-4 text-xl">
    {{ result }}
  </div>

  <button @click="goBack" class="py-3 px-5 bg-blue-400 rounded-lg hover:bg-blue-500 text-white">Back</button>
</template>

<style scoped>
/* Add specific styling here if needed */
</style>
