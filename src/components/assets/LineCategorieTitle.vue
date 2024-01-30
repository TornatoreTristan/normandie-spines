<template>
  <li class="menu__item">
    <a href="#" data-text="test"
      ><img class="image-hover" src="/img/1.jpg" width="200" alt="" />{{
        title
      }}</a
    >
    <img class="arrow" src="/right-arrow.svg" width="30" alt="fleche" />
  </li>
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
li a:hover {
  opacity: 1;
}
.menu__item {
  display: flex;
  justify-content: space-between;
}
.arrow {
  transform: rotate(-45deg);
}
</style>
