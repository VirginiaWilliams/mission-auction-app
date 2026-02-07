<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <h2>Create</h2>
        <form @submit.prevent="addAucItem">
          <label for="name">Name</label>
          <input
            v-model="newName"
            type="name"
            name="name"
            placeholder="Enter the Item Name"
            required
          />
          <label for="value">Value</label>
          <input
            v-model="newValue"
            type="value"
            name="value"
            placeholder="Enter the Item Value"
            required
          />
          <label for="type">Type</label>
          <input
            v-model="newType"
            type="type"
            name="type"
            placeholder="Enter the Item Type"
            required
          />

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

const newName = ref("");
const newValue = ref(0);
const newType = ref("");

function cancel() {
  emit("close-add-modal");
}

function addAucItem() {
  let data = {};

  data.type = newType.value;
  data.name = newName.value;
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
  background: lightgray;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 20px 0 40px rgba(black, 0.1);
  width: 480px;
}

form {
  display: grid;
  grid-template-columns: 15% 85%;
  column-gap: 10px;
  row-gap: 20px;
  align-items: center;
  label {
    font-weight: 600;
  }
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
</style>
