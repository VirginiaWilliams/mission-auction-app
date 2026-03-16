export function convertJpgToPng(jpegFileBlob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the JPEG image onto the canvas
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Get the image data as a PNG blob
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob); // The resulting PNG blob
        } else {
          reject(new Error("Canvas toBlob failed"));
        }
      }, "image/png");
    };
    img.onerror = (error) => reject(error);

    // Set the image source to the URL of the JPEG blob
    img.src = URL.createObjectURL(jpegFileBlob);
  });
}
