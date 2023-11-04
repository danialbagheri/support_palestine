import React from "react";
import ImageHandler from "./components/ImageHandler";
import { Box, Typography } from "@mui/joy";
export default function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "600px",
          width: "80vw",
          gap: 4,
          mt: 6,
        }}
      >
        <Typography sx={{ textAlign: "center" }}>
          Show you support for Palestine 🇵🇸 by adding the Palestinian's flag to
          your profile picture on social media
        </Typography>
        <ImageHandler />
        <Typography sx={{ textAlign: "center" }}>
          Your image is not being uploaded to any server; all the effects are
          processed on your device. 🇵🇸✌🏼
        </Typography>
      </Box>
    </Box>
  );
}
