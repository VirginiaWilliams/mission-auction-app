<template>
  <addTest :video="selectedVideo" @close="openAdd = false" v-if="openAdd" />
  <main>
    <header>
      <h1>Tester</h1>
      <span @click="openAdd = true" class="material-icons">add</span>
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

<script>
import "material-icons/iconfont/material-icons.css";
import testCard from "./components/testCard.vue";
import addTest from "./components/add-test.vue";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "App",
  components: {
    testCard,
    addTest,
  },
  setup() {
    const store = useStore();

    store.dispatch("getTests");

    const tests = computed(() => {
      console.log("tests from App: ", store.getters.tests);
      return store.getters.tests;
    });

    const openAdd = ref(false);

    return {
      tests,
      openAdd,
    };
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
}
.app {
  background: lightgray;
}
a {
  text-decoration: none;
  color: black;
}
main {
  max-width: 950px;
  margin: 0 auto;
  padding: 50px 0;
  header {
    margin: 50px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
      font-size: 2rem;
      font-weight: 900;
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
  }
  .cards-container {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    column-gap: 10px;
    row-gap: 20px;
  }
  .empty {
    background: #fdd0d0;
    grid-column: 1 / -1;
    h1 {
      color: #a04545;
    }
  }
}
</style>
