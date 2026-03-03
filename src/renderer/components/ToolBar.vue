<template>
  <div class="toolbar">
    <SingleInvoiceModal
      @close-generate-modal="openSingleGenerateModal = false"
      v-if="openSingleGenerateModal"
    />
    <MultiInvoiceModal
      @close-generate-multi-modal="openMultiGenerateModal = false"
      v-if="openMultiGenerateModal"
    />
    <div class="left-side">
      <div class="toolbar-text">Upload:</div>
      <div class="package-button">
        <label for="package-input" class="button add-package">
          Package CSV
        </label>
        <input
          id="package-input"
          type="file"
          hidden
          @change="handlePackageUpload"
        />
      </div>
      <div class="bidder-button">
        <label for="bidder-input" class="button add-bidder"> Bidder CSV </label>
        <input
          id="bidder-input"
          type="file"
          hidden
          @change="handleBidderUpload"
        />
      </div>
      <div class="logo-button">
        <label for="logo-input" class="button add-logo"> Logo </label>
        <input id="logo-input" type="file" hidden @change="handleLogoUpload" />
      </div>
    </div>
    <div class="right-side">
      <div class="toolbar-text">Generate:</div>
      <div
        class="button generate-single-button"
        @click="openSingleGenerateModal = true"
      >
        Single Invoice
      </div>
      <div class="button generate-all-button" @click="openMultiModal">
        All Invoices
      </div>
      <div class="button generate-report" @click="generateReport">
        Final Report
      </div>
    </div>
    <!-- <img id="myImage" src="" alt="Dynamically loaded image" /> -->
  </div>
</template>

<script setup>
import Papa from "papaparse";
import { useStore } from "vuex";
import { ref } from "vue";
import SingleInvoiceModal from "./modals/SingleInvoiceModal";
import MultiInvoiceModal from "./modals/MultiInvoiceModal";

const store = useStore();

const openSingleGenerateModal = ref(false);
const openMultiGenerateModal = ref(false);

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

          data.num = results.data[i].itemNum;
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
          data.name = results.data[i].bidderName;

          store.dispatch("createBidder", data);
        }
      },
    });
  }
}

async function handleLogoUpload(e) {
  const file = e.target.files[0];
  if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
    try {
      const pngBlob = await convertJpgToPng(file);
      store.dispatch("addLogoTemp", pngBlob);
    } catch (error) {
      console.error("Conversion failed:", error);
    }
  } else {
    alert("Please select a JPEG or PNG file.");
  }
}

function convertJpgToPng(jpegFileBlob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the JPEG image onto the canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Get the image data as a PNG blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob); // The resulting PNG blob
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, "image/png");
    };
    img.onerror = (error) => reject(error);

    // Set the image source to the URL of the JPEG blob
    img.src = URL.createObjectURL(jpegFileBlob);
  });
}

function openMultiModal() {
  store.dispatch("setMaps");
  openMultiGenerateModal.value = true;
}

function generateReport() {
  store.dispatch("get-aucItems");
  downloadCSVFromJson("data.csv", store.getters.aucItems);
}

function downloadCSVFromJson(filename, arrayOfJson) {
  const header = Object.keys(arrayOfJson[0]);
  let csv = arrayOfJson.map((row) =>
    header.map((fieldName) => JSON.stringify(row[fieldName] || "")).join(",")
  );
  csv.unshift(header.join(","));
  csv = csv.join("\r\n");

  // Create link and download
  const link = document.createElement("a");
  link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  link.download = filename;
  link.click();
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
  justify-content: center;
  align-items: center;
  margin-left: 1rem;
}

.right-side {
  display: flex;
  margin-left: auto;
  margin-right: 1rem;
  justify-content: center;
  align-items: center;
}

.add-package {
  background-color: cornflowerblue;
  height: 1rem;
}

.add-bidder {
  background-color: rgb(44, 65, 105);
  height: 1rem;
}

.add-logo {
  background-color: rgb(93, 82, 112);
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
  margin-right: 1rem;
}

.generate-report {
  background-color: rgb(15, 42, 28);
  height: 1rem;
}

.toolbar-text {
  margin-right: 1rem;
}
</style>
