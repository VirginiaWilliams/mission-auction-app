<template>
  <div class="edit-bidder-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Edit Package</div>
        <form @submit.prevent="editBidder">
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
            <label for="name">Name</label>
            <input
              v-model="newName"
              type="textarea"
              name="name"
              placeholder="Enter new Name"
              required
            />
          </div>
          <footer>
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
import { ref, defineProps, computed } from "vue";

const store = useStore();

const props = defineProps({
  id: Number,
  num: String,
  name: String,
});

store.dispatch("getBidders");
store.dispatch("getAucItems");

const aucItems = computed(() => {
  return store.getters.aucItems;
});

const emit = defineEmits(["close-edit-bidder-modal"]);

const newNum = ref(props.num);
const newName = ref(props.name);

function cancel() {
  emit("close-edit-bidder-modal");
}

function editBidder() {
  let data = {};

  data.id = props.id;
  data.num = newNum.value;
  data.name = newName.value;

  store.dispatch("editBidder", data);

  const filteredAuc = aucItems.value.filter(
    (item) => item.bidderNum === props.num
  );

  filteredAuc.forEach((item) => {
    let data = {};

    data.id = item.id;
    data.num = item.num;
    data.type = item.type;
    data.description = item.description;
    data.value = item.value;
    data.winningAmount = item.winningAmount;
    data.bidderNum = item.bidderNum;
    data.bidderName = newName.value;

    console.log("item: ", data);
    store.dispatch("editAucItem", data);
  });

  emit("close-edit-bidder-modal");
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
