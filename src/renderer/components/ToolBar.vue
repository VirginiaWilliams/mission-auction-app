<template>
  <div class="toolbar">
    <span @click="uploadCSV" class="button add-csv"> Upload Package CSV </span>
  </div>
</template>

<script setup>
function uploadCSV() {
  console.log("lol");
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
