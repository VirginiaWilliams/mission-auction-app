import { ipcMain, app } from "electron";
import {
  CreateAucItem,
  ReadAucItem,
  EditAucItem,
  DeleteAucItem,
  CreateBidder,
  ReadBidder,
  DeleteBidder,
  // CreateLogo,
  // ReadLogo,
} from "./database/api";
const fs = require("fs");

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

    ipcMain.handle("delete-bidder", async (e, id) => {
      try {
        await DeleteBidder(id);
        return { status: true };
      } catch (err) {
        return { status: false, data: err.message };
      }
    });

    // ********** Logo **********
    ipcMain.handle("get-logo", async () => {
      try {
        // Ensure the path is safe/within app scope if necessary
        const filePath = app.getAppPath() + "\\logo.png";
        const imageBuffer = fs.readFileSync(filePath);
        const base64Image = imageBuffer.toString("base64");

        return `data:image/png;base64,${base64Image}`; // Read file synchronously for simplicity, async is better for large files
      } catch (error) {
        console.error("Failed to read file:", error);
        throw new Error(error.message); // Throw an error that the renderer can catch
      }
    });

    ipcMain.handle("create-logo", async (e, data) => {
      const filePath = app.getAppPath() + "\\logo.png";
      const buffer = Buffer.from(data);

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          console.error("Failed to save the file:", err);
        }
      });
    });
  } catch (err) {
    throw new Error(err);
  }
}

export { server };
