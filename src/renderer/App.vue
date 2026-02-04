<template>
  <AddAucItem @close="openAdd = false" v-if="openAdd" />
  <main>
    <header>
      <h1>Add/Delete Data</h1>
      <span @click="openAdd = true" class="material-icons">+</span>
    </header>
    <div class="empty" v-if="aucItems.length === 0">
      <h2>
        The list is empty! Please Upload package data or manually add packages
      </h2>
    </div>
    <div v-else class="table-container">
      <table>
        <tr class="table-headers">
          <th>ID</th>
          <th>Name</th>
        </tr>
        <tr v-for="(i, index) in aucItems" :key="index">
          <td>{{ i.id ? i.id : 0 }}</td>
          <td>{{ i.name }}</td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script setup>
import AddAucItem from "./components/AddAucItem";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();

store.dispatch("getAucItems");

const aucItems = computed(() => {
  return store.getters.aucItems;
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
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
}

h2 {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #a04545;
}

.empty {
  margin-left: 2rem;
  margin-right: 2rem;
  border: 1px solid black;
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

.material-icons {
  background-color: indianred;
  border-radius: 5px;
}

.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

table,
th,
td {
  background: white;
  border: 1px solid black;
  border-collapse: collapse;
  width: 30rem;
  text-align: left;
  padding-left: 1rem;
}
</style>
