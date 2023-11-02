import React from "react";
import ImageHandler from "./components/ImageHandler";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 100,
      }}
    >
      <ImageHandler />
    </div>
  );
}
