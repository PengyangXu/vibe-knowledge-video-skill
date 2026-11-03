import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { fsec, xorOf, sceneOf } from "./timing";
import {
  CYAN,
  Choice,
  FS,
  Flash,
  GOLD,
  Glass,
  IVORY,
  MINT,
  SANS,
  SERIF,
  STAMP,
  ButtonDock,
  appear,
  exitDrop,
  flashAlpha,
  pulse,
  rangeOpacity,
  sceneOpacity,
  shock,
} from "./ui";

const shadow = "0 8px 28px rgba(0,0,0,0.45)";

const Eyebrow: React.FC<{ text: string; color?: string }> = ({ text, color }) => (
  <div
    style={{
      position: "absolute",
      top: 148,
      left: 64,
      right: 64,
      fontFamily: SANS,
      fontSize: FS.corner,
      letterSpacing: 6,
      color: color || "rgba(247,242,232,0.78)",
    }}
  >
    {text}
  </div>
);

export const S01: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S01");
  const xor = xorOf("S01");
  const o = sceneOpacity(frame, sc.from, sc.to, true, false);
  const btn = rangeOpacity(frame, xor.buttons);
  const tear = appear(frame, fsec(1.15), 14);
  const cross = appear(frame, fsec(2.25), 12);
  const stamp = appear(frame, fsec(4.22), 8);
  const title = appear(frame, fsec(0.4), 12);
  const hit = shock(frame, fsec(4.28), 14);
  if (o <= 0.001) return null;
  const wobble = Math.sin(frame * 1.3) * 7 * (1 - btn);
  return (
    <AbsoluteFill style={{ opacity: o, transform: "translate(" + hit + "px," + hit * 0.35 + "px)" }}>
      <div style={{ position: "absolute", left: 300, top: 470, width: 480, height: 520, perspective: 900 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            background: "linear-gradient(180deg, #f6f1e6, #ddd4c4)",
            boxShadow: "0 30px 60px rgba(0,0,0,0.35)",
          }}
        >
          <div style={{ height: 92, borderRadius: "22px 22px 0 0", background: "linear-gradient(180deg, #d24b40, #a3332c)" }} />
          <div style={{ marginTop: 28, textAlign: "center", fontFamily: SERIF, fontSize: 112, fontWeight: 700, color: "#1b1b1b" }}>
            11.03
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 22,
            background: "linear-gradient(180deg, #f8f4ec, #e7dfd0)",
            transformOrigin: "top center",
            transform: "rotateX(" + tear * 78 + "deg) translateY(" + tear * -30 + "px)",
            opacity: 1 - tear * 0.92,
            boxShadow: "0 16px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ height: 92, borderRadius: "22px 22px 0 0", background: "#8d3b34" }} />
          <div style={{ marginTop: 54, textAlign: "center", fontFamily: SERIF, fontSize: 92, color: "#6d675e" }}>11.02</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 430,
          textAlign: "center",
          fontFamily: SERIF,
          fontSize: 72,
          color: "rgba(247,242,232,0.55)",
          letterSpacing: 8,
          opacity: tear * (1 - stamp),
          textShadow: shadow,
        }}
      >
        新模型
        <svg width="420" height="120" style={{ position: "absolute", left: "50%", marginLeft: -210, top: -10 }}>
          <line x1="40" y1="20" x2={40 + cross * 340} y2={20 + cross * 80} stroke={STAMP} strokeWidth="10" strokeLinecap="round" />
          <line x1="380" y1="20" x2={380 - cross * 340} y2={20 + cross * 80} stroke={STAMP} strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>
      <div
        style={{
          position: "absolute",
          left: 560,
          top: 800,
          width: 230,
          height: 230,
          borderRadius: "50%",
          border: "10px solid " + STAMP,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: STAMP,
          fontFamily: SERIF,
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: 8,
          transform: "rotate(-14deg) scale(" + (1.6 - stamp * 0.6) + ")",
          opacity: stamp,
          boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
          background: "rgba(226,59,50,0.08)",
        }}
      >
        落地
      </div>
      <div style={{ position: "absolute", top: 1040, left: 60, right: 60, textAlign: "center", opacity: title }}>
        <div style={{ fontFamily: SERIF, fontSize: FS.hero, fontWeight: 700, color: IVORY, textShadow: shadow }}>11.03 · 没开箱</div>
        <div style={{ marginTop: 16, fontFamily: SANS, fontSize: FS.sub, color: GOLD }}>落地动静不小</div>
      </div>
      <ButtonDock opacity={btn} drop={exitDrop(frame, xor.buttons)} shake={wobble}>
        <Choice label="今天记啥？" state="idle" press={0} />
      </ButtonDock>
      <Flash alpha={flashAlpha(frame, fsec(4.28))} />
    </AbsoluteFill>
  );
};

