<template>
  <div class="edit-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Edit Package</div>
        <form @submit.prevent="editAucItem">
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
            <option value="Live"></option>
          </datalist>
          <div class="input-field-container">
            <label for="winningAmount">Winning Amount</label>
            <input
              v-model="newWinningAmount"
              type="number"
              name="winningAmount"
              class="short-input-field"
              required
            />
          </div>
          <footer>
            <div class="note-container">
              Note: bidder info must be edited from the bidder table
            </div>
            <button @click="cancel" type="button" class="button secondary">
              Cancel
            </button>
            <button type="submit" class="button primary">Submit</button>
          </footer>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore, defineEmits } from "vuex";
import { ref, defineProps } from "vue";

const store = useStore();

const props = defineProps({
  id: Number,
  num: String,
  description: String,
  type: String,
  value: String,
  winningAmount: String,
});

store.dispatch("getAucItems");

const emit = defineEmits(["close-edit-auc-modal"]);

const newNum = ref(props.num);
const newDescription = ref(props.description);
const newType = ref(props.type);
const newValue = ref(props.value);
const newWinningAmount = ref(props.winningAmount);

function cancel() {
  emit("close-edit-auc-modal");
}

function editAucItem() {
  let data = {};

  data.id = props.id;
  data.num = newNum.value;
  data.description = newDescription.value;
  data.type = newType.value;
  data.value = newValue.value;
  data.winningAmount = newWinningAmount.value;

  store.dispatch("editAucItem", data);

  emit("close-edit-auc-modal");
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
  margin-bottom: 1rem;
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

.note-container {
  font-size: 14px;
  margin-left: 0;
  margin-right: auto;
  margin-bottom: 2rem;
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
