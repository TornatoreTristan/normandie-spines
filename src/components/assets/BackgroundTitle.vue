<template>
  <div class="title-container">
    <h3>{{ title }}</h3>
    <p class="date">{{ dateFr }}</p>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});
// Create function to display date in a french format
const date = new Date(props.date);
const options = { year: "numeric", month: "long", day: "numeric" };
const dateFr = date.toLocaleDateString("fr-FR", options);
</script>

<style>
.title-container {
  display: block;
  background-color: #fff;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
}
h3 {
  margin: 1rem 0;
}
.date {
  font-size: 0.8rem;
  color: #a0aec0;
  margin: 0;
}
</style>
