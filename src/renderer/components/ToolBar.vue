<template>
  <div class="toolbar">
    <SingleInvoiceModal
      @close-generate-modal="openSingleGenerateModal = false"
      v-if="openSingleGenerateModal"
    />
    <div class="left-side">
      <div class="package-button">
        <label for="package-input" class="button add-package">
          Upload Package CSV
        </label>
        <input
          id="package-input"
          type="file"
          hidden
          @change="handlePackageUpload"
        />
      </div>
      <div class="bidder-button">
        <label for="bidder-input" class="button add-bidder">
          Upload Bidder CSV
        </label>
        <input
          id="bidder-input"
          type="file"
          hidden
          @change="handleBidderUpload"
        />
      </div>
    </div>
    <div class="right-side">
      <div
        class="button generate-single-button"
        @click="openSingleGenerateModal = true"
      >
        Generate Single Invoice
      </div>
      <div
        class="button generate-all-button"
        @click="openSingleGenerateModal = true"
      >
        Generate All Invoices
      </div>
    </div>
  </div>
</template>

<script setup>
import Papa from "papaparse";
import { useStore } from "vuex";
import { ref } from "vue";
import SingleInvoiceModal from "./modals/SingleInvoiceModal";

const store = useStore();

const openSingleGenerateModal = ref(false);

function handlePackageUpload(e) {
  const file = e.target.files[0];

  if (file) {
    Papa.parse(file, {
      delimiter: ",",
      header: true,
      comments: false,
      complete: function (results) {
        for (let i = 0; i < results.data.length - 1; i++) {
          let data = {};

          data.num = results.data[i].packagenum;
          data.type = results.data[i].type;
          data.description = results.data[i].description;
          data.value = results.data[i].value;

          store.dispatch("createAucItem", data);
        }
      },
    });
  }
}

function handleBidderUpload(e) {
  const file = e.target.files[0];

  if (file) {
    Papa.parse(file, {
      delimiter: ",",
      header: true,
      comments: false,
      complete: function (results) {
        for (let i = 0; i < results.data.length - 1; i++) {
          let data = {};

          data.num = results.data[i].bidderNum;
          data.description = results.data[i].bidderName;

          store.dispatch("createBidder", data);
        }
      },
    });
  }
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

.left-side {
  display: flex;
}

.right-side {
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
}

.add-package {
  background-color: cornflowerblue;
  margin-left: 1rem;
  height: 1rem;
}

.add-bidder {
  background-color: rgb(44, 65, 105);
  margin-left: 1rem;
  height: 1rem;
}

.generate-single-button {
  background-color: mediumseagreen;
  height: 1rem;
  margin-right: 1rem;
}

.generate-all-button {
  background-color: rgb(29, 88, 56);
  height: 1rem;
}
</style>
