import { ImageResponse } from "next/og";

export const alt = "Only in BR — Produção de eventos em São Paulo, da ideia à execução";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          background: "linear-gradient(135deg, #072312 0%, #0c381c 50%, #04140a 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Glows de Fundo */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(251, 191, 36, 0.18)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(56, 189, 248, 0.18)",
            filter: "blur(90px)",
            display: "flex",
          }}
        />

        {/* Topo: Logo & Badge */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontSize: 40,
              fontWeight: 900,
              color: "#fbbf24",
              letterSpacing: "-0.04em",
            }}
          >
            <span>ONLY</span>
            <span style={{ color: "#38bdf8", marginLeft: "4px", marginRight: "4px" }}>in</span>
            <span>BR</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "10px 22px",
              borderRadius: "999px",
              fontSize: 16,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            São Paulo & Região
          </div>
        </div>

        {/* Centro: Headline Principal */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "960px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.12,
              gap: "8px",
            }}
          >
              <span>Produção de eventos</span>
              <span style={{ color: "#f5bd2c" }}>da ideia à execução.</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "rgba(255, 255, 255, 0.85)",
              lineHeight: 1.45,
              fontWeight: 400,
              maxWidth: "880px",
            }}
          >
            Planejamento, estrutura, staff, alimentação, marketing e operação para eventos em São Paulo e região.
          </div>
        </div>

        {/* Base: Pilares de Serviços */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
            width: "100%",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(251, 191, 36, 0.15)",
              border: "1px solid rgba(251, 191, 36, 0.35)",
              color: "#fbbf24",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Corporativo & Staff
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.35)",
              color: "#34d399",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Igrejas & Quermesses
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(251, 191, 36, 0.15)",
              border: "1px solid rgba(251, 191, 36, 0.35)",
              color: "#fbbf24",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Estrutura & LED
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(56, 189, 248, 0.15)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              color: "#38bdf8",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            Alvarás & ART
          </div>
          <div
            style={{
              display: "flex",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#ffffff",
              padding: "8px 16px",
              borderRadius: "12px",
              fontSize: 15,
              fontWeight: 700,
            }}
          >
            @botecagemsp
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
