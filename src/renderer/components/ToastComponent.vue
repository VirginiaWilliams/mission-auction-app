<template>
  <div class="toast-container" :class="color">
    <img src="../assets/check.png" class="check-icon" />
    {{ message }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({ message: String, color: String });
</script>

<style>
.toast-container {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 3rem;
  padding: 1rem;
  height: 1rem;
  z-index: 900;
  display: flex;
  background-color: cornflowerblue;
  color: white;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
}

.success {
  background-color: mediumseagreen;
}

.error {
  background-color: #a04545;
}

.check-icon {
  height: 1rem;
  width: 1rem;
  margin-right: 1rem;
}
</style>
