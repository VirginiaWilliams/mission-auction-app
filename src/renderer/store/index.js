import { createStore } from "vuex";

export default createStore({
  state: {
    aucItems: [],
    bidders: [],
  },
  getters: {
    aucItems: (state) => {
      return state.aucItems;
    },
    bidders: (state) => {
      return state.bidders;
    },
  },
  // mutations: {
  //   selectToEditVideo(state, value) {
  //     state.toEditVideo = value;
  //   },
  // },
  actions: {
    // ********** Auc Item **********
    getAucItems: async (ctx) => {
      let response = await window.ipc.invoke("get-aucItems");
      if (response.status === true) {
        ctx.state.aucItems = response.data;
      }
    },

    // First stop in API action process
    createAucItem: async (ctx, data) => {
      let response = await window.ipc.invoke("create-aucItem", data);

      if (response.status === true) {
        ctx.dispatch("getAucItems");
      }
    },

    // ********** Bidder **********
    getBidders: async (ctx) => {
      let response = await window.ipc.invoke("get-bidders");
      if (response.status === true) {
        ctx.state.bidders = response.data;
      }
    },

    createBidder: async (ctx, data) => {
      let response = await window.ipc.invoke("create-bidder", data);

      if (response.status === true) {
        ctx.dispatch("getBidders");
      }
    },

    // deleteVideo: async (ctx, id) => {
    //   let response = await window.ipc.invoke("delete-video", id);

    //   if (response.status === true) {
    //     ctx.dispatch("getVideos");
    //   }
    // },
  },
});
