<template>
  <body>
    <AddAucModal @close-add-modal="openAddModal = false" v-if="openAddModal" />
    <ConfirmationModal
      @close-conf-modal="openConfirmationModal = false"
      @submit-conf-modal="deleteAucItem"
      v-if="openConfirmationModal"
    />
    <ToolBar />
    <div class="page-content">
      <header>
        <h1>Manage Package Data</h1>
        <span @click="openAddModal = true" class="button add">Add Entry</span>
      </header>
      <div class="empty" v-if="aucItems.length === 0">
        <h2>
          The list is empty! Please upload package data or manually add entries
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
                <img src="./assets/pencil.png" class="button edit" />
                <img
                  src="./assets/trash.png"
                  @click="handleDelete(i.id)"
                  class="button delete"
                />
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</template>

<script setup>
import AddAucModal from "./components/modals/AddAucModal";
import ConfirmationModal from "./components/modals/ConfirmationModal";
import ToolBar from "./components/ToolBar";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();

store.dispatch("getAucItems");

const aucItems = computed(() => {
  return store.getters.aucItems;
});

const openAddModal = ref(false);
const openConfirmationModal = ref(false);

const idToDelete = ref();

function deleteAucItem() {
  store.dispatch("deleteAucItem", idToDelete.value);
  openConfirmationModal.value = false;
}

function handleDelete(id) {
  idToDelete.value = id;
  openConfirmationModal.value = true;
}
</script>

<style>
body {
  background: lightgray;
  margin: 0 auto;
  font-family: Arial, sans-serif;
}

.page-content {
  margin: 2rem;
}

.table-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  margin-top: 1rem;
}

h1 {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-left: 1rem;
}

h2 {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #a04545;
}

.empty {
  padding: 2rem;
}

.add {
  width: 6rem;
  background-color: cornflowerblue;
  margin-left: auto;
  margin-right: 1rem;
}

.delete {
  width: 1rem;
  background-color: #a04545;
  height: 14px;
}

.edit {
  width: 1rem;
  background-color: cornflowerblue;
  height: 14px;
  margin-right: 4px;
}

.action-container {
  display: flex;
  flex-direction: row;
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
  /* width: 30rem; */
  text-align: left;
  padding-left: 1rem;
  padding-right: 1rem;
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
