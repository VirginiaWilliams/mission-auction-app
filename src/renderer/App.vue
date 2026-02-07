<template>
  <AddAucModal @close="openAdd = false" v-if="openAdd" />
  <main>
    <ToolBar />
    <header>
      <h1>Add/Delete Data</h1>
      <span @click="openAdd = true" class="button add-icon">+</span>
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
          <th>Type</th>
          <th>Description</th>
          <th>Value</th>
          <th>Winning Amnt</th>
          <th>Bidder Name</th>
          <th>Bidder Num</th>
          <th>Actions</th>
        </tr>
        <tr v-for="(i, index) in aucItems" :key="index">
          <td>{{ i.id ? i.id : "" }}</td>
          <td>{{ i.type }}</td>
          <td>{{ i.name }}</td>
          <td>{{ i.value }}</td>
          <td>{{ i.winningAmount }}</td>
          <td>{{ i.bidderName }}</td>
          <td>{{ i.bidderNum }}</td>
          <td>
            <div class="action-container">
              <img
                src="./assets/trash.png"
                @click="openAdd = true"
                class="button delete"
              />
              <img
                src="./assets/pencil.png"
                @click="openAdd = true"
                class="button edit"
              />
            </div>
          </td>
        </tr>
      </table>
    </div>
  </main>
</template>

<script setup>
import AddAucModal from "./components/AddAucModal";
import ToolBar from "./components/ToolBar";
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

.add-icon {
  background-color: cornflowerblue;
  margin-left: 1rem;
}

.delete {
  width: 1rem;
  background-color: lightcoral;
  margin-right: 4px;
  height: 14px;
}

.edit {
  width: 1rem;
  background-color: cornflowerblue;
  height: 14px;
}

.action-container {
  display: flex;
  flex-direction: row;
}

.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

table {
  background: white;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: left;
  margin-left: 1rem;
  margin-right: 1rem;
}

th,
td {
  background: white;
  border: 1px solid black;
  border-collapse: collapse;
  width: 30rem;
  text-align: left;
  padding-left: 1rem;
}

/* ********** Global Stuff ********** */

.button {
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  display: flex;
  color: white;
  border-radius: 5px;
  border: none;
}
</style>
