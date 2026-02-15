<template>
  <div class="add-bidder-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Add Bidder</div>
        <form @submit.prevent="addBidderItem">
          <label for="num">Num</label>
          <input
            v-model="newNum"
            type="number"
            name="num"
            class="short-input-field"
            required
          />
          <label for="name">Name</label>
          <input
            v-model="newName"
            type="textarea"
            name="name"
            placeholder="Enter Bidder Name"
            required
          />
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

const emit = defineEmits(["close-bidder-modal"]);

const newNum = ref();
const newName = ref("");

function cancel() {
  emit("close-bidder-modal");
}

function addBidderItem() {
  let data = {};

  data.num = newNum.value;
  data.name = newName.value;

  store.dispatch("createBidder", data);
  emit("close-bidder-modal");
}
</script>

<style>
.form-wrapper {
  display: flex;
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
  width: 100%;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;
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
