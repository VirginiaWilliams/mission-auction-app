<template>
  <addTest :video="selectedVideo" @close="openAdd = false" v-if="openAdd" />
  <main>
    <header>
      <h1>Tester</h1>
      <span @click="openAdd = true" class="material-icons">+</span>
    </header>
    <article class="cards-container">
      <div class="empty" v-if="tests.length === 0">
        <h1>The list is empty</h1>
      </div>
      <template v-else v-for="(test, index) in tests" :key="index">
        <testCard :test="test" />
      </template>
    </article>
  </main>
</template>

<script setup>
import testCard from "./components/testCard.vue";
import addTest from "./components/add-test.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();

store.dispatch("getTests");

const tests = computed(() => {
  return store.getters.tests;
});

const openAdd = ref(false);
</script>

<style>
main {
  background: lightgray;
  max-width: 950px;
  margin: 0 auto;
  padding: 50px 0;
  font-family: Arial, sans-serif;
}
header {
  margin: 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
}
span {
  margin-left: 20px;
  padding: 5px;
  background: red;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.cards-container {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 1rem;
  row-gap: 2rem;
  padding: 1rem;
}
.empty {
  background: #fdd0d0;
  grid-column: 1 / -1;
  h1 {
    color: #a04545;
  }
}
.material-icons {
  background-color: indianred;
  border-radius: 5px;
}
</style>
