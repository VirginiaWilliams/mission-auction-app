<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <form @submit.prevent="addAucItem">
          <label for="num">Num</label>
          <input
            v-model="newNum"
            type="number"
            name="num"
            class="short-input-field"
            required
          />
          <label for="description">Desc</label>
          <input
            v-model="newDescription"
            type="textarea"
            name="description"
            placeholder="Enter the Item Description"
            required
          />
          <label for="value">Value</label>
          <input
            v-model="newValue"
            type="number"
            name="value"
            class="short-input-field"
            required
          />
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
          <datalist id="options">
            <option value="Oral"></option>
            <option value="Silent"></option>
          </datalist>
          <footer>
            <button type="submit" class="button primary">Add</button>
            <button @click="cancel" type="button" class="button secondary">
              Cancel
            </button>
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

const emit = defineEmits(["close-add-modal"]);

const newNum = ref();
const newDescription = ref("");
const newValue = ref();
const newType = ref("");

function cancel() {
  emit("close-add-modal");
}

function addAucItem() {
  let data = {};

  data.num = newNum.value;
  data.description = newDescription.value;
  data.type = newType.value;
  data.value = newValue.value;

  store.dispatch("createAucItem", data);
  emit("close-add-modal");
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
  background: white;
  padding: 25px;
  border-radius: 5px;
  border: solid 1px gray;
  box-shadow: 20px 0 40px rgba(black, 0.1);
  width: 100%;
}

form {
  display: grid;
  grid-template-columns: 15% 85%;
  column-gap: 10px;
  row-gap: 20px;
  align-items: center;
  width: 100%;
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