export const S02: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S02");
  const xor = xorOf("S02");
  const o = sceneOpacity(frame, sc.from, sc.to, false, false);
  const btn = rangeOpacity(frame, xor.buttons);
  const conc = rangeOpacity(frame, xor.conclusion, true);
  const stack = appear(frame, fsec(8.4), 10);
  const collapse = appear(frame, fsec(16.2), 16);
  const numIn = appear(frame, fsec(25.75), 10);
  const bill = appear(frame, fsec(33.4), 8);
  const idle = appear(frame, fsec(35.05), 8);
  const pick = appear(frame, fsec(14.15), 8);
  const title = appear(frame, fsec(7.3), 12);
  if (o <= 0.001) return null;
  const words = ["旧话", "整包", "再送", "旧话", "整包", "再送"];
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Eyebrow text="第一条 · Anthropic" />
      <div
        style={{
          position: "absolute",
          top: 210,
          left: 64,
          right: 64,
          textAlign: "center",
          opacity: title,
          fontFamily: SERIF,
          fontSize: FS.hero,
          fontWeight: 700,
          color: IVORY,
          textShadow: shadow,
        }}
      >
        对话「线程」公测
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - collapse }}>
        <div style={{ position: "absolute", top: 390, left: 0, right: 0, textAlign: "center", fontFamily: SANS, fontSize: FS.tag, color: GOLD, letterSpacing: 4, opacity: stack }}>
          整包再送
        </div>
        {words.map((w, i) => {
          const y = 820 - i * 68 * (0.35 + stack * 0.65);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 180 + (i % 2) * 80,
                top: y,
                width: 520,
                padding: "16px 22px",
                borderRadius: 22,
                background: "linear-gradient(180deg, rgba(255,255,255,0.16), rgba(12,20,32,0.72))",
                border: "1px solid rgba(255,255,255,0.18)",
                color: IVORY,
                fontFamily: SANS,
                fontSize: 36,
                opacity: stack * (1 - i * 0.08),
                boxShadow: "0 10px 24px rgba(0,0,0,0.25)",
              }}
            >
              {w}
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", left: 80, right: 80, top: 980, height: 8, borderRadius: 8, background: CYAN, opacity: collapse, boxShadow: "0 0 18px " + CYAN }} />
      <div
        style={{
          position: "absolute",
          left: 80 + ((frame * 8) % 760),
          top: 948,
          padding: "10px 18px",
          borderRadius: 16,
          background: "rgba(185,243,203,0.9)",
          color: "#102018",
          fontFamily: SANS,
          fontWeight: 700,
          fontSize: 32,
          opacity: collapse,
        }}
      >
        新话
      </div>
      <div
        style={{
          position: "absolute",
          right: 64,
          top: 390,
          width: 430,
          opacity: numIn,
          transform: "translateX(" + (1 - numIn) * 80 + "px)",
        }}
      >
        <Glass glow="rgba(154,223,255,0.35)">
          <div style={{ padding: "26px 12px 30px", textAlign: "center" }}>
            <div style={{ fontFamily: SANS, fontSize: FS.question, color: CYAN }}>长请求</div>
            <div style={{ fontFamily: SERIF, fontSize: 128, fontWeight: 700, color: IVORY, lineHeight: 1.05 }}>−35%</div>
            <div style={{ fontFamily: SANS, fontSize: FS.sub, color: GOLD, marginTop: 6 }}>首字约快</div>
          </div>
        </Glass>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1008,
          left: 70,
          right: 70,
          textAlign: "center",
          fontFamily: SERIF,
          fontSize: FS.question,
          color: IVORY,
          opacity: btn,
          textShadow: shadow,
        }}
      >
        以前慢在哪？
      </div>
      <ButtonDock opacity={btn} drop={exitDrop(frame, xor.buttons)}>
        <Choice label="整包重传历史" state={pick > 0.55 ? "hot" : "idle"} press={pick > 0.55 ? 1 : 0} />
        <Choice label="网速差" state={pick > 0.55 ? "dim" : "idle"} press={0} />
      </ButtonDock>
      <div style={{ position: "absolute", left: 64, right: 64, top: 1340, opacity: conc, transform: "translateY(" + (1 - conc) * 30 + "px)" }}>
        <Glass>
          <div style={{ padding: "28px 24px", textAlign: "center", fontFamily: SERIF, fontSize: FS.hero, fontWeight: 700, color: IVORY }}>
            服务端记历史 · 只传新话
          </div>
        </Glass>
      </div>
      <div
        style={{
          position: "absolute",
          left: 64,
          right: 64,
          top: 1560,
          textAlign: "center",
          fontFamily: SANS,
          fontSize: FS.corner,
          color: "rgba(247,242,232,0.86)",
          letterSpacing: 1,
          opacity: Math.max(bill, idle),
        }}
      >
        闲置约 5 分钟过期｜计费不变
      </div>
    </AbsoluteFill>
  );
};

