import { ipcMain } from "electron";
import {
  CreateAucItem,
  ReadAucItem,
  EditAucItem,
  DeleteAucItem,
  CreateBidder,
  EditBidder,
  ReadBidder,
  DeleteBidder,
  AddLink,
  DeleteLink,
  CreateLogo,
  ReadLogo,
  EditLogo,
  DeleteLogo,
} from "./database/api";
// const fs = require("fs");

async function server() {
  try {
    // Second stop in API action process
    // ********** Auc Item **********
    ipcMain.handle("get-aucItems", async () => {
      try {
        return {
          status: true,
          data: await ReadAucItem(),
        };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    ipcMain.handle("create-aucItem", async (e, data) => {
      try {
        await CreateAucItem(data);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("edit-aucItem", async (e, data) => {
      try {
        await EditAucItem(data);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("delete-aucItem", async (e, id) => {
      try {
        await DeleteAucItem(id);
        return { status: true };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    // ********** Bidder **********
    ipcMain.handle("get-bidders", async () => {
      try {
        return {
          status: true,
          data: await ReadBidder(),
        };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    ipcMain.handle("create-bidder", async (e, data) => {
      try {
        await CreateBidder(data);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("edit-bidder", async (e, data) => {
      try {
        await EditBidder(data);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("delete-bidder", async (e, id) => {
      try {
        await DeleteBidder(id);
        return { status: true };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    // ********** Link **********

    ipcMain.handle("add-link", async (e, data) => {
      try {
        await AddLink(data);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("delete-link", async (e, id) => {
      try {
        await DeleteLink(id);
        return { status: true };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    // ********** Logo **********
    ipcMain.handle("get-logos", async () => {
      try {
        const res = await ReadLogo();
        const last = res[res.length - 1];
        return {
          status: true,
          data: last,
        };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    ipcMain.handle("create-logo", async (e, { data }) => {
      const nodeBuffer = Buffer.from(data);
      try {
        await CreateLogo(nodeBuffer);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("edit-logo", async (e, data) => {
      try {
        await EditLogo(data);

        return {
          status: true,
        };
      } catch (err) {
        return { status: false, data: err };
      }
    });

    ipcMain.handle("delete-logo", async (e, id) => {
      try {
        await DeleteLogo(id);
        return { status: true };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });
  } catch (err) {
    throw new Error(err);
  }
}

export { server };
