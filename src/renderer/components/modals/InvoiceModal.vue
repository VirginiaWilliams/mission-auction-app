<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="invoice-container">
          <button
            @click="generateSinglePDF"
            type="button"
            class="button primary"
          >
            Generate Single PDF
          </button>
          <br />
          - or -
          <br />
          <br />
          <button @click="generateAllPDFs" type="button" class="button primary">
            Generate All PDFs
          </button>
        </div>
        <footer>
          <button @click="cancel" type="button" class="button secondary">
            Cancel
          </button>
        </footer>
      </div>
    </div>
  </div>
  <div id="print-content">
    <div v-for="(i, index) in aucItems" :key="index">
      <!-- Your printable content here -->
      <h1>Invoice #123</h1>
      <div>{{ i.num ? i.num : "" }}</div>
      <div class="page-break"></div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const emit = defineEmits(["close-generate-modal"]);

store.dispatch("getAucItems");

const aucItems = computed(() => {
  return store.getters.aucItems;
});
// const aucItems = ref();

function generateSinglePDF() {
  window.print();
}

function generateAllPDFs() {
  aucItems.value = store.getters.aucItems;
  window.print();
}

function cancel() {
  emit("close-generate-modal");
}
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

footer {
  grid-column: 1/-1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  column-gap: 20px;
  margin-right: 0;
  margin-left: auto;
}

.primary {
  background-color: cornflowerblue;
  margin-right: 1rem;
  margin-left: 1rem;
}

.secondary {
  background-color: rgb(82, 82, 82);
}

#print-content,
#print-content * {
  display: none;
}

@media print {
  body {
    visibility: hidden;
  }
  #print-content,
  #print-content * {
    display: block;
    visibility: visible;
  }

  .page-break {
    break-after: page;
  }
}
</style>
