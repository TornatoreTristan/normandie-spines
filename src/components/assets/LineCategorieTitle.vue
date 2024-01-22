<template>
  <div class="line-category">
    <h3>
      {{ title }}
    </h3>
    <img src="/right-arrow.svg" width="20" alt="" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.line-category {
  padding: 0.5rem 1rem;
  border-top: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  gap: 10px;
}
h3 {
  font-weight: 100;
}
img {
  transform: rotate(-45deg);
}
</style>
