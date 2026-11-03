import React from "react";
import { CARD_H, CYAN, GRAY, MUTED, WHITE } from "./theme";
import { SLAM } from "./timing";

const shell: React.CSSProperties = {
  width: 936,
  height: CARD_H,
  borderRadius: 28,
  overflow: "hidden",
  position: "relative",
  background: "linear-gradient(180deg, #1c2836 0%, #121b27 38%, #0e1620 100%)",
  border: "1px solid rgba(170,225,255,0.42)",
  boxShadow:
    "0 28px 70px rgba(0,0,0,0.48), inset 0 1px 0 rgba(255,255,255,0.22)",
};

export const CardShell: React.FC<{
  url: string;
  frame: number;
  children: React.ReactNode;
}> = ({ url, frame, children }) => {
  const p = (frame % 48) / 48;
  const x = -720 + p * 2100;
  return (
    <div style={shell}>
      <div
        style={{
          height: 74,
          background: "linear-gradient(180deg,#2a3848,#1c2734)",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 10,
        }}
      >
        <Dot c="#ff5f57" />
        <Dot c="#febc2e" />
        <Dot c="#28c840" />
        <div
          style={{
            marginLeft: 12,
            flex: 1,
            height: 40,
            borderRadius: 10,
            background: "#0d141c",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            padding: "0 16px",
            color: "#c5d2e0",
            fontSize: 22,
          }}
        >
          {url}
        </div>
      </div>
      <div
        style={{
          position: "relative",
          height: CARD_H - 74,
          padding: "28px 32px 24px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 260,
          left: x,
          background:
            "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.16), rgba(255,255,255,0))",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 26%, rgba(255,255,255,0) 72%, rgba(0,0,0,0.22) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

const Dot: React.FC<{ c: string }> = ({ c }) => (
  <div style={{ width: 14, height: 14, borderRadius: 99, background: c }} />
);

const Kicker: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      color: CYAN,
      fontSize: 26,
      fontWeight: 700,
      letterSpacing: 2.4,
    }}
  >
    {children}
  </div>
);

export const AnthropicCard: React.FC<{ t: number }> = ({ t }) => {
  const hot = t >= 17.45 && t < 20.05;
  return (
    <>
      <Kicker>ANTHROPIC DOCS · 公测</Kicker>
      <div style={{ marginTop: 18, fontSize: 64, fontWeight: 700, color: WHITE, lineHeight: 1.05 }}>
        线程
      </div>
      <div style={{ marginTop: 10, fontSize: 32, color: "#d5e0ea", fontWeight: 700 }}>
        长对话不用整包再送
      </div>
      <div style={{ marginTop: 10, fontSize: 30, color: GRAY, lineHeight: 1.45 }}>
        服务端接着记。下一轮只传新话和编号。
      </div>
      <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
        <Tile label="首字" value="约少三成五" hot={hot} />
        <Tile label="闲置" value="约 5 分钟" hot={false} />
        <Tile label="计费" value="不变" hot={false} />
      </div>
      <div
        style={{
          marginTop: "auto",
          borderRadius: 16,
          background: "#0c141c",
          border: "1px solid rgba(61,220,255,0.18)",
          padding: "22px 24px",
          color: "#d5e2ee",
          fontSize: 28,
          lineHeight: 1.55,
          fontFamily: '"DejaVu Sans Mono","WenQuanYi Micro Hei",monospace',
        }}
      >
        <div style={{ color: MUTED, fontSize: 22, marginBottom: 8 }}>POST /v1/messages</div>
        <div>
          thread_id <span style={{ color: CYAN }}>thd_····</span>
        </div>
        <div>
          content <span style={{ color: WHITE }}>只传这一轮的新话</span>
        </div>
      </div>
    </>
  );
};

const Tile: React.FC<{ label: string; value: string; hot: boolean }> = ({ label, value, hot }) => (
  <div
    style={{
      flex: 1,
      height: 168,
      borderRadius: 16,
      background: hot ? "rgba(61,220,255,0.16)" : "#162230",
      border: hot ? "2px solid #3DDCFF" : "1px solid rgba(61,220,255,0.22)",
      boxShadow: hot ? "0 0 24px rgba(61,220,255,0.28)" : "none",
      padding: "18px 16px",
    }}
  >
    <div style={{ color: MUTED, fontSize: 24 }}>{label}</div>
    <div style={{ marginTop: 12, color: CYAN, fontSize: 36, fontWeight: 700, lineHeight: 1.2 }}>{value}</div>
  </div>
);

export const LongCatCard: React.FC<{ t: number }> = ({ t }) => {
  const sweepOn = t >= 29.05 && t <= 31.15;
  const p = sweepOn ? (t - 29.05) / 2.1 : -1;
  return (
    <>
      <Kicker>MEITUAN · MODEL CARD</Kicker>
      <div style={{ marginTop: 14, fontSize: 60, fontWeight: 700, color: WHITE }}>LongCat 2.5</div>
      <div style={{ marginTop: 6, fontSize: 30, color: GRAY }}>国产算力训出来的大块头 · 接口已开</div>
      <div style={{ marginTop: 28 }}>
        <Row k="总参" v="约 1.6 万亿" hero sweep={p} />
        <Row k="真正开动" v="约 480 亿" hero={false} sweep={-1} />
        <Row k="主打" v="长程智能体" hero={false} sweep={-1} />
        <Row k="代码" v="整项目写代码" hero={false} sweep={-1} />
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: "auto" }}>
        <Chip>长程智能体</Chip>
        <Chip>整项目代码</Chip>
        <Chip>接口已开</Chip>
      </div>
    </>
  );
};