export const S03: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S03");
  const xor = xorOf("S03");
  const o = sceneOpacity(frame, sc.from, sc.to, false, false);
  const btn = rangeOpacity(frame, xor.buttons);
  const conc = rangeOpacity(frame, xor.conclusion);
  const zoomL = pulse(frame, fsec(39.9), 28);
  const zoomR = pulse(frame, fsec(41.15), 28);
  const proof = appear(frame, fsec(47.3), 12);
  const bounty = appear(frame, fsec(56.4), 12);
  const money = appear(frame, fsec(61.7), 10);
  const mult = appear(frame, fsec(65.4), 8);
  const official = appear(frame, fsec(67.1), 8);
  const gather = appear(frame, fsec(48.2), 18);
  const hit = shock(frame, fsec(65.45), 10);
  if (o <= 0.001) return null;
  const showSplit = proof < 0.5 && bounty < 0.2;
  return (
    <AbsoluteFill style={{ opacity: o, transform: "translate(" + hit + "px,0)" }}>
      <Eyebrow text="第二条 · OpenAI" />
      {showSplit ? (
        <div style={{ position: "absolute", left: 48, right: 48, top: 250, display: "flex", gap: 20, opacity: 1 - conc }}>
          <div style={{ flex: 1, transform: "scale(" + (1 + zoomL * 0.06) + ")" }}>
            <Glass>
              <div style={{ padding: "36px 18px 40px", textAlign: "center" }}>
                <div style={{ fontFamily: SERIF, fontSize: 72, color: IVORY, fontWeight: 700 }}>约 1 万</div>
                <div style={{ marginTop: 12, fontFamily: SANS, fontSize: FS.tag, color: GOLD }}>流体证明</div>
              </div>
            </Glass>
          </div>
          <div style={{ flex: 1, transform: "scale(" + (1 + zoomR * 0.06) + ")" }}>
            <Glass>
              <div style={{ padding: "36px 18px 40px", textAlign: "center" }}>
                <div style={{ fontFamily: SERIF, fontSize: 64, color: IVORY, fontWeight: 700 }}>赏金</div>
                <div style={{ marginTop: 12, fontFamily: SANS, fontSize: FS.tag, color: GOLD }}>安全加码</div>
              </div>
            </Glass>
          </div>
        </div>
      ) : null}
      <div style={{ position: "absolute", left: 48, right: 48, top: 700, opacity: conc }}>
        <Glass>
          <div style={{ padding: "36px 20px", textAlign: "center", fontFamily: SERIF, fontSize: FS.hero, fontWeight: 700, color: IVORY }}>
            两手：材料 + 安全加码
          </div>
        </Glass>
      </div>
      <ButtonDock opacity={btn} drop={exitDrop(frame, xor.buttons)}>
        <Choice label="看证明" state={zoomL > 0.45 ? "hot" : "idle"} press={zoomL} />
        <Choice label="看赏金" state={zoomR > 0.45 ? "hot" : "idle"} press={zoomR} />
      </ButtonDock>
      <AbsoluteFill style={{ opacity: proof * (1 - bounty) }}>
        <svg width={1080} height={1920} style={{ position: "absolute" }}>
          {new Array(72).fill(0).map((_, i) => {
            const sx = 80 + random("psx" + i) * 920;
            const sy = 360 + random("psy" + i) * 700;
            const tx = 300 + random("ptx" + i) * 480;
            const ty = 430 + random("pty" + i) * 520;
            const x = sx + (tx - sx) * gather;
            const y = sy + (ty - sy) * gather;
            return <circle key={i} cx={x} cy={y} r={3 + (i % 3)} fill={i % 5 === 0 ? GOLD : IVORY} opacity={0.75} />;
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            left: 250,
            top: 470,
            width: 580,
            height: 460,
            borderRadius: 18,
            background: "linear-gradient(180deg, #f3ead6, #d9c7a2)",
            boxShadow: "0 30px 50px rgba(0,0,0,0.35)",
            opacity: gather,
            transform: "rotate(-2deg)",
          }}
        >
          <div style={{ height: 28, background: "linear-gradient(90deg, #8d6a32, #e7c48a, #8d6a32)" }} />
          <div style={{ padding: 28, fontFamily: SERIF, fontSize: 42, color: "#2a2418" }}>流体证明材料</div>
        </div>
        <div style={{ position: "absolute", top: 1040, left: 60, right: 60, textAlign: "center" }}>
          <div style={{ fontFamily: SERIF, fontSize: 120, fontWeight: 700, color: IVORY, textShadow: shadow }}>约 1 万</div>
          <div style={{ fontFamily: SANS, fontSize: FS.sub, color: GOLD, marginTop: 8 }}>智能体 · 流体证明材料</div>
          <div style={{ fontFamily: SANS, fontSize: FS.corner, color: "rgba(247,242,232,0.8)", marginTop: 18 }}>未独立确认 · 先当材料</div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: bounty }}>
        <div style={{ position: "absolute", top: 860, left: 60, right: 60, textAlign: "center" }}>
          <div style={{ fontFamily: SANS, fontSize: FS.sub, color: GOLD, opacity: money }}>赏金最高</div>
          <div
            style={{
              marginTop: 12,
              fontFamily: SERIF,
              fontSize: 92,
              fontWeight: 700,
              color: IVORY,
              letterSpacing: 1,
              textShadow: shadow,
              opacity: money,
              transform: "scale(" + (1.2 - money * 0.2) + ")",
            }}
          >
            ≈ $172,000
          </div>
          <div style={{ marginTop: 8, fontFamily: SANS, fontSize: FS.sub, color: IVORY, opacity: money }}>约 17.2 万美元</div>
          <div style={{ marginTop: 28, fontFamily: SERIF, fontSize: 72, fontWeight: 700, color: GOLD, opacity: mult }}>加码 &gt;4×</div>
          <div style={{ marginTop: 16, fontFamily: SANS, fontSize: FS.corner, color: "rgba(247,242,232,0.8)", opacity: official }}>
            安全冲刺 · 以官网为准
          </div>
        </div>
      </AbsoluteFill>
      <Flash alpha={flashAlpha(frame, fsec(65.45))} />
    </AbsoluteFill>
  );
};

