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

    ipcMain.handle("create-aucItem", async (e, data) => {
      console.log("----------------- ipcMain", data);
      try {
        await CreateAucItem(data.name, data.value);

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
