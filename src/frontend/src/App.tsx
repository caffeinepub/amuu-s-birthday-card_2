import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────────── GLOBAL STYLES ─────────────────────────────── */
const globalStyles = `
  * { box-sizing: border-box; }
  body { font-family: 'Nunito', sans-serif; margin: 0; padding: 0; overflow-x: hidden; }
  @keyframes twinkle { 0%,100%{opacity:0.3} 50%{opacity:1} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
  @keyframes bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes fadeIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes heartFloat { 0%{transform:translateY(0) scale(1);opacity:1} 100%{transform:translateY(-120px) scale(0.5);opacity:0} }
  @keyframes confettiFall { 0%{transform:translateY(-20px) rotate(0deg);opacity:1} 100%{transform:translateY(100vh) rotate(720deg);opacity:0} }
  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
  @keyframes wave { 0%,100%{transform:rotate(-20deg)} 50%{transform:rotate(20deg)} }
  @keyframes sparkle { 0%,100%{transform:scale(0);opacity:0} 50%{transform:scale(1);opacity:1} }
  @keyframes glow { 0%,100%{text-shadow:0 0 10px #FFB3C6,0 0 20px #FF6B9D} 50%{text-shadow:0 0 20px #FFB3C6,0 0 40px #FF6B9D,0 0 60px #FF6B9D} }
  @keyframes riseUp { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(-200px);opacity:0} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
  @keyframes bounceIn { 0%{transform:scale(0.3);opacity:0} 60%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
  @keyframes knifeSlice { 0%{transform:translateY(-100px) rotate(-30deg);opacity:0} 30%{opacity:1} 100%{transform:translateY(80px) rotate(-30deg);opacity:0.7} }
  @keyframes petalFall { 0%{transform:translateY(-20px) rotate(0deg) translateX(0);opacity:1} 100%{transform:translateY(110vh) rotate(360deg) translateX(60px);opacity:0} }
  @keyframes starTwinkle2 { 0%,100%{opacity:0.2;transform:scale(0.8)} 50%{opacity:0.9;transform:scale(1.2)} }
  .btn-cute {
    font-family:'Nunito',sans-serif; font-weight:800; border:none; cursor:pointer;
    border-radius:9999px; padding:14px 36px; font-size:1rem; transition:all 0.2s;
    display:inline-flex; align-items:center; gap:8px;
  }
  .btn-cute:hover { transform:scale(1.08) translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,0.2); }
  .btn-cute:active { transform:scale(0.97); }
`;

/* ─────────────────────────────── TEDDY BEAR ─────────────────────────────── */
interface TeddyProps {
  message?: string;
  isWaving?: boolean;
  size?: number;
  teary?: boolean;
  position?: "fixed" | "relative" | "absolute";
}

function TeddyBear({
  message,
  isWaving = false,
  size = 120,
  teary: _teary = false,
  position = "fixed",
}: TeddyProps) {
  const s = size;
  return (
    <div
      style={{
        position,
        bottom: position === "fixed" ? 16 : undefined,
        right: position === "fixed" ? 16 : undefined,
        pointerEvents: "none",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
      }}
    >
      {message && (
        <div
          style={{
            background: "rgba(255,255,255,0.95)",
            border: "2px solid #FFB3C6",
            borderRadius: 18,
            padding: "10px 14px",
            maxWidth: 220,
            fontSize: "0.8rem",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 700,
            color: "#5a3060",
            boxShadow: "0 4px 16px rgba(255,107,157,0.2)",
            textAlign: "center",
            lineHeight: 1.4,
            animation: "fadeIn 0.5s ease-out forwards",
            position: "relative",
          }}
        >
          {message}
          <div
            style={{
              position: "absolute",
              bottom: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "10px solid #FFB3C6",
            }}
          />
        </div>
      )}
      <img
        src="/assets/generated/teddy-pink-transparent-transparent.dim_400x400.png"
        alt="fluffy pink teddy bear"
        width={s}
        height={s}
        style={{
          animation: isWaving
            ? "wave 0.5s ease-in-out infinite alternate"
            : "bob 2s ease-in-out infinite",
          cursor: "default",
          filter: "drop-shadow(0 8px 24px rgba(180,180,200,0.5))",
          display: "block",
        }}
      />
    </div>
  );
}

function FloatingHearts({ count = 10 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: `fh-${i}`,
    left: 5 + ((i * 17 + 31) % 90),
    top: 10 + ((i * 23 + 7) % 70),
    size: 10 + (i % 7) * 2.3,
    dur: 2 + (i % 5) * 0.6,
    delay: (i % 4) * 0.5,
  }));
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            animation: `float ${item.dur}s ease-in-out ${item.delay}s infinite`,
            opacity: 0.7,
            pointerEvents: "none",
          }}
        >
          💕
        </div>
      ))}
    </>
  );
}

