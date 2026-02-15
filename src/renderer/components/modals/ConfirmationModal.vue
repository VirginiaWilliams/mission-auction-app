<template>
  <div class="add-auc-container">
    <div class="form-wrapper">
      <div class="form-modal">
        <div class="modal-title">Are You Sure?</div>
        <footer>
          <button @click="cancel" type="button" class="button secondary">
            Cancel
          </button>
          <button @click="submit" class="button primary">Delete</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vuex";

const emit = defineEmits(["close-conf-modal, submit-conf-modal"]);

function submit() {
  emit("submit-conf-modal");
}

function cancel() {
  emit("close-conf-modal");
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
  width: 30rem;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 2rem;
}

.modal-text {
  text-align: left;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-right: 0;
  margin-left: auto;
}

.primary {
  background-color: cornflowerblue;
}

.secondary {
  background-color: rgb(82, 82, 82);
}
</style>
