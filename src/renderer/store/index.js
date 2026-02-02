import { createStore } from "vuex";

export default createStore({
  state: {
    tests: [],
  },
  getters: {
    tests: (state) => {
      return state.tests;
    },
  },
  // mutations: {
  //   selectToEditVideo(state, value) {
  //     state.toEditVideo = value;
  //   },
  // },
  actions: {
    getTests: async (ctx) => {
      let response = await window.ipc.invoke("get-tests");
      if (response.status === true) {
        ctx.state.tests = response.data;
      }
    },
    // deleteVideo: async (ctx, id) => {
    //   let response = await window.ipc.invoke("delete-video", id);

    //   if (response.status === true) {
    //     ctx.dispatch("getVideos");
    //   }
    // },
    createTest: async (ctx, data) => {
      let response = await window.ipc.invoke("create-test", data);

      if (response.status === true) {
        ctx.dispatch("getTests");
      }
    },
  },
});
