<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Generate All Invoices</div>
        <div class="modal-content">
          <button
            @click="cancel"
            type="button"
            class="button secondary cancel-button-right"
          >
            Cancel
          </button>
          <button @click="generatePDF" type="button" class="button primary">
            Generate
          </button>
        </div>
        <div class="multi-logo-preview-container">
          Current Logo:
          <img
            src=""
            id="multi-logo-preview"
            class="multi-logo-preview"
            alt="Mission Auction Logo"
          />
        </div>
      </div>
    </div>
  </div>
  <div class="print-content">
    <div v-for="(bidder, index) in packageMap.values()" :key="index">
      <div class="pdf-content">
        <div class="header-container">
          <div class="header-col1">
            Missions Auction<br />
            Christ The Vine Lutheran Church<br />
            18677 SE Highway 212<br />
            Damascus OR 97089<br />
            503-658-5650<br />
            Fed ID# 93-0719295<br />
          </div>
          <div class="header-col2">
            <img
              src="../../assets/logo.png"
              id="pdf-image"
              class="pdf-image"
              alt="Mission Auction Logo"
            />
          </div>
        </div>
        <div class="dynamic-content">
          <div class="bidder-info">
            <div class="bidder-name">
              <div class="bidder-name-col1">Name:</div>
              <div class="bidder-name-col2">{{ bidder[0].bidderName }}</div>
            </div>
            <div>Bidder #: {{ bidder[0].bidderNum }}</div>
          </div>
          <div class="bidder-winnings">
            <div
              v-for="(item, index) in bidder"
              :key="index"
              class="winning-item"
            >
              <div class="item-col1">{{ item.description }}</div>
              <div class="item-col2">$ {{ item.winningAmount }}</div>
            </div>
            <div class="winning-item">
              <div class="item-col1 pdf-total">Total:</div>
              <div class="item-col2 pdf-total">
                ${{ totalsMap.get(bidder[0].bidderName) }}
              </div>
            </div>
            <div class="bottom-section">
              <div class="paid-by-section">
                <div class="paid-by-col1">Paid By (Circle One):</div>
                <div class="paid-by-col2">Cash</div>
                <div class="paid-by-col3">Check</div>
                <div class="paid-by-col4">Credit Card</div>
              </div>
              <div class="divider-line"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="page-break"></div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, useStore } from "vuex";
import { computed, onMounted } from "vue";

const store = useStore();

const emit = defineEmits(["close-generate-multi-modal"]);

const packageMap = computed(() => {
  return store.getters.bidderPackageMap;
});

const totalsMap = computed(() => {
  return store.getters.bidderTotalsMap;
});

async function generatePDF() {
  window.print();
  emit("close-generate-multi-modal");
}

function cancel() {
  emit("close-generate-multi-modal");
}

onMounted(async () => {
  await store.dispatch("getLogo");
  const logo = store.getters.logo;
  if (logo) {
    const imageElement = document.getElementById("pdf-image");
    console.log(imageElement);
    imageElement.src = logo;

    const imagePreview = document.getElementById("multi-logo-preview");
    imagePreview.src = logo;
  }
});
</script>

<style>
.form-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  backdrop-filter: blur(5px);
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
}

.form-modal {
  display: flex;
  flex-direction: column;
  background: white;
  padding: 25px;
  border-radius: 5px;
  border: solid 1px gray;
  box-shadow: 20px 0 40px rgba(black, 0.1);
  width: 30rem;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;
}

.modal-content {
  display: flex;
  flex-direction: row;
}

.bidder-id-label {
  margin-right: 1rem;
}

.modal-text {
  text-align: left;
}

.invoice-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.primary {
  background-color: cornflowerblue;
  margin-right: 1rem;
  margin-left: 1rem;
}

.secondary {
  background-color: rgb(82, 82, 82);
}

.cancel-button-right {
  margin-right: 0;
  margin-left: auto;
}

.print-content,
.print-content * {
  display: none;
}

.multi-logo-preview-container {
  display: flex;
  flex-direction: column;
  border-top: solid 1px rgb(186, 186, 186);
  margin-top: 1rem;
  padding-top: 1rem;
}

.multi-logo-preview {
  margin-top: 1rem;
  width: 8rem;
}

@media print {
  body {
    visibility: hidden;
  }

  .print-content,
  .print-content * {
    visibility: visible;
    width: 100%;
    height: 100%;
    display: block;
  }

  .pdf-content {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;
    gap: 4px;
  }

  .pdf-content-header {
    font-size: 20px;
    font-weight: bold;
    position: relative;
    width: 100%;
  }

  .dynamic-content {
    margin-top: 10rem;
  }

  .winning-item {
    margin-top: -24px; /* just trying to fight the block spacing */
  }

  .bidder-info,
  .bidder-winnings {
    position: relative;
    page-break-inside: avoid;
    display: block;
  }

  .bidder-info {
    margin-bottom: 1rem;
  }

  .bottom-section {
    margin-top: 2rem;
  }

  .page-break {
    break-after: page;
  }
}
</style>
