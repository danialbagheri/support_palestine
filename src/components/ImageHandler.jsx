import React, { useEffect, useRef } from "react";
import { useCaman } from "../hooks/use-caman";
import FileInputUpload from "./form/FileInputUpload";

function ImageHandler() {
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const previewRef = useRef(null);
  const caman = useCaman();
  const [image, setImage] = React.useState(null);

  const handleImageUpload = (e) => {
    const pfile = fileInputRef.current.files[0];
    if (pfile) {
      //   const reader = new FileReader();
      //   reader.readAsDataURL(pfile);
      //   reader.onload = function (e) {
      //     previewRef.current.src = e.target.result;
      //   };
      setImage(pfile);
    }
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        console.log("onload");
        const image = new Image();
        imageRef.current.src = e.target.result;
        image.src = e.target.result;
        image.onload = () => {
          caman(imageRef.current, function () {
            // Add a flag overlay here
            this.newLayer(function () {
              this.overlayImage("/images/template1.png");
            });

            this.render();
            console.log("rendered", this);
          });
        };
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
      <img
        src="/images/template1.png"
        alt="PreviewMain"
        style={{ maxWidth: "100px", maxHeight: "auto" }}
      />
      <img
        ref={previewRef}
        src=""
        alt="PreviewMain"
        style={{ maxWidth: "100%", maxHeight: "auto" }}
      />
      <img
        ref={imageRef}
        src=""
        alt="Preview"
        style={{ maxWidth: "100%", maxHeight: "auto" }}
      />
    </div>
  );
}

export default ImageHandler;
