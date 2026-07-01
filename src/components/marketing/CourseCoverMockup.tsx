export default function CourseCoverMockup() {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.10)",
        background: "linear-gradient(145deg, #0B0E14 0%, #0E1B2E 100%)",
        boxShadow: "0 0 60px rgba(24,168,122,0.18), 0 16px 48px rgba(0,0,0,0.55)",
        overflow: "hidden",
        position: "relative",
        paddingBottom: "56.25%",
        width: "100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "20px 22px 16px",
        }}
      >
        {/* Top — tag + headline */}
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              borderRadius: 999,
              background: "rgba(24,168,122,0.15)",
              border: "1px solid rgba(24,168,122,0.4)",
              color: "#18A87A",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "3px 9px",
              marginBottom: 10,
            }}
          >
            FOR COMPLETE BEGINNERS
          </div>

          <div style={{ lineHeight: 1, marginBottom: 4 }}>
            <div style={{ color: "#dc2626", fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              STOP
            </div>
            <div style={{ color: "#E7ECF5", fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em" }}>
              GUESSING
            </div>
          </div>
          <div style={{ color: "#18A87A", fontSize: "clamp(0.6rem, 1.8vw, 0.78rem)", fontWeight: 600, marginTop: 4 }}>
            Read every candle with real confidence.
          </div>
        </div>

        {/* Middle — candlestick SVG */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
          <svg viewBox="0 0 160 90" width="52%" height="auto" aria-hidden="true" style={{ opacity: 0.9 }}>
            <line x1="16"  y1="4"  x2="16"  y2="86" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="42"  y1="8"  x2="42"  y2="78" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68"  y1="18" x2="68"  y2="82" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="94"  y1="6"  x2="94"  y2="74" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="120" y1="2"  x2="120" y2="68" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="146" y1="10" x2="146" y2="64" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
            <rect x="8"   y="20" width="16" height="48" rx="2" fill="#dc2626" />
            <rect x="34"  y="24" width="16" height="40" rx="2" fill="#dc2626" />
            <rect x="60"  y="30" width="16" height="42" rx="2" fill="#16a34a" />
            <rect x="86"  y="14" width="16" height="50" rx="2" fill="#16a34a" />
            <rect x="112" y="10" width="16" height="50" rx="2" fill="#16a34a" />
            <rect x="138" y="16" width="16" height="42" rx="2" fill="#16a34a" />
          </svg>
        </div>

        {/* Bottom — course label */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 8 }}>
          <div style={{ color: "#6B7280", fontSize: 8, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 2 }}>
            Interactive Pattern Course
          </div>
          <div style={{ color: "#E7ECF5", fontSize: "clamp(0.65rem, 2vw, 0.85rem)", fontWeight: 800, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            Candlestick Mastery
          </div>
          <div style={{ color: "#4B5563", fontSize: 8, fontWeight: 500, marginTop: 3 }}>
            English + हिन्दी &nbsp;·&nbsp; 34 animated patterns
          </div>
        </div>
      </div>
    </div>
  );
}
