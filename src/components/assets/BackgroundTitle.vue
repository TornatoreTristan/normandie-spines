<template>
  <div>
    <span
      v-for="(line, index) in lines"
      :key="index"
      class="dynamic-background"
    >
      {{ line }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: String,
    maxWidth: {
      type: Number,
      default: 1000, // Remplacez par la largeur maximale de votre conteneur
    },
  },
  data() {
    return {
      lines: [],
    };
  },
  methods: {
    calculateLines() {
      const words = this.text.split(" ");
      let currentLine = "";

      words.forEach((word) => {
        const testLine = currentLine + word + " ";
        const lineWidth = this.getTextWidth(testLine);

        if (lineWidth > this.maxWidth && currentLine.length > 0) {
          this.lines.push(currentLine.trim());
          currentLine = word + " ";
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) {
        this.lines.push(currentLine.trim());
      }
    },
    getTextWidth(text) {
      // Cette fonction est une approximation; ajustez-la en fonction de votre style de police exact.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = "16px Arial"; // Remplacez par la police et la taille que vous utilisez
      return context.measureText(text).width;
    },
  },
  watch: {
    text: {
      immediate: true,
      handler() {
        this.calculateLines();
      },
    },
  },
};
</script>

<style>
.dynamic-background {
  display: block;
  background: white;
  padding: 0.5em 1em;
  margin-bottom: 0.5em;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