export const S04: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S04");
  const o = sceneOpacity(frame, sc.from, sc.to, false, false);
  const slide = appear(frame, fsec(73.05), 16);
  const num = appear(frame, fsec(77.7), 9);
  const mit = appear(frame, fsec(80.2), 10);
  const gate = appear(frame, fsec(81.6), 12);
  const review = appear(frame, fsec(84.1), 8);
  const title = appear(frame, fsec(72.5), 10);
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Eyebrow text="第三条 · 开源" />
      <div style={{ position: "absolute", top: 210, left: 40, right: 40, textAlign: "center", opacity: title }}>
        <div style={{ fontFamily: SERIF, fontSize: 72, fontWeight: 700, color: IVORY, textShadow: shadow }}>Hydrogen-1.0</div>
        <div style={{ marginTop: 8, fontFamily: SANS, fontSize: FS.corner, letterSpacing: 3, color: "rgba(247,242,232,0.75)" }}>
          Deep Principle
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 230,
          top: 430,
          width: 620,
          height: 220,
          borderRadius: 18,
          background: "linear-gradient(180deg, #f2f5f7, #9aa7b1 45%, #6d7a84)",
          boxShadow: "0 24px 40px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.8)",
          transform: "translateX(" + (1 - slide) * -260 + "px)",
          opacity: slide,
        }}
      >
        <div style={{ position: "absolute", inset: 16, border: "1px solid rgba(40,50,60,0.25)", borderRadius: 8 }} />
        <div style={{ textAlign: "center", marginTop: 78, fontFamily: SANS, fontSize: 32, letterSpacing: 8, color: "#243038" }}>
          权重
        </div>
      </div>
      <div style={{ position: "absolute", left: 250, top: 700, width: 70, height: 16, borderRadius: 8, background: "#c5ced4", transform: "rotate(" + (-62 + gate * 58) + "deg)", transformOrigin: "left center", opacity: gate }} />
      {new Array(14).fill(0).map((_, i) => {
        const burst = Math.max(0, gate - 0.35);
        const ang = (i / 14) * Math.PI * 2;
        return (
          <i
            key={i}
            style={{
              position: "absolute",
              left: 540 + Math.cos(ang) * burst * (80 + i * 6),
              top: 760 + Math.sin(ang) * burst * (40 + (i % 4) * 10),
              width: 8,
              height: 8,
              borderRadius: 8,
              background: CYAN,
              opacity: burst * (1 - burst),
            }}
          />
        );
      })}
      <div style={{ position: "absolute", top: 980, left: 40, right: 40, textAlign: "center", opacity: num }}>
        <div style={{ fontFamily: SERIF, fontWeight: 700, color: IVORY, textShadow: shadow }}>
          <span style={{ fontSize: 64 }}>约 </span>
          <span style={{ fontSize: 128, color: GOLD }}>750</span>
          <span style={{ fontSize: 64 }}> 亿参数</span>
        </div>
        <div style={{ marginTop: 18, fontFamily: SANS, fontSize: FS.sub, color: IVORY, opacity: mit }}>MIT · 门控下载</div>
        <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 18, opacity: mit }}>
          {["M", "I", "T"].map((ch, i) => (
            <div
              key={ch}
              style={{
                width: 92,
                height: 92,
                borderRadius: 12,
                background: "linear-gradient(180deg, #e7edf1, #8e9aa3)",
                color: "#1c242c",
                fontFamily: SERIF,
                fontSize: 56,
                fontWeight: 700,
                lineHeight: "92px",
                boxShadow: "inset 0 2px 0 #fff, 0 10px 18px rgba(0,0,0,0.3)",
                transform: "translateY(" + (1 - appear(frame, fsec(80.2) + i * 3, 8)) * 20 + "px)",
              }}
            >
              {ch}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 26, fontFamily: SANS, fontSize: FS.corner, color: "rgba(247,242,232,0.82)", opacity: review }}>
          自报分 · 待复核
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const S05: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S05");
  const o = sceneOpacity(frame, sc.from, sc.to, false, false);
  const title = appear(frame, fsec(88.2), 12);
  const sub = appear(frame, fsec(93.2), 10);
  const chipOn = appear(frame, fsec(97.05), 6);
  const chipOff = appear(frame, fsec(99.15), 8);
  const chip = Math.max(0, chipOn * (1 - chipOff));
  if (o <= 0.001) return null;
  const rows = [
    { at: 93.3, label: "交接" },
    { at: 94.5, label: "销售" },
    { at: 95.6, label: "跟进" },
  ];
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <Eyebrow text="今日国内择一" color={GOLD} />
      <div
        style={{
          position: "absolute",
          top: 150,
          right: 56,
          padding: "12px 18px",
          borderRadius: 16,
          background: "rgba(20,16,12,0.72)",
          border: "1px solid rgba(255,220,180,0.35)",
          color: IVORY,
          fontFamily: SANS,
          fontSize: FS.tag,
          opacity: chip,
        }}
      >
        还有别的 · 不念目录
      </div>
      <div style={{ position: "absolute", top: 240, left: 64, right: 64, opacity: title }}>
        <div style={{ fontFamily: SERIF, fontSize: 64, fontWeight: 700, color: IVORY, textShadow: shadow }}>SenseNova</div>
        <div style={{ fontFamily: SERIF, fontSize: 80, fontWeight: 700, color: GOLD, textShadow: shadow }}>6.8 Flash</div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 70,
          top: 500,
          width: 940,
          height: 460,
          borderRadius: 22,
          background: "linear-gradient(180deg, #1a242e, #101820)",
          border: "10px solid #3a2e26",
          boxShadow: "0 30px 50px rgba(0,0,0,0.35), 0 0 40px rgba(255,200,140,0.18)",
          padding: 28,
        }}
      >
        {rows.map((row) => {
          const on = appear(frame, fsec(row.at), 8);
          return (
            <div key={row.label} style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26, opacity: 0.35 + on * 0.65 }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: "2px solid rgba(255,220,180,0.7)",
                  color: MINT,
                  textAlign: "center",
                  lineHeight: "38px",
                  fontSize: 28,
                }}
              >
                {on > 0.6 ? "✓" : ""}
              </div>
              <div style={{ fontFamily: SANS, fontSize: 40, color: IVORY }}>{row.label}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", top: 1040, left: 64, right: 64, textAlign: "left", opacity: sub, fontFamily: SANS, fontSize: FS.sub, color: IVORY, textShadow: shadow }}>
        职场交接 · 销售跟进
      </div>
    </AbsoluteFill>
  );
};