function Stars({ count = 50 }: { count?: number }) {
  const items = Array.from({ length: count }, (_, i) => ({
    id: `star-${i}`,
    left: (i * 13 + 7) % 100,
    top: (i * 17 + 11) % 100,
    size: 1 + (i % 3),
    dur: 1.5 + (i % 5) * 0.5,
    delay: (i % 6) * 0.5,
  }));
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: item.size,
            height: item.size,
            borderRadius: "50%",
            background: "white",
            animation: `twinkle ${item.dur}s ${item.delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
    </>
  );
}

function ConfettiExplosion() {
  const colors = [
    "#FFB3C6",
    "#C9B8FF",
    "#B8F0D8",
    "#FFD4B8",
    "#FFE066",
    "#FF6B9D",
    "#8B7CF7",
  ];
  const items = Array.from({ length: 60 }, (_, i) => ({
    id: `cf-${i}`,
    left: (i * 11 + 3) % 100,
    w: 5 + (i % 6) * 1.5,
    h: 5 + ((i + 2) % 6) * 1.5,
    color: colors[i % colors.length],
    round: i % 2 === 0,
    dur: 2 + (i % 5) * 0.6,
    delay: (i % 4) * 0.5,
  }));
  return (
    <>
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            position: "fixed",
            left: `${item.left}%`,
            top: "-20px",
            width: `${item.w}px`,
            height: `${item.h}px`,
            background: item.color,
            borderRadius: item.round ? "50%" : "2px",
            animation: `confettiFall ${item.dur}s ${item.delay}s ease-in forwards`,
            pointerEvents: "none",
            zIndex: 200,
          }}
        />
      ))}
    </>
  );
}

/* ─────────────────────────────── SCENE 0 — OPENING ─────────────────────────────── */
function SceneOpening({ onNext }: { onNext: () => void }) {
  const [stars] = useState(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 3,
      dur: 1.5 + Math.random() * 2,
    })),
  );
  const [hearts] = useState(() =>
    Array.from({ length: 10 }, (_, i) => ({
      id: i,
      left: Math.random() * 90 + 5,
      top: Math.random() * 70 + 15,
      delay: Math.random() * 2,
      dur: 2 + Math.random() * 3,
    })),
  );
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            animation: `twinkle ${s.dur}s ${s.delay}s infinite`,
            pointerEvents: "none",
          }}
        />
      ))}
      {hearts.map((h) => (
        <div
          key={h.id}
          style={{
            position: "absolute",
            left: `${h.left}%`,
            top: `${h.top}%`,
            fontSize: "16px",
            animation: `float ${h.dur}s ${h.delay}s ease-in-out infinite`,
            pointerEvents: "none",
          }}
        >
          💕
        </div>
      ))}
      <div
        style={{
          textAlign: "center",
          zIndex: 10,
          padding: "0 24px",
          animation: "fadeIn 1s ease-out forwards",
        }}
      >
        <div
          style={{
            fontSize: "clamp(2rem,6vw,3.5rem)",
            fontFamily: "'Fredoka One', cursive",
            color: "#FFB3C6",
            animation: "glow 2s infinite",
            marginBottom: 12,
          }}
        >
          It's Akanksha's Birthday ✨
        </div>
        <div
          style={{
            fontSize: "1.1rem",
            color: "#C9B8FF",
            fontFamily: "Nunito, sans-serif",
            fontWeight: 600,
            marginBottom: 40,
          }}
        >
          A little something made with love 💕
        </div>
        <button
          type="button"
          className="btn-cute"
          data-ocid="opening.primary_button"
          style={{
            background: "linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)",
            color: "white",
            fontSize: "1.2rem",
            boxShadow: "0 8px 32px rgba(255,107,157,0.4)",
          }}
          onClick={onNext}
        >
          Open Your Card 🎀
        </button>
      </div>
      <TeddyBear message="Hiii Akanksha! I've been waiting for you! 🎉 Ready for something magical? ✨" />
    </div>
  );
}

/* ─────────────────────────────── SCENE 1 — CAKE ─────────────────────────────── */
function SceneCake({ onNext }: { onNext: () => void }) {
  const [blown, setBlown] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [allBlown, setAllBlown] = useState(false);

  const blowCandle = (i: number) => {
    const next = blown.map((v, idx) => (idx === i ? true : v));
    setBlown(next);
    if (next.every(Boolean)) {
      setShowConfetti(true);
      setAllBlown(true);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(160deg, #fff0f6 0%, #f3e8ff 50%, #e8f4ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingHearts count={6} />
      {showConfetti && <ConfettiExplosion />}
      <div
        style={{
          textAlign: "center",
          animation: "fadeIn 0.6s ease-out forwards",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontFamily: "'Fredoka One', cursive",
            fontSize: "2.2rem",
            color: "#FF6B9D",
            marginBottom: 8,
          }}
        >
          Make a Wish! 🌟
        </div>
        <div style={{ color: "#9966cc", fontWeight: 700, marginBottom: 24 }}>
          {allBlown
            ? "All candles blown! Wish granted! 🌈"
            : "Click each candle to blow it out 💨"}
        </div>
        {/* Birthday Cake SVG */}
        <svg
          role="img"
          aria-label="decorative illustration"
          width="280"
          height="320"
          viewBox="0 0 280 320"
          style={{
            animation: "float 3s ease-in-out infinite",
            cursor: "pointer",
          }}
        >
          {/* Bottom tier */}
          <ellipse cx="140" cy="265" rx="100" ry="18" fill="#c8a06e" />
          <rect x="42" y="220" width="196" height="50" rx="8" fill="#FFB3C6" />
          <path
            d="M42 228 Q70 218 98 228 Q126 238 154 228 Q182 218 210 228 Q238 218 238 228"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {/* Middle tier */}
          <ellipse cx="140" cy="218" rx="80" ry="14" fill="#b08040" />
          <rect x="62" y="178" width="156" height="44" rx="8" fill="#B8F0D8" />
          <path
            d="M62 185 Q85 176 108 185 Q131 194 154 185 Q177 176 200 185 Q218 176 218 185"
            stroke="white"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* Top tier */}
          <ellipse cx="140" cy="178" rx="60" ry="11" fill="#a07030" />
          <rect x="82" y="144" width="116" height="36" rx="8" fill="#FFD4B8" />
          <path
            d="M82 150 Q100 142 118 150 Q136 158 154 150 Q172 142 190 150 Q198 142 198 150"
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Stars decoration */}
          {["100,195", "140,195", "180,195", "110,240", "170,240"].map(
            (pos) => (
              <text
                key={pos}
                x={pos.split(",")[0]}
                y={pos.split(",")[1]}
                fontSize="14"
                textAnchor="middle"
              >
                ⭐
              </text>
            ),
          )}
          {/* Candles */}
          {[100, 116, 132, 148, 164].map((x, i) => (
            <g
              key={x}
              onClick={() => blowCandle(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter") blowCandle(i);
              }}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x - 5}
                y={118}
                width={10}
                height={26}
                rx={4}
                fill={i % 2 === 0 ? "#FFE066" : "#FF9EBC"}
              />
              {!blown[i] && (
                <>
                  <ellipse
                    cx={x}
                    cy={116}
                    rx={5}
                    ry={7}
                    fill="#FF6B35"
                    opacity={0.9}
                  />
                  <ellipse cx={x} cy={114} rx={3} ry={4} fill="#FFE066" />
                </>
              )}
              {blown[i] && (
                <text x={x} y={112} fontSize="12" textAnchor="middle">
                  💨
                </text>
              )}
            </g>
          ))}
          {/* Plate */}
          <ellipse cx="140" cy="283" rx="120" ry="12" fill="#f0e0c8" />
        </svg>
        {allBlown && (
          <button
            type="button"
            className="btn-cute"
            data-ocid="cake.primary_button"
            style={{
              background: "linear-gradient(135deg, #FFD4B8 0%, #FF9EBC 100%)",
              color: "white",
              marginTop: 20,
              animation: "bounceIn 0.5s ease-out forwards",
            }}
            onClick={onNext}
          >
            Cut the Cake! 🎂
          </button>
        )}
      </div>
      <TeddyBear
        message={
          allBlown
            ? "Yay!! Your wish is on its way! 🌟💫"
            : "Make a wish, Akanksha! 🕯️ Click the candles to blow them out! 💨"
        }
      />
    </div>
  );
}

/* ─────────────────────────────── SCENE 2 — CAKE CUTTING ─────────────────────────────── */
function SceneCakeCutting({ onNext }: { onNext: () => void }) {
  const [knifeY, setKnifeY] = useState(-80);
  const [sliceVisible, setSliceVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setKnifeY(60), 400);
    const t2 = setTimeout(() => setSliceVisible(true), 1600);
    const t3 = setTimeout(() => setBtnVisible(true), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(160deg, #fff0f6 0%, #f3e8ff 50%, #e8f4ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: "2rem",
          color: "#FF6B9D",
          marginBottom: 20,
          animation: "fadeIn 0.5s forwards",
        }}
      >
        Time to cut! 🔪
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        {/* Knife */}
        <svg
          role="img"
          aria-label="decorative illustration"
          width="40"
          height="120"
          style={{
            position: "absolute",
            left: "50%",
            top: knifeY,
            transform: "translateX(-50%) rotate(-30deg)",
            transition: "top 1s ease-in-out",
            zIndex: 20,
          }}
        >
          <rect x="16" y="0" width="8" height="70" rx="2" fill="#aaa" />
          <polygon points="12,70 28,70 22,110 18,110" fill="#ddd" />
          <rect x="12" y="68" width="16" height="8" rx="2" fill="#8B4513" />
        </svg>
        {/* Cake with cut */}
        <svg
          role="img"
          aria-label="decorative illustration"
          width="240"
          height="260"
          viewBox="0 0 240 260"
        >
          <ellipse cx="120" cy="225" rx="100" ry="12" fill="#f0e0c8" />
          <rect x="22" y="182" width="196" height="46" rx="8" fill="#FFB3C6" />
          <rect x="42" y="150" width="156" height="36" rx="8" fill="#B8F0D8" />
          <rect x="62" y="124" width="116" height="30" rx="8" fill="#FFD4B8" />
          {/* Cut line */}
          <line
            x1="120"
            y1="120"
            x2="120"
            y2="228"
            stroke="#c8a06e"
            strokeWidth="3"
            strokeDasharray="4"
          />
        </svg>
        {/* Cake Slice */}
        {sliceVisible && (
          <svg
            role="img"
            aria-label="decorative illustration"
            width="100"
            height="140"
            style={{
              position: "absolute",
              right: -120,
              top: 60,
              animation: "slideIn 0.5s ease-out forwards",
            }}
          >
            <polygon points="10,20 90,20 70,120 30,120" fill="#FFB3C6" />
            <polygon points="10,20 90,20 80,50 20,50" fill="#F0C8A0" />
            <text x="50" y="80" textAnchor="middle" fontSize="20">
              ❤️
            </text>
            <text x="50" y="105" textAnchor="middle" fontSize="16">
              💕
            </text>
          </svg>
        )}
      </div>
      {btnVisible && (
        <button
          type="button"
          className="btn-cute"
          data-ocid="cutting.primary_button"
          style={{
            background: "linear-gradient(135deg, #C9B8FF 0%, #8B7CF7 100%)",
            color: "white",
            marginTop: 32,
            animation: "bounceIn 0.5s ease-out forwards",
          }}
          onClick={onNext}
        >
          Now for your gifts! 🎁
        </button>
      )}
      <TeddyBear message="Ooooh cake time! 🍰 You deserve every sweet bite, Akanksha!" />
    </div>
  );
}

/* ─────────────────────────────── SCENE 3 — GIFTS ─────────────────────────────── */
const GIFT_MESSAGES = [
  "Why did teddy bear say no to dessert? She was already sweet enough — just like you! 🍭\n\nBut seriously... you make everyone around you sweeter just by being there. 💕",
  "What do you call someone who lights up every room just by walking in? Akanksha. 🌸\n\nEvery day feels brighter because you exist in it. ✨",
  "Why do stars shine brightest on your birthday? Because even they want to celebrate YOU! ⭐\n\nYou have no idea how much joy you bring just by being you. 🌟",
  "If happiness had a name, it would be Akanksha. 🌈\n\nI'm so grateful the universe decided to put you in my world. 💫",
];

const GIFT_COLORS = [
  { box: "#FFB3C6", ribbon: "#FFE066", lid: "#FF85B3" },
  { box: "#C9B8FF", ribbon: "#FFB3C6", lid: "#A89EF7" },
  { box: "#B8F0D8", ribbon: "#8B7CF7", lid: "#90D8B8" },
  { box: "#FFD4B8", ribbon: "#B8F0D8", lid: "#FFB890" },
];

function GiftBox({
  index,
  onOpen,
  opened,
}: { index: number; onOpen: () => void; opened: boolean }) {
  const c = GIFT_COLORS[index];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      {opened && (
        <div
          style={{
            background: "white",
            border: `2px solid ${c.ribbon}`,
            borderRadius: 16,
            padding: "12px 16px",
            maxWidth: 200,
            fontSize: "0.8rem",
            fontWeight: 700,
            color: "#5a3060",
            textAlign: "center",
            lineHeight: 1.5,
            animation: "bounceIn 0.4s ease-out forwards",
            whiteSpace: "pre-line",
          }}
        >
          {GIFT_MESSAGES[index]}
        </div>
      )}
      <svg
        role="img"
        aria-label="decorative illustration"
        width="100"
        height="110"
        viewBox="0 0 100 110"
        style={{
          cursor: "pointer",
          transition: "transform 0.2s",
          animation: opened
            ? "bounceIn 0.3s ease-out"
            : "float 3s ease-in-out infinite",
        }}
        onClick={!opened ? onOpen : undefined}
        onKeyDown={(e) => {
          if (!opened && (e.key === "Enter" || e.key === " ")) onOpen?.();
        }}
        data-ocid={`gift.item.${index + 1}`}
      >
        {/* Box */}
        <rect x="10" y="45" width="80" height="55" rx="6" fill={c.box} />
        {/* Ribbon vertical */}
        <rect
          x="44"
          y="45"
          width="12"
          height="55"
          fill={c.ribbon}
          opacity="0.8"
        />
        {/* Ribbon horizontal */}
        <rect
          x="10"
          y="63"
          width="80"
          height="12"
          fill={c.ribbon}
          opacity="0.8"
        />
        {/* Lid */}
        <rect
          x={opened ? 5 : 5}
          y={opened ? 10 : 28}
          width="90"
          height="22"
          rx="5"
          fill={c.lid}
          style={{ transition: "y 0.3s" }}
        />
        {/* Lid ribbon */}
        <rect
          x="42"
          y={opened ? 10 : 28}
          width="16"
          height="22"
          fill={c.ribbon}
          opacity="0.9"
        />
        {/* Bow */}
        <ellipse
          cx="50"
          cy={opened ? 12 : 30}
          rx="18"
          ry="10"
          fill={c.ribbon}
        />
        <ellipse
          cx="50"
          cy={opened ? 12 : 30}
          rx="10"
          ry="6"
          fill="white"
          opacity="0.4"
        />
        <circle cx="50" cy={opened ? 12 : 30} r="5" fill={c.lid} />
        {!opened && (
          <text x="50" y="80" textAnchor="middle" fontSize="22">
            🎁
          </text>
        )}
        {opened && (
          <text x="50" y="80" textAnchor="middle" fontSize="22">
            ✨
          </text>
        )}
      </svg>
    </div>
  );
}

function SceneGifts({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState([false, false, false, false]);
  const allOpened = opened.every(Boolean);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(160deg, #fce4ec 0%, #e8d5ff 50%, #d5eeff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingHearts count={5} />
      <div
        style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: "2.2rem",
          color: "#FF6B9D",
          marginBottom: 8,
          animation: "fadeIn 0.5s forwards",
        }}
      >
        Your Special Gifts! 🎁
      </div>
      <div style={{ color: "#7744aa", fontWeight: 700, marginBottom: 32 }}>
        Click each gift to open it!
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 24,
          maxWidth: 500,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <GiftBox
            key={`item-${i}`}
            index={i}
            opened={opened[i]}
            onOpen={() =>
              setOpened((prev) => prev.map((v, idx) => (idx === i ? true : v)))
            }
          />
        ))}
      </div>
      {allOpened && (
        <button
          type="button"
          className="btn-cute"
          data-ocid="gifts.primary_button"
          style={{
            background: "linear-gradient(135deg, #FFB3C6 0%, #C9B8FF 100%)",
            color: "white",
            marginTop: 32,
            animation: "bounceIn 0.5s ease-out forwards",
          }}
          onClick={onNext}
        >
          There's more! 💌
        </button>
      )}
      <TeddyBear message="I got you some special gifts! 🎁 Open them one by one! Each one has a little joke AND something real. 💕" />
    </div>
  );
}

/* ─────────────────────────────── SCENE 4 — ENVELOPES ─────────────────────────────── */
const ENV_MESSAGES = [
  "Your kindness is the kind that actually changes people. You give without thinking twice, and that is so rare and so beautiful. 💛",
  "You have this rare warmth that makes everyone feel at home. People feel safe around you, and that's an incredible gift. 🌸",
  "The way you care — quietly, deeply, genuinely — is one of the most beautiful things about you. You feel everything so fully. 💙",
  "You don't just brighten rooms, Akanksha. You brighten people's whole weeks, their whole months, sometimes their whole lives. 🌟",
];

const ENV_COLORS = ["#FFE4EC", "#F0E4FF", "#E4F4FF", "#E4FFE4"];
const ENV_ACCENT = ["#FF6B9D", "#8B7CF7", "#4FB0E8", "#4CC86A"];

function EnvelopeCard({
  index,
  onOpen,
  opened,
}: { index: number; onOpen: () => void; opened: boolean }) {
  const bg = ENV_COLORS[index];
  const accent = ENV_ACCENT[index];
  return (
    <div
      style={{
        background: bg,
        border: `2px solid ${accent}`,
        borderRadius: 16,
        padding: 20,
        width: 200,
        cursor: opened ? "default" : "pointer",
        boxShadow: `0 4px 16px ${accent}33`,
        transition: "transform 0.2s",
        animation: "fadeIn 0.4s ease-out forwards",
      }}
      data-ocid={`envelope.item.${index + 1}`}
      onClick={!opened ? onOpen : undefined}
      onKeyDown={(e) => {
        if (!opened && (e.key === "Enter" || e.key === " ")) onOpen?.();
      }}
      onMouseEnter={(e) => {
        if (!opened)
          (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      {!opened ? (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>💌</div>
          <div style={{ fontWeight: 800, color: accent, fontFamily: "Nunito" }}>
            Open me!
          </div>
          <div style={{ fontSize: "0.75rem", color: "#888", marginTop: 4 }}>
            A note just for you 💕
          </div>
        </div>
      ) : (
        <div style={{ animation: "bounceIn 0.4s ease-out forwards" }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>💌</div>
          <div
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#444",
              lineHeight: 1.6,
            }}
          >
            {ENV_MESSAGES[index]}
          </div>
        </div>
      )}
    </div>
  );
}

function SceneEnvelopes({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState([false, false, false, false]);
  const allOpened = opened.every(Boolean);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(160deg, #fff5f8 0%, #f5f0ff 50%, #f0f8ff 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingHearts count={4} />
      <div
        style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: "2.2rem",
          color: "#8B7CF7",
          marginBottom: 8,
          animation: "fadeIn 0.5s forwards",
        }}
      >
        Letters for Akanksha 💌
      </div>
      <div style={{ color: "#9966cc", fontWeight: 700, marginBottom: 32 }}>
        Things I really want you to know... ✨
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 20,
          maxWidth: 460,
        }}
      >
        {[0, 1, 2, 3].map((i) => (
          <EnvelopeCard
            key={`item-${i}`}
            index={i}
            opened={opened[i]}
            onOpen={() =>
              setOpened((prev) => prev.map((v, idx) => (idx === i ? true : v)))
            }
          />
        ))}
      </div>
      {allOpened && (
        <button
          type="button"
          className="btn-cute"
          data-ocid="envelopes.primary_button"
          style={{
            background: "linear-gradient(135deg, #C9B8FF 0%, #FF6B9D 100%)",
            color: "white",
            marginTop: 32,
            animation: "bounceIn 0.5s ease-out forwards",
          }}
          onClick={onNext}
        >
          Let's play a game! 🎮
        </button>
      )}
      <TeddyBear message="These are some things I really want you to know about yourself... 💌 Read each one slowly, okay?" />
    </div>
  );
}

/* ─────────────────────────────── SCENE 5 — WORD GAME ─────────────────────────────── */
const WORDS = ["KIND", "LOVELY", "BRIGHT", "SPECIAL"];
const WORD_COLORS = ["#FFB3C6", "#C9B8FF", "#B8F0D8", "#FFE066"];

function WordTile({
  letter,
  revealed,
  onClick,
}: { letter: string; revealed: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
      style={{
        width: 44,
        height: 52,
        background: revealed ? "white" : "#e0d0f8",
        border: `3px solid ${revealed ? "#FF6B9D" : "#b8a0e0"}`,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.4rem",
        fontFamily: "'Fredoka One',cursive",
        fontWeight: 900,
        color: revealed ? "#FF6B9D" : "transparent",
        cursor: revealed ? "default" : "pointer",
        transition: "all 0.2s",
        boxShadow: revealed
          ? "0 4px 12px rgba(255,107,157,0.3)"
          : "0 2px 6px rgba(0,0,0,0.1)",
        transform: revealed ? "scale(1.1)" : "scale(1)",
      }}
    >
      {revealed ? letter : "?"}
    </div>
  );
}

function SceneWordGame({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(
    WORDS.map((w) => Array(w.length).fill(false)),
  );
  const [wordComplete, setWordComplete] = useState(
    Array(WORDS.length).fill(false),
  );
  const allComplete = wordComplete.every(Boolean);

  const revealLetter = (wordIdx: number, letterIdx: number) => {
    const nextRevealed = revealed.map((wArr, wi) =>
      wArr.map((v, li) => (wi === wordIdx && li === letterIdx ? true : v)),
    );
    setRevealed(nextRevealed);
    if (nextRevealed[wordIdx].every(Boolean)) {
      setWordComplete((prev) => prev.map((v, i) => (i === wordIdx ? true : v)));
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Stars count={40} />
      <div
        style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: "2rem",
          color: "#FFB3C6",
          marginBottom: 8,
          animation: "fadeIn 0.5s forwards",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        Find the words that describe you! ✨
      </div>
      <div
        style={{
          color: "#C9B8FF",
          fontWeight: 700,
          marginBottom: 32,
          zIndex: 10,
        }}
      >
        Click each tile to reveal the letters!
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          alignItems: "center",
          zIndex: 10,
        }}
      >
        {WORDS.map((word, wi) => (
          <div key={word} style={{ textAlign: "center" }}>
            {wordComplete[wi] && (
              <div
                style={{
                  fontFamily: "'Fredoka One',cursive",
                  fontSize: "1.6rem",
                  color: WORD_COLORS[wi],
                  marginBottom: 6,
                  animation:
                    "riseUp 0s 0s forwards, bounceIn 0.4s ease-out forwards",
                  textShadow: `0 0 20px ${WORD_COLORS[wi]}`,
                }}
              >
                ✨ {word} ✨
              </div>
            )}
            <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
              {Array.from(word).map((letter, li) => {
                const tileKey = `${word}-tile-${String(li)}`;
                return (
                  <WordTile
                    key={tileKey}
                    letter={letter}
                    revealed={revealed[wi][li]}
                    onClick={() => revealLetter(wi, li)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {allComplete && (
        <div style={{ textAlign: "center", marginTop: 32, zIndex: 10 }}>
          <div
            style={{
              color: "#FFB3C6",
              fontWeight: 800,
              fontSize: "1.1rem",
              marginBottom: 20,
            }}
          >
            See?! That's YOU, Akanksha! Every. Single. Word. 💕
          </div>
          <button
            type="button"
            className="btn-cute"
            data-ocid="wordgame.primary_button"
            style={{
              background: "linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)",
              color: "white",
              animation: "bounceIn 0.5s ease-out forwards",
            }}
            onClick={onNext}
          >
            Teddy has one more surprise 🧸
          </button>
        </div>
      )}
      <TeddyBear
        message={
          allComplete
            ? "See?! That's YOU, Akanksha! Every. Single. Word. 💕"
            : "One last thing... let me spell out what you truly are! 🌟"
        }
      />
    </div>
  );
}

/* ─────────────────────────────── SCENE 6 — HUG ─────────────────────────────── */
function SceneHug({ onNext }: { onNext: () => void }) {
  const [hugged, setHugged] = useState(false);
  const [hearts, setHearts] = useState<number[]>([]);

  const handleHug = () => {
    setHugged(true);
    setHearts(Array.from({ length: 12 }, (_, i) => i));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(160deg, #ffe4ec 0%, #ffd4e8 50%, #ffc8f0 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FloatingHearts count={8} />
      {hearts.map((h) => (
        <div
          key={`heart-${h}`}
          style={{
            position: "absolute",
            left: `${30 + Math.random() * 40}%`,
            bottom: "40%",
            fontSize: `${16 + Math.random() * 20}px`,
            animation: `heartFloat ${1.5 + Math.random()}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
            pointerEvents: "none",
          }}
        >
          ❤️
        </div>
      ))}
      <div
        style={{
          fontFamily: "'Fredoka One',cursive",
          fontSize: "2.2rem",
          color: "#FF6B9D",
          marginBottom: 8,
          animation: "fadeIn 0.5s forwards",
        }}
      >
        Virtual Hug Time! 🤗
      </div>
      <div style={{ color: "#c44a8a", fontWeight: 700, marginBottom: 32 }}>
        {hugged
          ? "Hug sent with all my heart! 💖"
          : "Click the teddy for a big warm hug!"}
      </div>
      <div
        style={{
          cursor: "pointer",
          animation: hugged
            ? "pulse 0.5s ease-out 3"
            : "float 3s ease-in-out infinite",
        }}
        onClick={handleHug}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleHug();
        }}
        data-ocid="hug.canvas_target"
      >
        <TeddyBear
          message={
            hugged
              ? "Squeezing you tight, Akanksha! 💕 You're the best! 🌟"
              : "Come here, Akanksha... this one's from the heart. 🤗"
          }
          size={180}
          position="relative"
        />
      </div>
      {hugged && (
        <button
          type="button"
          className="btn-cute"
          data-ocid="hug.primary_button"
          style={{
            background: "linear-gradient(135deg, #C9B8FF 0%, #8B7CF7 100%)",
            color: "white",
            marginTop: 24,
            animation: "fadeIn 1s 0.5s forwards",
            opacity: 0,
          }}
          onClick={onNext}
        >
          There's one more thing... 💭
        </button>
      )}
    </div>
  );
}

