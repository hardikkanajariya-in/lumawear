import { ImageResponse } from "next/og";

export const alt = "LumaWear — Premium Fashion";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            fontSize: 80,
            color: "#c9a96e",
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          LumaWear
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a8a29e",
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          Premium Fashion
        </div>
      </div>
    ),
    { ...size }
  );
}
