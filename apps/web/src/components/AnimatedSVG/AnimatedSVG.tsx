import { useState, useEffect } from "react";
import { Computer, CreditCard, ShoppingBag, Zap } from "lucide-react";

// ─── Layout constants ────────────────────────────────────────────────────────
const VW = 900;
const VH = 480;
const HUB_X = 450;
const HUB_Y = 240;

// ─── Source node definitions ─────────────────────────────────────────────────
interface NodeDef {
    id: string;
    name: string;
    color: string;
    glow: string;
    x: number;
    y: number;
    event: string;
    detail: string;
    dur: number;
    pxPct: string;
    pyPct: string;
}

const NODES: NodeDef[] = [
    {
        id: "stripe",
        name: "Stripe",
        color: "#7C6FFF",
        glow: "rgba(124,111,255,0.45)",
        x: 110,
        y: 138,
        event: "payment.succeeded",
        detail: "$249.00 · USD",
        dur: 2.4,
        pxPct: "12.2%",
        pyPct: "28.75%",
    },
    {
        id: "github",
        name: "GitHub",
        color: "#C9D1D9",
        glow: "rgba(201,209,217,0.3)",
        x: 110,
        y: 342,
        event: "push",
        detail: "main · 3 commits",
        dur: 3.2,
        pxPct: "12.2%",
        pyPct: "71.25%",
    },
    {
        id: "shopify",
        name: "Shopify",
        color: "#96BF48",
        glow: "rgba(150,191,72,0.45)",
        x: 800,
        y: 240,
        event: "order.created",
        detail: "#4821 · $89.00",
        dur: 2.8,
        pxPct: "88.9%",
        pyPct: "50%",
    },
];

// ─── Path helpers ─────────────────────────────────────────────────────────────
function cubicPath(fx: number, fy: number, tx: number, ty: number): string {
    const dx = tx - fx;
    return `M ${fx} ${fy} C ${fx + dx * 0.42} ${fy} ${fx + dx * 0.58} ${ty} ${tx} ${ty}`;
}

// ─── Brand icons via lucide ───────────────────────────────────────────────────
function NodeIcon({ id, size = 14 }: { id: string; size?: number }) {
    if (id === "stripe") return <CreditCard size={size} />;
    if (id === "github") return <Computer size={size} />;
    return <ShoppingBag size={size} />;
}

// ─── Live events ──────────────────────────────────────────────────────────────
interface LiveEvent {
    key: number;
    source: string;
    event: string;
    detail: string;
}

const EVENT_POOL: Record<string, { events: string[]; details: string[] }> = {
    stripe: {
        events: ["payment.succeeded", "charge.created", "customer.updated", "invoice.paid"],
        details: ["$249.00", "$99.00", "$1,200.00", "$45.00"],
    },
    github: {
        events: ["push", "pull_request.opened", "release.published", "issues.opened"],
        details: ["main", "feat/auth", "v2.1.0", "fix/crash"],
    },
    shopify: {
        events: ["order.created", "product.updated", "checkout.completed", "refund.created"],
        details: ["#4821", "#4822", "#4823", "#4824"],
    },
};

function getColor(id: string) {
    return NODES.find((n) => n.id === id)?.color ?? "#fff";
}

const SEED_EVENTS: LiveEvent[] = [
    { key: 0, source: "stripe", event: "payment.succeeded", detail: "$249.00" },
    { key: 1, source: "shopify", event: "order.created", detail: "#4821" },
    { key: 2, source: "github", event: "push", detail: "main" },
    { key: 3, source: "stripe", event: "charge.created", detail: "$99.00" },
    { key: 4, source: "shopify", event: "checkout.completed", detail: "#4820" },
];

