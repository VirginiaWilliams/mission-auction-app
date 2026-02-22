<template>
  <div class="add-link-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Add Link</div>
        <form @submit.prevent>
          <div class="input-field-container">
            <label class="long-label" for="num">Package Num</label>
            <input
              v-model="newPackageNum"
              type="number"
              name="num"
              class="short-input-field"
              required
              @input="setValues"
            />
            - {{ selectedPackageDesc }}
          </div>
          <div class="input-field-container">
            <label class="long-label" for="name">Bidder Num</label>
            <input
              v-model="newBidderNum"
              type="number"
              name="name"
              class="short-input-field"
              required
              @input="setValues"
            />
            - {{ selectedBidderName }}
          </div>
          <div class="input-field-container">
            <label class="long-label" for="winning">Winning Amount $</label>
            <input
              v-model="newWinning"
              type="number"
              name="winning"
              class="short-input-field"
              required
            />
          </div>
          <footer>
            <button @click="cancel" type="button" class="button secondary">
              Cancel
            </button>
            <button @click="addLink" class="button primary">Add</button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore, defineEmits } from "vuex";
import { ref, computed } from "vue";

const store = useStore();

const emit = defineEmits(["close-link-modal"]);

const newPackageNum = ref();
const newBidderNum = ref();
const newWinning = ref();

const packageData = ref();

const selectedPackageDesc = ref();
const selectedBidderName = ref();

const bidders = computed(() => {
  return store.getters.bidders;
});

const packages = computed(() => {
  return store.getters.aucItems;
});

function setValues() {
  const selectedBidder = bidders.value.find(
    (b) => b.num === newBidderNum.value
  );
  if (selectedBidder) {
    selectedBidderName.value = selectedBidder.name;
  } else {
    selectedBidderName.value = "";
  }

  const temp = packages.value.find((p) => p.num === newPackageNum.value);
  if (temp) {
    packageData.value = temp;
    selectedPackageDesc.value = temp.description;
  } else {
    selectedPackageDesc.value = "";
  }
}

function cancel() {
  emit("close-link-modal");
}

function addLink() {
  let data = {};

  data.id = packageData.value.id;
  data.num = packageData.value.num;
  data.type = packageData.value.type;
  data.description = packageData.value.description;
  data.value = packageData.value.value;
  data.winningAmount = newWinning.value;
  data.bidderNum = newBidderNum.value;
  data.bidderName = selectedBidderName.value;

  store.dispatch("editAucItem", data);
  emit("close-link-modal");
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
  display: flex;
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
  width: 100%;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;
}

form {
  display: flex;
  flex-direction: column;
}

.input-field-container {
  margin-left: 0;
  margin-right: auto;
  margin-bottom: 1rem;
}

label {
  margin-right: 1rem;
}

.long-label {
  width: 7rem;
}

footer {
  grid-column: 1/-1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  column-gap: 20px;
}

.primary {
  background-color: cornflowerblue;
}

.secondary {
  background-color: rgb(82, 82, 82);
}

.short-input-field {
  width: 4rem;
}
</style>
