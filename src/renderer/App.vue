<template>
  <body>
    <AddAucModal
      @close-auc-modal="openAddAucModal = false"
      v-if="openAddAucModal"
    />
    <AddBidderModal
      @close-bidder-modal="openAddBidderModal = false"
      v-if="openAddBidderModal"
    />
    <AddLinkModal
      @close-link-modal="openAddLinkModal = false"
      v-if="openAddLinkModal"
    />
    <ConfirmationModal
      @close-conf-modal="openConfirmationModal = false"
      @submit-conf-modal="deleteAucItem"
      v-if="openConfirmationModal"
    />
    <DeleteAllModal
      @close-delete-all-modal="openDeleteAllModal = false"
      @submit-delete-all-modal="deleteAllItems"
      v-if="openDeleteAllModal"
    />
    <ToolBar />
    <div class="page-content">
      <header>
        <h1>Manage Package Data</h1>
        <div class="table-actions">
          <span @click="openAddAucModal = true" class="button add"
            >Add Package</span
          >
          <span @click="openAddBidderModal = true" class="button add"
            >Add Bidder</span
          >
          <span @click="openAddLinkModal = true" class="button add add-link"
            >Create Link</span
          >
        </div>
      </header>
      <div class="empty" v-if="aucItems.length === 0">
        <h2>
          The list is empty! Please upload package data or manually add entries
        </h2>
      </div>
      <div v-else class="table-container">
        <table>
          <tr class="table-headers">
            <th>Package #</th>
            <th>Type</th>
            <th>Description</th>
            <th>Value</th>
            <th>Bidder #</th>
            <th>Bidder Name</th>
            <th>Winning Amnt</th>
            <th></th>
          </tr>
          <tr v-for="(i, index) in aucItems" :key="index">
            <td>{{ i.num ? i.num : "" }}</td>
            <td>{{ i.type }}</td>
            <td>{{ i.description }}</td>
            <td>{{ i.value }}</td>
            <td>{{ i.bidderNum == 0 ? "" : i.bidderNum }}</td>
            <td>{{ i.bidderName }}</td>
            <td>{{ i.winningAmount == 0 ? "" : i.winningAmount }}</td>
            <td>
              <div class="action-container">
                <!-- <img src="./assets/pencil.png" class="button edit" /> -->
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
      <span
        v-if="aucItems.length !== 0"
        @click="openDeleteAllModal = true"
        class="button delete-all"
        >CLEAR TABLE</span
      >
    </div>
    <SourceLink class="source-code" />
  </body>
</template>

<script setup>
import AddAucModal from "./components/modals/AddAucModal";
import AddBidderModal from "./components/modals/AddBidderModal";
import AddLinkModal from "./components/modals/AddLinkModal";
import ConfirmationModal from "./components/modals/ConfirmationModal";
import DeleteAllModal from "./components/modals/DeleteAllModal";
import ToolBar from "./components/ToolBar";
import SourceLink from "./components/SourceLink";
import { useStore } from "vuex";
import { computed, ref } from "vue";

const store = useStore();

store.dispatch("getAucItems");
store.dispatch("getBidders");

const aucItems = computed(() => {
  return store.getters.aucItems;
});

const bidders = computed(() => {
  return store.getters.bidders;
});

const openAddAucModal = ref(false);
const openAddBidderModal = ref(false);
const openAddLinkModal = ref(false);
const openConfirmationModal = ref(false);
const openDeleteAllModal = ref(false);

const idToDelete = ref();

function deleteAucItem() {
  store.dispatch("deleteAucItem", idToDelete.value);
  openConfirmationModal.value = false;
}

function handleDelete(id) {
  idToDelete.value = id;
  openConfirmationModal.value = true;
}

function deleteAllItems() {
  aucItems.value.forEach((item) => {
    store.dispatch("deleteAucItem", item.id);
  });
  bidders.value.forEach((bidder) => {
    store.dispatch("deleteBidder", bidder.id);
  });

  store.dispatch("getAucItems");
  store.dispatch("getBidders");
  store.dispatch("resetMaps");

  openDeleteAllModal.value = false;
}
</script>

<style>
body {
  background: lightgray;
  margin: 0 auto;
  font-family: Arial, sans-serif;
  height: 100vh;
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

.table-actions {
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
}

.add {
  width: 6rem;
  background-color: cornflowerblue;
  margin-left: 1rem;
}

.delete {
  width: 1rem;
  background-color: #a04545;
  height: 14px;
}

.delete-all {
  width: 10rem;
  background-color: #a04545;
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
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
  width: 100%;
}

th,
td {
  background: white;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: left;
  padding-left: 1rem;
  padding-right: 1rem;
}

.source-code {
  bottom: 0;
  right: 0;
  position: fixed;
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

.add-link {
  background-color: rgb(44, 65, 105);
}

/* ********** I dont't know why, but the pdf style needs to be here ********** */

.print-content {
  margin: 1rem;
  padding: 1rem;
  box-sizing: border-box;
}

.header-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  width: 100%;
}

.header-col1 {
  grid-column: 1;
  font-size: 34px;
  font-weight: bold;
  width: 44rem; /* adjust to move image horizontal */
}

.header-col2 {
  grid-column: 2;
  width: 20rem;
}

.dynamic-content {
  font-size: 24px;
  font-weight: bold;
  margin-top: 20rem;
}

.bidder-info {
  margin-bottom: 1rem;
}

.bidder-name {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  width: 100%;
  margin-bottom: 1rem;
}

.bidder-name-col1 {
  grid-column: 1;
  font-size: 24px;
  width: 10rem;
}

.bidder-name-col2 {
  grid-column: 2;
  font-size: 34px;
  width: 50rem;
}

.bidder-winnings {
  margin-top: 6rem;
}

.winning-item {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  width: 100%;
}

.item-col1 {
  grid-column: 1;
  width: 50rem;
}

.item-col2 {
  grid-column: 2;
  width: 20rem;
}

.bottom-section {
  margin-top: 9rem;
  display: block;
}

.pdf-total {
  margin-top: 5rem;
}

.paid-by-section {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 10px;
  width: 100%;
}

.paid-by-col1 {
  grid-column: 1;
}

.paid-by-col2 {
  grid-column: 2;
}

.paid-by-col3 {
  grid-column: 3;
}

.paid-by-col4 {
  grid-column: 4;
}

.divider-line {
  border-top: 1px solid black;
  width: 100%;
  margin-top: 2rem;
}
</style>
