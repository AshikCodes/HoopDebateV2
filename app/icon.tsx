import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** HoopDebate favicon: hoop + vote split (up/down consensus clash) */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0a0a0a",
          borderRadius: 6,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Hoop */}
        <div
          style={{
            position: "absolute",
            top: 6,
            width: 18,
            height: 10,
            border: "2px solid #fafafa",
            borderBottom: "none",
            borderRadius: "12px 12px 0 0",
          }}
        />

        {/* Rim line */}
        <div
          style={{
            position: "absolute",
            top: 14,
            width: 20,
            height: 2,
            background: "#f97316",
            borderRadius: 2,
          }}
        />

        {/* Ball (split opinion) */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            width: 18,
            height: 18,
            borderRadius: "50%",
            display: "flex",
            overflow: "hidden",
            border: "1.5px solid #e4e4e7",
          }}
        >
          {/* Agree side */}
          <div
            style={{
              width: "50%",
              height: "100%",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#0a0a0a",
              fontWeight: 700,
            }}
          >
            ▲
          </div>

          {/* Disagree side */}
          <div
            style={{
              width: "50%",
              height: "100%",
              background: "#ef4444",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#0a0a0a",
              fontWeight: 700,
            }}
          >
            ▼
          </div>
        </div>
      </div>
    ),
    size
  );
}