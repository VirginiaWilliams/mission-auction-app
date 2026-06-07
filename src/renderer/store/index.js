import { createStore } from "vuex";

export default createStore({
  state: {
    aucItems: [],
    bidders: [],
    logo: null,
  },
  getters: {
    aucItems: (state) => {
      return state.aucItems;
    },
    bidders: (state) => {
      return state.bidders;
    },
    logo: (state) => {
      return state.logo;
    },
    bidderPackageMap: (state) => {
      const sortedArray = Array.from(state.bidderPackageMap.entries());
      sortedArray.sort((a, b) => {
        return a[1][0].bidderNum - b[1][0].bidderNum;
      });

      const sortedMap = new Map(sortedArray);
      return sortedMap;
    },
    bidderTotalsMap: (state) => {
      return state.bidderTotalsMap;
    },
  },
  actions: {
    // First stop in API action process
    // ********** Auc Item **********
    getAucItems: async (ctx) => {
      let response = await window.ipc.invoke("get-aucItems");
      if (response.status === true) {
        ctx.state.aucItems = response.data;
      }
    },

    createAucItem: async (ctx, data) => {
      let response = await window.ipc.invoke("create-aucItem", data);

      if (response.status === true) {
        ctx.dispatch("getAucItems");
      }
    },

    editAucItem: async (ctx, data) => {
      let response = await window.ipc.invoke("edit-aucItem", data);

      if (response.status === true) {
        ctx.dispatch("getAucItems");
      }
    },

    deleteAucItem: async (ctx, id) => {
      let response = await window.ipc.invoke("delete-aucItem", id);

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

    editBidder: async (ctx, data) => {
      let response = await window.ipc.invoke("edit-bidder", data);

      if (response.status === true) {
        ctx.dispatch("getBidders");
      }
    },

    deleteBidder: async (ctx, id) => {
      let response = await window.ipc.invoke("delete-bidder", id);

      if (response.status === true) {
        ctx.dispatch("getBidders");
      }
    },

    // ********** Link **********
    addLink: async (ctx, data) => {
      let response = await window.ipc.invoke("add-link", data);

      if (response.status === true) {
        ctx.dispatch("getAucItems");
      }
    },

    deleteLink: async (ctx, id) => {
      let response = await window.ipc.invoke("delete-link", id);

      if (response.status === true) {
        ctx.dispatch("getBidders");
        ctx.dispatch("getAucItems");
      }
    },

    // ********** Logo **********
    getLogos: async (ctx) => {
      let response = await window.ipc.invoke("get-logos");
      if (response.status === true) {
        ctx.state.logo = response.data.dataValues;
      }
      return response;
    },

    createLogo: async (ctx, data) => {
      let response = await window.ipc.invoke("create-logo", {
        data: data,
        mimeType: Blob.type,
      });

      if (response.status === true) {
        ctx.dispatch("getLogos");
      }
      return response;
    },

    editLogo: async (ctx, data) => {
      let response = await window.ipc.invoke("edit-logo", data);

      if (response.status === true) {
        ctx.dispatch("getLogos");
      }
    },

    deleteLogo: async (ctx, id) => {
      let response = await window.ipc.invoke("delete-logo", id);

      if (response.status === true) {
        ctx.dispatch("getLogos");
      }
    },
  },
});
