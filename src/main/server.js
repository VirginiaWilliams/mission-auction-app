import { ipcMain } from "electron";
import { CreateAucItem, ReadAucItem } from "./database/api";

async function server() {
  try {
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

    // *****************************************************************
  } catch (err) {
    throw new Error(err);
  }
}

export { server };