export const S06: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S06");
  const xor = xorOf("S06");
  const o = sceneOpacity(frame, sc.from, sc.to, false, false);
  const btn = rangeOpacity(frame, xor.buttons);
  const conc = rangeOpacity(frame, xor.conclusion, true);
  const num = appear(frame, fsec(103.05), 8);
  const xmark = appear(frame, fsec(107.25), 8);
  const sub = appear(frame, fsec(107.25), 10);
  const hit = shock(frame, fsec(103.1), 16);
  const value = Math.min(12, Math.round(num * 12));
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill style={{ opacity: o, transform: "translate(" + hit + "px," + hit * 0.2 + "px)" }}>
      <div style={{ position: "absolute", top: 170, left: 64, fontFamily: SANS, fontSize: FS.sub, color: GOLD }}>真实工作题</div>
      <div style={{ position: "absolute", top: 250, left: 64, fontFamily: SANS, fontSize: 40, color: IVORY }}>最强约</div>
      <div
        style={{
          position: "absolute",
          top: 310,
          left: 64,
          fontFamily: SERIF,
          fontSize: 168,
          fontWeight: 700,
          color: IVORY,
          lineHeight: 0.95,
          textShadow: shadow,
          opacity: num,
          transform: "scale(" + (1.18 - num * 0.18) + ")",
        }}
      >
        {value}%
      </div>
      <div style={{ position: "absolute", left: 70, top: 640, width: 560, height: 54, borderRadius: 16, background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.16)" }}>
        <div
          style={{
            width: (12 * num) + "%",
            height: "100%",
            borderRadius: 16,
            background: "linear-gradient(90deg, #e23b32, #ffb080)",
            boxShadow: "0 0 24px rgba(226,59,50,0.45)",
          }}
        />
      </div>
      <div style={{ position: "absolute", top: 730, left: 70, right: 70, fontFamily: SANS, fontSize: FS.sub, color: IVORY, opacity: sub, textShadow: shadow }}>
        演示好看 ≠ 活干完
      </div>
      <ButtonDock opacity={btn} drop={exitDrop(frame, xor.buttons)}>
        <div style={{ position: "relative" }}>
          <Choice label="演示＝能干？" state={xmark > 0.4 ? "dim" : "idle"} press={xmark} />
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: -2,
              textAlign: "center",
              fontFamily: SERIF,
              fontSize: 76,
              color: STAMP,
              opacity: xmark,
              transform: "rotate(-8deg)",
              textShadow: "0 8px 16px rgba(0,0,0,0.35)",
            }}
          >
            ✕
          </div>
        </div>
      </ButtonDock>
      <div style={{ position: "absolute", left: 70, right: 70, top: 1360, opacity: conc }}>
        <Glass glow="rgba(226,59,50,0.25)">
          <div style={{ padding: "30px 16px", textAlign: "center", fontFamily: SERIF, fontSize: 72, fontWeight: 700, color: IVORY }}>
            分数还凉
          </div>
        </Glass>
      </div>
      <Flash alpha={flashAlpha(frame, fsec(103.1))} />
    </AbsoluteFill>
  );
};

