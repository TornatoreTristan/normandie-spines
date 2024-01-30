<template>
  <ul class="list__image">
    <LineCategorieTitle title="Seconde Guerre Mondiale" />
    <LineCategorieTitle title="Activités à faire en Normandie" />
    <LineCategorieTitle title="Découverte insolite en Normandie" />
    <LineCategorieTitle title="L'Histoire de la Normandie" />
    <LineCategorieTitle title="Venir vivre en Normandie" />
    <LineCategorieTitle title="Randonnées Normandes" />
  </ul>
</template>

<script setup>
import LineCategorieTitle from "./LineCategorieTitle.vue";
import { onMounted } from "vue";

onMounted(() => {
  let pos = document.documentElement;
  console.log(pos);
  pos.addEventListener("mousemove", (e) => {
    pos.style.setProperty("--x", e.clientX + "px");
    pos.style.setProperty("--y", e.clientY + "px");
  });
});
</script>

<style>
.list__image {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.list__image li {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  position: relative;
}
.list__image li a {
  text-decoration: none;
  font-size: 2rem;
  color: #000;
}
.list__image:hover li a {
  opacity: 0.1;
}
.list__image li:hover a {
  opacity: 1;
}
.list__image li a .image-hover {
  position: absolute;
  transform: translate(-50%, -50%) scale(0);
  opacity: 1;
  transition: 0.2s;
  z-index: -2;
  left: calc(var(--x) / 2);
  top: calc(-100% + ((var(--y) * 0.1)));
}
.list__image li:hover .image-hover {
  transform: translate(-50%, -50%) scale(1);
  opacity: 1;
}
</style>
