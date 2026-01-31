<template>
  <div class="card">
    <div class="card-content">
      <label class="name">{{ test.name }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "testCard",
  props: {
    test: Object,
  },
};
</script>

<style scoped>
.card {
  max-width: 220px;
  min-width: 220px;
  height: 100%;
  text-align: left;
}
.card-content {
  height: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(black, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;

  .image {
    border-radius: 3px;
    width: 100%;
    height: 196px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title {
    display: block;
    margin-top: 10px;
    margin-bottom: 5px;
    font-weight: 600;
    color: darken(grey, 10);
    overflow-wrap: break-word;
  }
  .author {
    display: block;
    font-weight: 500;
    color: grey;
  }
  .playlists {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    row-gap: 5px;
    margin: 10px 0;
    .playlist {
      color: red;
      font-weight: 600;
      margin: 0 5px;
      transition: 0.3s ease-in-out;
      &:nth-of-type(1) {
        margin: 0;
      }
      &:hover {
        color: darkred;
      }
    }
    button {
      margin-left: 5px;
    }
  }
  .controllers {
    margin-top: auto;
    display: flex;
    column-gap: 10px;
  }
}
</style>
