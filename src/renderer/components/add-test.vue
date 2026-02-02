<template>
  <div class="form-wrapper">
    <div class="form-modal">
      <h2>Create</h2>
      <form @submit.prevent="addTest">
        <label for="name">Name</label>
        <input
          v-model="name"
          type="name"
          name="name"
          placeholder="Enter the test Name"
          required
        />

        <footer>
          <button type="submit" class="button primary">Add</button>
          <button @click="cancel" type="button" class="button white-s">
            Cancel
          </button>
        </footer>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStore, defineEmits } from "vuex";

const store = useStore();

const emit = defineEmits(["close"]);

function cancel() {
  emit("close");
}

function addTest() {
  let data = {
    name: "",
  };
  data.name = "test";
  store.dispatch("createTest", data);
  emit("close");
}
</script>

<style scoped>
.form-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(darkred, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-modal {
  background: lightgray;
  padding: 25px;
  border-radius: 5px;
  border-color: black;
  box-shadow: 20px 0 40px rgba(black, 0.1);
  width: 480px;
  h2 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 20px;
  }
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
  .pls {
    display: flex;
    width: 100%;
    column-gap: 10px;
    align-items: center;
    input {
      width: 100%;
    }
    .add {
      background: red;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s ease-in-out;
      &:hover {
        background: darkred;
      }
    }
  }
  footer {
    margin-top: 20px;
    grid-column: 1/-1;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 20px;
    button {
      min-width: 80px;
    }
  }
}
</style>
