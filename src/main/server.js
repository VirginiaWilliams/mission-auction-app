import { ipcMain } from "electron";
import {
  CreateAucItem,
  ReadAucItem,
  DeleteAucItem,
  CreateBidder,
  ReadBidder,
} from "./database/api";

async function server() {
  try {
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

    // Second stop in API action process
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

    // ipcMain.handle("delete-video", async (e, id) => {
    //   try {
    //     /**
    //      * When we delete a video, the relationship is deleted too.
    //      */
    //     await DeleteVideo(id);
    //     return { status: true };
    //   } catch (err) {
    //     return { status: false, data: err.message };
    //   }
    // });****************************************************************
  } catch (err) {
    throw new Error(err);
  }
}

export { server };