// ─── Source card ─────────────────────────────────────────────────────────────
function SourceCard({ node }: { node: NodeDef }) {
    return (
        <div
            style={{
                background: "rgba(6,4,18,0.92)",
                border: `1px solid ${node.color}38`,
                boxShadow: `0 0 28px ${node.glow}, inset 0 1px 0 rgba(255,255,255,0.04)`,
                backdropFilter: "blur(16px)",
                borderRadius: "14px",
                padding: "10px 14px",
                minWidth: "158px",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "7px" }}>
                <div
                    style={{
                        width: 26,
                        height: 26,
                        borderRadius: 7,
                        background: node.color + "1f",
                        color: node.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                    }}
                >
                    <NodeIcon id={node.id} size={13} />
                </div>
                <span
                    style={{
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        color: node.color,
                        flex: 1,
                    }}
                >
                    {node.name}
                </span>
                <span
                    className="animate-pulse"
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: node.color,
                        flexShrink: 0,
                    }}
                />
            </div>
            <div
                style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.68rem",
                    color: "rgba(226,232,240,0.52)",
                    letterSpacing: "0.01em",
                }}
            >
                {node.event}
            </div>
            <div
                style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.65rem",
                    color: "rgba(226,232,240,0.28)",
                    marginTop: 3,
                }}
            >
                {node.detail}
            </div>
        </div>
    );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function AnimatedSVG() {
    const [events, setEvents] = useState<LiveEvent[]>(SEED_EVENTS);
    const [counter, setCounter] = useState(20);

    useEffect(() => {
        const id = setInterval(() => {
            const srcs = Object.keys(EVENT_POOL);
            const src = srcs[Math.floor(Math.random() * srcs.length)];
            const pool = EVENT_POOL[src];
            setEvents((prev) => [
                {
                    key: counter,
                    source: src,
                    event: pool.events[Math.floor(Math.random() * pool.events.length)],
                    detail: pool.details[Math.floor(Math.random() * pool.details.length)],
                },
                ...prev.slice(0, 4),
            ]);
            setCounter((c) => c + 1);
        }, 3200);
        return () => clearInterval(id);
    }, [counter]);

    return (
        <div
            className="min-h-screen  text-foreground overflow-x-hidden"
            style={{ fontFamily: "Inter, sans-serif" }}
        >

            {/* ── SVG visualization canvas ───────────────────────── */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 1000,
                    margin: "0 auto",
                    height: 480,
                }}
            >
                {/* SVG layer — paths and particles */}
                <svg
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
                    viewBox={`0 0 ${VW} ${VH}`}
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <defs>
                        {/* Path refs for animateMotion */}
                        {NODES.map((n) => (
                            <path
                                key={`pd-${n.id}`}
                                id={`path-${n.id}`}
                                d={cubicPath(n.x, n.y, HUB_X, HUB_Y)}
                                fill="none"
                            />
                        ))}

                        {/* Particle glow */}
                        <filter id="pglow" x="-120%" y="-120%" width="340%" height="340%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Hub glow */}
                        <filter id="hglow" x="-120%" y="-120%" width="340%" height="340%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        {/* Path gradients */}
                        {NODES.map((n) => {
                            const goRight = n.x < HUB_X;
                            return (
                                <linearGradient
                                    key={`gr-${n.id}`}
                                    id={`grad-${n.id}`}
                                    x1={goRight ? "0%" : "100%"}
                                    y1="0%"
                                    x2={goRight ? "100%" : "0%"}
                                    y2="0%"
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop offset="0%" stopColor={n.color} stopOpacity="0.75" />
                                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.75" />
                                </linearGradient>
                            );
                        })}

                        {/* Dot grid pattern */}
                        <pattern id="dotgrid" x="0" y="0" width="34" height="34" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.045)" />
                        </pattern>
                    </defs>

                    {/* Dot grid */}
                    <rect width={VW} height={VH} fill="url(#dotgrid)" />

                    {/* Connection paths */}
                    {NODES.map((n) => (
                        <path
                            key={`pl-${n.id}`}
                            d={cubicPath(n.x, n.y, HUB_X, HUB_Y)}
                            fill="none"
                            stroke={`url(#grad-${n.id})`}
                            strokeWidth="1.5"
                            strokeDasharray="6 5"
                            opacity="0.38"
                        />
                    ))}

                    {/* Hub outer aura */}
                    <circle cx={HUB_X} cy={HUB_Y} r="72" fill="rgba(124,58,237,0.12)" filter="url(#hglow)" />

                    {/* Hub breathing ring */}
                    <circle cx={HUB_X} cy={HUB_Y} r="52" fill="none" stroke="rgba(124,58,237,0.22)" strokeWidth="1">
                        <animate attributeName="r" values="48;60;48" dur="3.4s" repeatCount="indefinite" calcMode="ease" />
                        <animate attributeName="opacity" values="0.35;0;0.35" dur="3.4s" repeatCount="indefinite" calcMode="ease" />
                    </circle>

                    {/* Hub second breathing ring — offset phase */}
                    <circle cx={HUB_X} cy={HUB_Y} r="52" fill="none" stroke="rgba(167,139,250,0.14)" strokeWidth="1">
                        <animate attributeName="r" values="48;62;48" dur="3.4s" repeatCount="indefinite" calcMode="ease" begin="-1.7s" />
                        <animate attributeName="opacity" values="0.25;0;0.25" dur="3.4s" repeatCount="indefinite" calcMode="ease" begin="-1.7s" />
                    </circle>

                    {/* Hub ring */}
                    <circle cx={HUB_X} cy={HUB_Y} r="38" fill="rgba(5,4,15,0.96)" stroke="rgba(124,58,237,0.65)" strokeWidth="1.5" />
                    <circle cx={HUB_X} cy={HUB_Y} r="30" fill="rgba(124,58,237,0.07)" stroke="rgba(124,58,237,0.22)" strokeWidth="1" />

                    {/* Source node pulse rings */}
                    {NODES.map((n, ni) => (
                        <circle
                            key={`npr-${n.id}`}
                            cx={n.x}
                            cy={n.y}
                            r="16"
                            fill="none"
                            stroke={n.color}
                            strokeWidth="1"
                            opacity="0"
                        >
                            <animate attributeName="r" values="16;32;16" dur="2.8s" repeatCount="indefinite" begin={`-${ni * 0.9}s`} />
                            <animate attributeName="opacity" values="0.55;0;0.55" dur="2.8s" repeatCount="indefinite" begin={`-${ni * 0.9}s`} />
                        </circle>
                    ))}

                    {/* Source node base discs */}
                    {NODES.map((n) => (
                        <circle
                            key={`nb-${n.id}`}
                            cx={n.x}
                            cy={n.y}
                            r="15"
                            fill={n.color + "18"}
                            stroke={n.color + "55"}
                            strokeWidth="1.5"
                        />
                    ))}

                    {/* Particles — 3 per connection, staggered with negative begin */}
                    {NODES.flatMap((n) =>
                        [0, 1, 2].map((i) => {
                            const beginVal = i === 0 ? "0s" : `-${((n.dur / 3) * i).toFixed(2)}s`;
                            const radius = i === 0 ? 4.5 : i === 1 ? 3.2 : 2.2;
                            const opacity = i === 0 ? 1 : i === 1 ? 0.65 : 0.35;
                            return (
                                <g key={`p-${n.id}-${i}`} filter="url(#pglow)">
                                    <circle r={radius} fill={n.color} opacity={opacity}>
                                        <animateMotion dur={`${n.dur}s`} repeatCount="indefinite" begin={beginVal}>
                                            <mpath href={`#path-${n.id}`} />
                                        </animateMotion>
                                    </circle>
                                </g>
                            );
                        })
                    )}
                </svg>

                {/* HTML overlay — source cards */}
                {NODES.map((n) => (
                    <div
                        key={`card-${n.id}`}
                        style={{
                            position: "absolute",
                            left: n.pxPct,
                            top: n.pyPct,
                            transform: "translate(-50%, -50%)",
                            zIndex: 5,
                        }}
                    >
                        <SourceCard node={n} />
                    </div>
                ))}

                {/* HTML overlay — hub label */}
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 10,
                        textAlign: "center",
                        pointerEvents: "none",
                    }}
                >
                    <Zap
                        size={16}
                        color="#a78bfa"
                        style={{ display: "block", margin: "0 auto 4px", opacity: 0.85 }}
                    />
                    <div
                        style={{
                            fontFamily: "Outfit, sans-serif",
                            fontSize: "0.58rem",
                            fontWeight: 700,
                            letterSpacing: "0.18em",
                            color: "#a78bfa",
                            textTransform: "uppercase",
                        }}
                    >
                        WEBHUX
                    </div>
                    <div
                        style={{
                            fontFamily: "JetBrains Mono, monospace",
                            fontSize: "0.52rem",
                            color: "rgba(167,139,250,0.42)",
                            marginTop: 2,
                        }}
                    >
                        hub
                    </div>
                </div>
            </div>

            {/* ── Live events feed ───────────────────────────────── */}
            <div
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    maxWidth: 680,
                    margin: "-16px auto 0",
                    padding: "0 20px 80px",
                }}
            >
                <div
                    style={{
                        borderRadius: 18,
                        overflow: "hidden",
                        background: "rgba(255,255,255,0.018)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        boxShadow: "0 4px 48px rgba(0,0,0,0.55)",
                    }}
                >
                    {/* Feed header */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "10px 18px",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            background: "black",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span
                                className="animate-pulse"
                                style={{ width: 7, height: 7, borderRadius: "50%", background: "#34d399", display: "inline-block" }}
                            />
                            <span
                                style={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontSize: "0.7rem",
                                    color: "#374151",
                                    letterSpacing: "0.02em",
                                }}
                            >
                                live events
                            </span>
                        </div>
                        <span
                            style={{
                                fontFamily: "JetBrains Mono, monospace",
                                fontSize: "0.68rem",
                                color: "#1f2937",
                            }}
                        >
                            12 endpoints active
                        </span>
                    </div>

                    {/* Event rows */}
                    {events.map((ev, idx) => (
                        <div
                            key={ev.key}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                padding: "9px 18px",
                                borderBottom: idx < events.length - 1 ? "1px solid rgba(255,255,255,0.032)" : "none",
                                opacity: Math.max(0.2, 1 - idx * 0.18),
                                transition: "opacity 0.4s",
                            }}
                        >
                            <span
                                style={{
                                    width: 7,
                                    height: 7,
                                    borderRadius: "50%",
                                    background: getColor(ev.source),
                                    flexShrink: 0,
                                }}
                            />
                            <span
                                style={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontSize: "0.68rem",
                                    color: getColor(ev.source) + "cc",
                                    width: 60,
                                    flexShrink: 0,
                                }}
                            >
                                {ev.source}
                            </span>
                            <span
                                style={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontSize: "0.7rem",
                                    color: "#94a3b8",
                                    flex: 1,
                                }}
                            >
                                {ev.event}
                            </span>
                            <span
                                style={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontSize: "0.68rem",
                                    color: "#374151",
                                    flexShrink: 0,
                                }}
                            >
                                {ev.detail}
                            </span>
                            <span
                                style={{
                                    fontFamily: "JetBrains Mono, monospace",
                                    fontSize: "0.65rem",
                                    color: "#1f2937",
                                    flexShrink: 0,
                                    width: 52,
                                    textAlign: "right",
                                }}
                            >
                                {idx === 0 ? "just now" : `${idx * 3}s ago`}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