/* ─────────────────────────────── SCENE 7 — CONFESSION ─────────────────────────────── */
function SceneConfession({ onNext }: { onNext: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

  const lines = [
    {
      text: "Akanksha…",
      style: {
        color: "white",
        fontSize: "2rem",
        fontFamily: "'Fredoka One',cursive",
      },
    },
    {
      text: "you are really special to me…",
      style: {
        color: "#C9B8FF",
        fontSize: "1.4rem",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700,
      },
    },
    {
      text: "and there's something I've been wanting to say…",
      style: {
        color: "#C9B8FF",
        fontSize: "1.2rem",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 700,
      },
    },
    {
      text: "for a long, long time…",
      style: {
        color: "#C9B8FF",
        fontSize: "1.1rem",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 600,
      },
    },
    {
      text: "❤️ I love you, Akanksha",
      style: {
        color: "#FF6B9D",
        fontSize: "clamp(2rem,5vw,3.2rem)",
        fontFamily: "'Fredoka One',cursive",
        textShadow: "0 0 30px #FF6B9D, 0 0 60px #FF6B9D",
        animation: "glow 1.5s infinite",
      },
    },
    {
      text: "Happy Birthday, my favorite person. 🌙",
      style: {
        color: "rgba(255,255,255,0.85)",
        fontSize: "1rem",
        fontFamily: "Nunito, sans-serif",
        fontWeight: 600,
      },
    },
  ];

  const timings = [1000, 3000, 5500, 8000, 11000, 13000];

  useEffect(() => {
    const timers = timings.map((delay, i) =>
      setTimeout(() => setVisibleLines((v) => Math.max(v, i + 1)), delay),
    );
    const btnTimer = setTimeout(() => setShowBtn(true), 15000);
    const heartInterval = setInterval(() => {
      setFloatingHearts((prev) => [...prev.slice(-20), Date.now()]);
    }, 800);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(btnTimer);
      clearInterval(heartInterval);
    };
  }, []);

  // Rose petals
  const [petals] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      dur: 6 + Math.random() * 6,
      size: 12 + Math.random() * 16,
    })),
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "radial-gradient(ellipse at center, #1a0a2e 0%, #0a0015 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      <Stars count={60} />
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-30px",
            fontSize: p.size,
            animation: `petalFall ${p.dur}s ${p.delay}s linear infinite`,
            pointerEvents: "none",
            opacity: 0.8,
          }}
        >
          🌸
        </div>
      ))}
      {floatingHearts.map((h) => (
        <div
          key={`heart-${h}`}
          style={{
            position: "absolute",
            left: `${20 + Math.random() * 60}%`,
            bottom: "20%",
            fontSize: `${14 + Math.random() * 12}px`,
            animation: "heartFloat 2s ease-out forwards",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          ❤️
        </div>
      ))}
      <div
        style={{
          maxWidth: 560,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        {lines.slice(0, visibleLines).map((line) => (
          <div
            key={line.text.slice(0, 15)}
            style={{
              ...line.style,
              animation: "fadeIn 0.8s ease-out forwards",
              lineHeight: 1.4,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
      {showBtn && (
        <button
          type="button"
          className="btn-cute"
          data-ocid="confession.primary_button"
          style={{
            background: "linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)",
            color: "white",
            marginTop: 40,
            animation: "fadeIn 0.8s ease-out forwards",
            zIndex: 10,
          }}
          onClick={onNext}
        >
          Let's celebrate! 🎆
        </button>
      )}
      <div style={{ position: "absolute", bottom: 16, left: 16, zIndex: 20 }}>
        <TeddyBear message="" size={80} teary position="relative" />
      </div>
    </div>
  );
}

/* ─────────────────────────────── SCENE 8 — FINALE ─────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const colors = [
    "#FFB3C6",
    "#C9B8FF",
    "#B8F0D8",
    "#FFD4B8",
    "#FFE066",
    "#FF6B9D",
    "#8B7CF7",
  ];

  const launch = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = Math.random() * canvas.width;
    const y = canvas.height * (0.2 + Math.random() * 0.4);
    const color = colors[Math.floor(Math.random() * colors.length)];
    for (let i = 0; i < 50; i++) {
      const angle = (Math.PI * 2 * i) / 50;
      const speed = 2 + Math.random() * 4;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 60 + Math.random() * 40,
        color,
        size: 2 + Math.random() * 3,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    launch();
    const interval = setInterval(launch, 1200);

    const animate = () => {
      ctx.fillStyle = "rgba(10,0,21,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.vx *= 0.99;
        p.life -= 1 / p.maxLife;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      clearInterval(interval);
      cancelAnimationFrame(animRef.current);
    };
  }, [launch]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

function SceneFinale({ onRestart }: { onRestart: () => void }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg, #0F0C29 0%, #302B63 50%, #24243e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <FireworksCanvas />
      <ConfettiExplosion />
      <div style={{ textAlign: "center", zIndex: 10, padding: "0 24px" }}>
        <div
          style={{
            fontFamily: "'Fredoka One',cursive",
            fontSize: "clamp(2rem,7vw,4rem)",
            color: "#FFB3C6",
            animation: "glow 2s infinite, fadeIn 1s ease-out forwards",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Happy Birthday Akanksha! 🎂
        </div>
        <div
          style={{
            color: "#C9B8FF",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: 40,
          }}
        >
          Wishing you all the happiness in the universe 💫✨
        </div>
        <button
          type="button"
          className="btn-cute"
          data-ocid="finale.primary_button"
          style={{
            background: "linear-gradient(135deg, #C9B8FF 0%, #8B7CF7 100%)",
            color: "white",
          }}
          onClick={onRestart}
        >
          Start Over 🔄
        </button>
      </div>
      <div style={{ position: "fixed", bottom: 16, right: 16, zIndex: 200 }}>
        <TeddyBear
          message="I hope this made you smile, Akanksha. You deserve all the happiness in the world. Happy Birthday! 🎉💕"
          size={150}
          isWaving
          position="relative"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────── FOOTER ─────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 4,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "0.7rem",
        color: "rgba(255,255,255,0.4)",
        zIndex: 50,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      © {year}. Built with ❤️ using{" "}
      <a
        href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
        style={{ color: "rgba(255,255,255,0.5)", pointerEvents: "all" }}
      >
        caffeine.ai
      </a>
    </div>
  );
}

/* ─────────────────────────────── APP ─────────────────────────────── */
export default function App() {
  const [scene, setScene] = useState(0);

  const next = () => setScene((s) => s + 1);

  return (
    <>
      <style>{globalStyles}</style>
      {scene === 0 && <SceneOpening onNext={next} />}
      {scene === 1 && <SceneCake onNext={next} />}
      {scene === 2 && <SceneCakeCutting onNext={next} />}
      {scene === 3 && <SceneGifts onNext={next} />}
      {scene === 4 && <SceneEnvelopes onNext={next} />}
      {scene === 5 && <SceneWordGame onNext={next} />}
      {scene === 6 && <SceneHug onNext={next} />}
      {scene === 7 && <SceneConfession onNext={next} />}
      {scene === 8 && <SceneFinale onRestart={() => setScene(0)} />}
      <Footer />
    </>
  );
}
