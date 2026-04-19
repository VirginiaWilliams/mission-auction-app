<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Add Package</div>
        <form @submit.prevent="addAucItem">
          <div class="input-field-container">
            <label for="num">Num</label>
            <input
              v-model="newNum"
              type="number"
              name="num"
              class="short-input-field"
              required
            />
          </div>
          <div class="input-field-container">
            <label for="description">Desc</label>
            <input
              v-model="newDescription"
              type="textarea"
              name="description"
              placeholder="Enter the Item Description"
              required
            />
          </div>
          <div class="input-field-container">
            <label for="value">Value</label>
            <input
              v-model="newValue"
              type="number"
              name="value"
              class="short-input-field"
              required
            />
          </div>
          <div class="input-field-container">
            <label for="type">Type</label>
            <input
              v-model="newType"
              type="list"
              id="type"
              list="options"
              name="type"
              class="short-input-field"
              required
            />
          </div>
          <datalist id="options">
            <option value="Oral"></option>
            <option value="Silent"></option>
          </datalist>
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

store.dispatch("getAucItems");

const emit = defineEmits(["close-auc-modal"]);

const newNum = ref(
  Math.max(...store.getters.aucItems.map((item) => item.num)) + 1
);
if (newNum.value <= 0) {
  newNum.value = 1;
}
const newDescription = ref("");
const newValue = ref();
const newType = ref("");

function cancel() {
  emit("close-auc-modal");
}

function addAucItem() {
  let data = {};

  data.num = newNum.value;
  data.description = newDescription.value;
  data.type = newType.value;
  data.value = newValue.value;

  store.dispatch("createAucItem", data);
  emit("close-auc-modal");
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
