import { createStore } from "vuex";

export default createStore({
  state: {
    aucItems: [],
  },
  getters: {
    aucItems: (state) => {
      return state.aucItems;
    },
  },
  // mutations: {
  //   selectToEditVideo(state, value) {
  //     state.toEditVideo = value;
  //   },
  // },
  actions: {
    getAucItems: async (ctx) => {
      let response = await window.ipc.invoke("get-aucItems");
      if (response.status === true) {
        ctx.state.aucItems = response.data;
      }
    },
    // deleteVideo: async (ctx, id) => {
    //   let response = await window.ipc.invoke("delete-video", id);

    //   if (response.status === true) {
    //     ctx.dispatch("getVideos");
    //   }
    // },
    createAucItem: async (ctx, data) => {
      let response = await window.ipc.invoke("create-aucItem", data);

      if (response.status === true) {
        ctx.dispatch("getAucItems");
      }
    },
  },
});
