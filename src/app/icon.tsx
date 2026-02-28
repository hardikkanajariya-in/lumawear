import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#1a1a1a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c9a96e",
          borderRadius: 6,
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}
