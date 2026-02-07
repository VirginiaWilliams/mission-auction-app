<template>
  <div class="toolbar">
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
</template>

<script setup>
import Papa from "papaparse";
import { useStore } from "vuex";

const store = useStore();

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

          data.type = results.data[i].type;
          data.name = results.data[i].description;
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
          data.name = results.data[i].bidderName;

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

.add-package {
  background-color: cornflowerblue;
  margin-left: 1rem;
  height: 1rem;
}

.add-bidder {
  background-color: slateblue;
  margin-left: 1rem;
  height: 1rem;
}
</style>
