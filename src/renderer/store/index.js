import { createStore } from "vuex";

export default createStore({
  state: {
    aucItems: [],
    bidders: [],
    logo: "",
    bidderPackageMap: new Map(),
    bidderTotalsMap: new Map(),
    // isTableBidder: false,
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
      return state.bidderPackageMap;
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

    deleteBidder: async (ctx, id) => {
      let response = await window.ipc.invoke("delete-bidder", id);

      if (response.status === true) {
        ctx.dispatch("getBidders");
      }
    },

    // ********** Logo **********
    getLogo: async (ctx) => {
      let response = await window.ipc.invoke("get-logo");
      ctx.state.logo = String(response);
    },

    createLogo: async (ctx, data) => {
      await window.ipc.invoke("create-logo", data);
      ctx.dispatch("getLogo");
    },

    // ********** Maps **********
    setMaps: async (ctx) => {
      ctx.state.aucItems.forEach((p) => {
        if (p.bidderName != "") {
          // Add to bidder -> package map
          if (!ctx.state.bidderPackageMap.has(p.bidderName)) {
            ctx.state.bidderPackageMap.set(p.bidderName, []);
          }
          ctx.state.bidderPackageMap.get(p.bidderName).push(p);

          // Add to bidder -> total map
          if (!ctx.state.bidderTotalsMap.has(p.bidderName)) {
            ctx.state.bidderTotalsMap.set(p.bidderName, 0);
          }
          const currentTotal = ctx.state.bidderTotalsMap.get(p.bidderName);
          ctx.state.bidderTotalsMap.set(
            p.bidderName,
            currentTotal + p.winningAmount
          );
        }
      });
    },
    resetMaps: async (ctx) => {
      ctx.bidderPackageMap = new Map();
      ctx.bidderTotalsMap = new Map();
    },
  },
});
