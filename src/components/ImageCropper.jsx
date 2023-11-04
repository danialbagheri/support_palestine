import React from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./useDebounceEffect";
import { canvasPreview } from "./CanvasPreview";
import Button from "@mui/joy/Button";
import canvasSize from "canvas-size";

export default function ImageCropper({ src, imageRef, setImage, setOpen }) {
  const [crop, setCrop] = React.useState();
  const [completedCrop, setCompletedCrop] = React.useState();
  const previewCanvasRef = React.useRef(null);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imageRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imageRef.current,
          previewCanvasRef.current,
          completedCrop
        );
      }
    },
    100,
    [completedCrop]
  );

  async function onComplete() {
    const image = imageRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );

    // console.log("image.width, image.height", image.width, image.height);
    // console.log("completedCrop.width * scaleX", completedCrop.width * scaleX);
    // ********
    // const canvasLimitation = await canvasSize.maxArea({
    //   usePromise: true,
    //   useWorker: true,
    // });

    // const maxSize = Math.max(image.width, image.height);
    // const safeArea = 1 * ((maxSize / 2) * Math.sqrt(2));

    // if (safeArea > canvasLimitation.height) {
    //   safeArea *= canvasLimitation.height / safeArea;
    // }
    // console.log(safeArea);
    // console.log("width", image.naturalWidth / image.width);
    // const offscreen = new OffscreenCanvas(safeArea, safeArea);
    // ************
    const ctx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      throw new Error("No 2d context");
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: "image/png",
    });
    const blobImage = new Image();
    blobImage.src = URL.createObjectURL(blob);
    // console.log("blob", blobImage);
    setImage(blobImage);
    setOpen(false);
  }

  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        aspect={1}
        onComplete={(c) => setCompletedCrop(c)}
      >
        <img src={src} ref={imageRef} />
      </ReactCrop>
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                display: "none",
                border: "1px solid black",
                objectFit: "contain",
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <Button onClick={onComplete} color="danger" sx={{ width: "100%" }}>
            SELECT
          </Button>
        </>
      )}
    </>
  );
}