const Row: React.FC<{ k: string; v: string; hero: boolean; sweep: number }> = ({ k, v, hero, sweep }) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: 108,
      marginBottom: 12,
      padding: "0 22px",
      borderRadius: 16,
      background: "#121c28",
      border: "1px solid rgba(61,220,255,0.18)",
    }}
  >
    {sweep >= 0 && sweep <= 1 ? (
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 180,
          left: `${-20 + sweep * 120}%`,
          background: "linear-gradient(90deg, rgba(61,220,255,0), rgba(61,220,255,0.35), rgba(61,220,255,0))",
        }}
      />
    ) : null}
    <div style={{ color: MUTED, fontSize: 28, position: "relative" }}>{k}</div>
    <div
      style={{
        position: "relative",
        color: hero ? CYAN : WHITE,
        fontSize: hero ? 48 : 40,
        fontWeight: 700,
      }}
    >
      {v}
    </div>
  </div>
);

const Chip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      padding: "10px 16px",
      borderRadius: 999,
      background: "rgba(61,220,255,0.1)",
      color: "#d7f6ff",
      fontSize: 26,
      fontWeight: 700,
      border: "1px solid rgba(61,220,255,0.35)",
    }}
  >
    {children}
  </div>
);

export const SenseCard: React.FC = () => (
  <>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <Kicker>SENSETIME · 正式版</Kicker>
        <div style={{ marginTop: 12, fontSize: 46, fontWeight: 700, color: WHITE, lineHeight: 1.15 }}>
          SenseNova
          <br />
          6.8 Flash
        </div>
      </div>
      <div
        style={{
          marginTop: 8,
          padding: "10px 16px",
          borderRadius: 999,
          background: CYAN,
          color: "#06202a",
          fontSize: 26,
          fontWeight: 700,
        }}
      >
        即日起可体验
      </div>
    </div>
    <div
      style={{
        marginTop: 22,
        flex: 1,
        minHeight: 0,
        borderRadius: 18,
        display: "flex",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ width: 230, background: "#101820", padding: "18px 14px" }}>
        <Nav on>办公协作</Nav>
        <Nav on={false}>动态 PPT</Nav>
        <Nav on={false}>海报</Nav>
        <Nav on={false}>设计工具</Nav>
      </div>
      <div style={{ flex: 1, background: "#182330", padding: 18, display: "flex", gap: 14 }}>
        <div
          style={{
            flex: 1.3,
            borderRadius: 12,
            background: "linear-gradient(180deg,#0e1a24,#122838)",
            padding: 20,
            boxShadow: "inset 0 0 0 1px rgba(61,220,255,0.2)",
          }}
        >
          <div style={{ color: MUTED, fontSize: 20 }}>动态 PPT</div>
          <div style={{ marginTop: 16, color: WHITE, fontSize: 32, fontWeight: 700, lineHeight: 1.25 }}>
            跨会话
            <br />
            办公协作
          </div>
          <div style={{ marginTop: 28 }}>
            <Bar w="78%" />
            <Bar w="56%" />
            <Bar w="88%" />
          </div>
        </div>
        <div
          style={{
            width: 210,
            borderRadius: 12,
            background: "linear-gradient(165deg,#123246 0%,#1a4e62 42%,#0d2230 100%)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ color: CYAN, fontSize: 20, fontWeight: 700 }}>海报</div>
          <div style={{ color: WHITE, fontSize: 30, fontWeight: 700, lineHeight: 1.25 }}>
            即日起
            <br />
            可体验
          </div>
          <div style={{ height: 8, borderRadius: 99, background: CYAN, width: "70%" }} />
        </div>
      </div>
    </div>
    <div style={{ marginTop: 22, color: GRAY, fontSize: 28 }}>接设计工具 · 动态 PPT / 海报都能交</div>
  </>
);

const Nav: React.FC<{ children: React.ReactNode; on: boolean }> = ({ children, on }) => (
  <div
    style={{
      height: 64,
      borderRadius: 12,
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      padding: "0 14px",
      background: on ? "rgba(61,220,255,0.16)" : "transparent",
      color: on ? CYAN : "#c5d0da",
      fontSize: 26,
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);

const Bar: React.FC<{ w: string }> = ({ w }) => (
  <div style={{ height: 18, borderRadius: 8, background: "#1e3344", marginBottom: 12 }}>
    <div style={{ width: w, height: "100%", borderRadius: 8, background: "linear-gradient(90deg,#1499C9,#3DDCFF)" }} />
  </div>
);

export const QovestCard: React.FC = () => (
  <>
    <Kicker>ALIYUN · 邀请测</Kicker>
    <div style={{ marginTop: 16, fontSize: 64, fontWeight: 700, color: WHITE }}>Qovest</div>
    <div style={{ marginTop: 6, fontSize: 34, color: "#d5e0ea", fontWeight: 700 }}>投研工作台</div>
    <div style={{ marginTop: 26 }}>
      <Feature>一句话出研报</Feature>
      <Feature>标的可持续跟踪</Feature>
    </div>
    <div
      style={{
        marginTop: "auto",
        borderRadius: 20,
        background: "linear-gradient(180deg,#102833,#0e1c28)",
        border: "1px solid rgba(61,220,255,0.4)",
        padding: "28px 32px 24px",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
      }}
    >
      <div style={{ color: MUTED, fontSize: 26 }}>个人订阅 · 大约</div>
      <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 12 }}>
        <div style={{ color: CYAN, fontSize: 78, fontWeight: 700, letterSpacing: -1 }}>99–199</div>
        <div style={{ color: WHITE, fontSize: 36, fontWeight: 700 }}>元/月</div>
      </div>
      <div style={{ marginTop: 8, color: GRAY, fontSize: 28 }}>想试用，窗口在邀测</div>
    </div>
  </>
);

const Feature: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
    <div
      style={{
        width: 18,
        height: 18,
        borderRadius: 99,
        background: CYAN,
        boxShadow: "0 0 12px rgba(61,220,255,0.8)",
      }}
    />
    <div style={{ color: WHITE, fontSize: 34, fontWeight: 700 }}>{children}</div>
  </div>
);

export const GdpxCard: React.FC<{ t: number }> = ({ t }) => {
  const appear = t < 81.2 ? 0 : t < 81.48 ? (t - 81.2) / 0.28 : 1;
  const hit = t >= SLAM && t < SLAM + 0.42;
  const shake = hit ? Math.sin((t - SLAM) * 90) * 10 * (1 - (t - SLAM) / 0.42) : 0;
  const flash = hit ? 1 - (t - SLAM) / 0.42 : 0;
  return (
    <div
      style={{
        transform: `translateX(${shake}px)`,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Kicker>SEMIANALYSIS · EVAL</Kicker>
      <div style={{ marginTop: 14, fontSize: 52, fontWeight: 700, color: WHITE }}>GDPx 真实工作评测</div>
      <div style={{ marginTop: 8, fontSize: 30, color: GRAY }}>刻度 0–100 · 最强大约停在这里</div>
      <div style={{ marginTop: 36, display: "flex", alignItems: "baseline", gap: 8 }}>
        <div
          style={{
            fontSize: 168,
            fontWeight: 700,
            color: WHITE,
            lineHeight: 0.9,
            letterSpacing: -4,
            textShadow: flash > 0 ? `0 0 ${28 * flash}px #3DDCFF` : "none",
          }}
        >
          12
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, color: CYAN }}>%</div>
      </div>
      <div style={{ marginTop: 28, position: "relative", height: 36, borderRadius: 99, background: "#1a2836" }}>
        <div
          style={{
            width: `${12 * appear}%`,
            height: "100%",
            borderRadius: 99,
            background: flash > 0.4 ? "#F4FDFF" : "linear-gradient(90deg,#1499C9,#3DDCFF)",
            boxShadow: "0 0 18px rgba(61,220,255,0.55)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, color: MUTED, fontSize: 24 }}>
        <span>0</span>
        <span>最强约 12%</span>
        <span>100%</span>
      </div>
      <div
        style={{
          marginTop: "auto",
          padding: "18px 20px",
          borderRadius: 14,
          background: "#101820",
          color: "#d5e0ea",
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        演示再好看，活还没干完
      </div>
    </div>
  );
};
