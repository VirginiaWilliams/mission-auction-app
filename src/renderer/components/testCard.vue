<template>
  <div class="card">
    <div class="card-content">
      <label class="name">{{ test.name }}</label>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps } from "vue";

const props = defineProps({
  test: Object,
});

onMounted(() => {
  console.log("props: ", props.test);
});
</script>

<style>
.card {
  max-width: 220px;
  min-width: 220px;
  height: 100%;
  text-align: left;
}
.card-content {
  height: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(black, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;

  .title {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 600;
    color: darken(grey, 10);
    overflow-wrap: break-word;
  }
  .author {
    display: block;
    font-weight: 500;
    color: grey;
  }
  .controllers {
    margin-top: auto;
    display: flex;
    column-gap: 10px;
  }
}
</style>
