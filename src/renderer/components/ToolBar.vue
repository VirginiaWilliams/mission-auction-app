<template>
  <div class="toolbar">
    <label for="file-input" class="button add-csv"> Upload Package CSV </label>
    <input id="file-input" type="file" hidden @change="handleFileSelect" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const files = ref([]);

function handleFileSelect(e) {
  const input = e.target;
  const filesAsArray = Array.from(input?.files || []);
  files.value = files.value.concat(filesAsArray);

  console.log("----------------------");
}
</script>

<style>
.toolbar {
  width: 100%;
  height: 3rem;
  background-color: darkgray;
  display: flex;
  justify-content: left;
  align-items: center;
}

.add-csv {
  background-color: cornflowerblue;
  margin-left: 1rem;
  height: 1rem;
}
</style>
