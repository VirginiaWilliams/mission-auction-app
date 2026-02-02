import { ipcMain } from "electron";
import { CreateTest, ReadTest } from "./database/api";

async function server() {
  try {
    ipcMain.handle("get-tests", async () => {
      try {
        return {
          status: true,
          data: await ReadTest(),
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

    ipcMain.handle("create-test", async () => {
      try {
        let testData = {
          name: "test",
        };

        await CreateTest(testData);

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
