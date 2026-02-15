<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <label for="bidder-id" class="bidder-id-label"> Bidder ID </label>
        <input
          v-model="bidderName"
          type="list"
          list="bidder-options"
          name="bidder-id"
          required
          @input="setValues"
        />
        <datalist id="bidder-options"></datalist>
        <button @click="generatePDF" type="button" class="button primary">
          Generate
        </button>
        <button
          @click="cancel"
          type="button"
          class="button secondary cancel-button-right"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  <div class="print-content">
    <!-- <div v-for="(i, index) in aucItems" :key="index"> -->
    <div class="pdf-content">
      <div class="pdf-content-header">
        <div>Missions Auction</div>
        <div>Christ The Vine Lutheran Church</div>
        <div>18677 SE Highway 212</div>
        <div>Damascus OR 97089</div>
        <div>503-658-5650</div>
        <div>Fed ID# 93-0719295</div>
      </div>
      <p>Invoice for {{ bidderName }}, num: {{ bidderNum }}</p>
    </div>
    <div style="break-after: page"></div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { defineEmits, useStore } from "vuex";
import { computed, onMounted, ref } from "vue";

const store = useStore();

const emit = defineEmits(["close-generate-modal"]);

const bidderName = ref("");
const bidderNum = ref();

const bidders = computed(() => {
  return store.getters.bidders;
});

function setValues() {
  const chosenBidder = bidders.value.find((b) => b.name === bidderName.value);
  bidderNum.value = chosenBidder.num;
}

function generatePDF() {
  window.print();
}

function cancel() {
  emit("close-generate-modal");
}

onMounted(() => {
  const datalist = document.getElementById("bidder-options");

  store.getters.bidders.forEach((bidder) => {
    var option = document.createElement("option");
    option.innerHTML = bidder.name;
    datalist.appendChild(option);
  });
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
  flex-direction: row;
  background: white;
  padding: 25px;
  border-radius: 5px;
  border: solid 1px gray;
  box-shadow: 20px 0 40px rgba(black, 0.1);
  width: 30rem;
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

@media print {
  body {
    visibility: hidden;
  }
  .print-content,
  .print-content * {
    display: block;
    visibility: visible;
  }

  .pdf-content {
    float: none;
    margin-top: 7rem;
    width: 100%;
  }

  .pdf-content-header {
    padding-top: 5rem;
    font-size: 26px;
    font-weight: bold;
    width: 100%;
  }
}
</style>