export const S07: React.FC = () => {
  const frame = useCurrentFrame();
  const sc = sceneOf("S07");
  const xor = xorOf("S07");
  const o = sceneOpacity(frame, sc.from, sc.to, false, true);
  const conc = rangeOpacity(frame, xor.conclusion, true);
  const cards = [
    { label: "接口", at: 112.85 },
    { label: "安全", at: 113.9 },
    { label: "开源", at: 114.95 },
  ];
  const seal = appear(frame, fsec(115.55), 8);
  const cold = appear(frame, fsec(117.6), 8);
  const hit = shock(frame, fsec(114.95), 8);
  if (o <= 0.001) return null;
  return (
    <AbsoluteFill style={{ opacity: o, transform: "translateY(" + hit * 0.2 + "px)" }}>
      <Eyebrow text="11.03 · 就记这句" />
      <div style={{ position: "absolute", top: 250, left: 48, right: 48, textAlign: "center", fontFamily: SERIF, fontSize: FS.hero, fontWeight: 700, color: IVORY, textShadow: shadow }}>
        记：接口 · 安全 · 开源
      </div>
      {cards.map((card, i) => {
        const p = appear(frame, fsec(card.at), 10);
        return (
          <div
            key={card.label}
            style={{
              position: "absolute",
              left: 54 + i * 332,
              top: 430 + (1 - p) * -420,
              width: 300,
              opacity: p,
            }}
          >
            <Glass>
              <div style={{ height: 230, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SERIF, fontSize: 68, fontWeight: 700, color: IVORY }}>
                {card.label}
              </div>
            </Glass>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 400,
          top: 760,
          width: 280,
          height: 280,
          borderRadius: "50%",
          border: "8px solid " + STAMP,
          color: STAMP,
          fontFamily: SERIF,
          fontSize: 72,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "rotate(-12deg) scale(" + (1.4 - seal * 0.4) + ")",
          opacity: seal,
        }}
      >
        落地
      </div>
      <div style={{ position: "absolute", left: 56, right: 56, top: 1288, opacity: conc }}>
        <Glass>
          <div style={{ padding: "32px 18px 36px", textAlign: "center" }}>
            <div style={{ fontFamily: SERIF, fontSize: 64, fontWeight: 700, color: IVORY }}>接口 · 安全 · 开源落地</div>
            <div style={{ marginTop: 14, fontFamily: SANS, fontSize: FS.sub, color: GOLD }}>新模型没来</div>
            <div
              style={{
                marginTop: 8,
                fontFamily: SERIF,
                fontSize: 72,
                fontWeight: 700,
                color: IVORY,
                opacity: cold,
                transform: "scale(" + (1.12 - cold * 0.12) + ")",
              }}
            >
              干活分还凉
            </div>
          </div>
        </Glass>
      </div>
      <Flash alpha={flashAlpha(frame, fsec(115.55)) * 0.6} />
    </AbsoluteFill>
  );
};
