<template>
  <div class="card">
    <div class="card-content">
      <div class="image">
        <img :src="video.thumbnail" />
      </div>
      <label class="title">{{ video.title }}</label>
      <span class="author">{{ video.author }}</span>
      <div class="playlists">
        <template v-for="(playlist, index) in video.Playlists" :key="index">
          <a href="/#" class="playlist">{{ playlist.name }},</a>
        </template>
      </div>
      <div class="controllers">
        <button class="button icon secondary">
          <span
            class="material-icons"
            @click="$store.dispatch('deleteVideo', video.id)"
          >
            delete
          </span>
        </button>
        <button class="button icon primary">
          <span
            class="material-icons"
            @click="$store.commit('selectToEditVideo', video)"
          >
            edit
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "videoCard",
  props: {
    video: Object,
  },
};
</script>

<style>
.card {
  max-width: 220px;
  min-width: 220px;
  height: 100%;
  text-align: left;
  background: #fff;
}
.card-content {
  height: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 20px rgba(black, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
}
</style>
