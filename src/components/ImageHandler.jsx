import React, { useEffect, useRef } from "react";
import { useCaman } from "../hooks/use-caman";
import FileInputUpload from "./form/FileInputUpload";
import ImageCropper from "./ImageCropper";
import Modal from "@mui/joy/Modal";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";

function ImageHandler() {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const imageCropperRef = useRef(null);
  const [open, setOpen] = React.useState(false);
  const caman = useCaman();
  const [image, setImage] = React.useState(null);

  const handleImageUpload = (e) => {
    setOpen(true);
    const pfile = fileInputRef.current.files[0];
    // new changes
    const reader = new FileReader();
    reader.readAsDataURL(pfile);
    reader.onload = (e) => {
      console.log("onload");
      imageCropperRef.current.src = e.target.result;
    };
  };
  useEffect(() => {
    if (image) {
      console.log("image");
      console.log(image);
      imageRef.current.src = image.src;

      imageRef.current.onload = () => {
        caman(imageRef.current, function () {
          // Add a flag overlay here
          this.newLayer(function () {
            this.overlayImage("/images/template1.png");
          });

          this.render();
          console.log("rendered", this);
        });
      };
    }
  }, [image]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        width: "400px",
      }}
    >
      <FileInputUpload
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
      />
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "scroll",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Please crop your image first
          </Typography>
          <ImageCropper
            imageRef={imageCropperRef}
            src={""}
            setImage={setImage}
            setOpen={setOpen}
          />
        </Sheet>
      </Modal>
      {image && (
        <img
          ref={imageRef}
          src=""
          alt="imageRef"
          style={{ maxWidth: "100%", maxHeight: "auto" }}
        />
      )}
    </div>
  );
}

export default ImageHandler;
