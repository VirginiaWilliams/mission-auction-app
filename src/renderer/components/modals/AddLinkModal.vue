<template>
  <div class="add-link-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Add Link</div>
        <form @submit.prevent="addLink">
          <div class="input-field-container">
            <label class="long-label" for="num">Package Num</label>
            <input
              v-model="newPakcageNum"
              type="number"
              name="num"
              class="short-input-field"
              required
            />
          </div>
          <div class="input-field-container">
            <label class="long-label" for="name">Bidder Num</label>
            <input
              v-model="newBidderNum"
              type="number"
              name="name"
              class="short-input-field"
              required
            />
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
          <div class="preview-container">
            <div>Preview: {{}}</div>
          </div>
          <footer>
            <button @click="cancel" type="button" class="button secondary">
              Cancel
            </button>
            <button type="submit" class="button primary">Add</button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore, defineEmits } from "vuex";
import { ref } from "vue";

const store = useStore();

const emit = defineEmits(["close-link-modal"]);

const newPakcageNum = ref();
const newBidderNum = ref();
const newWinning = ref();

function cancel() {
  emit("close-link-modal");
}

function addLink() {
  let data = {};

  data.num = newPakcageNum.value;
  data.name = newBidderNum.value;
  data.winningAmount = newWinning.value;

  store.dispatch("createLink", data);
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
