<template>
  <div>
    <ul>
      <li v-for="subitem in props.subitems" :key="subitem.id">
        <a :href="subitem.uri">{{ subitem.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  subitems: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: #000;
}
</style>
