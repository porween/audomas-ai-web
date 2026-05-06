/** Story + workflow helpers for Hero interactive Vision ↔ Chat sync demo */

export type HeroDemoIndustry = "clinic" | "car" | "enterprise";

export type HeroWorkflowPhase =
  | "idle"
  | "vision_sight"
  | "data_link"
  | "chat_ingest"
  | "chat_typing"
  | "chat_turns"
  | "deal_beat"
  | "revenue_pulse";

export type HeroSessionEvent = {
  type: "system" | "log";
  title?: string;
  text: string;
  subtext?: string;
  time: string;
};

export type HeroStoryBundle = {
  visionLogs: string[];
  chatEvents: HeroSessionEvent[];
};

/** Story pillars aligned to deck: Sight → Brain → Voice → Revenue */
export type HeroStoryPillarIndex = 0 | 1 | 2 | 3;

export function getHeroStoryPillar(phase: HeroWorkflowPhase): HeroStoryPillarIndex | null {
  switch (phase) {
    case "vision_sight":
      return 0;
    case "data_link":
    case "chat_ingest":
      return 1;
    case "chat_typing":
    case "chat_turns":
      return 2;
    case "deal_beat":
    case "revenue_pulse":
      return 3;
    default:
      return null;
  }
}

const TM = "14:32:";

function ev(title: string, text: string, timeSuffix: string): HeroSessionEvent {
  return { type: "system", title, text, time: TM + timeSuffix };
}

export function getHeroStory(industry: HeroDemoIndustry, lang: "th" | "en"): HeroStoryBundle {
  if (industry === "clinic") {
    if (lang === "th") {
      return {
        visionLogs: [
          "[Vision] ตรวจพบผู้รอคิวค้างเกิน SLA (รอ > 22 นาที)",
          "[Vision] Lock เป้าหมาย: โซนรอคิว · stress index สูง",
          "[Vision] พร้อมส่งสัญญาณไป AI Sales เพื่อ recovery",
        ],
        chatEvents: [
          ev(
            "AI RESPONSE",
            "สวัสดีค่ะ — Vision แจ้งว่าคุณรอคิวนานผิดปกติ เลยขอมอบส่วนลดพิเศษ 15% สำหรับมัดจำวันนี้ พร้อมล็อกคิวให้ทันทีไหมคะ",
            "01",
          ),
          ev("USER RESPONSE", "โอเคค่ะ ขอรับส่วนลดและมัดจำตามที่แจ้ง", "02"),
          ev("AI ACTION", "ออกคูปอง 15% • สร้างลิงก์มัดจำ • บันทึก CRM + แจ้งคิว", "03"),
          ev(
            "RESULT: DEAL CLOSED",
            "Deal Closed: มัดจำ ฿12,000 (หลังหักส่วนลด) · คิวยืนยัน · ส่งใบเสร็จแล้ว",
            "04",
          ),
        ],
      };
    }
    return {
      visionLogs: [
        "[Vision] Waiting-room dwell exceeds SLA (> 22 min)",
        "[Vision] Subject locked: queue zone · elevated stress signal",
        "[Vision] Handoff ready → AI Sales recovery playbook",
      ],
      chatEvents: [
        ev(
          "AI RESPONSE",
          "Hi — Vision flagged an unusually long wait. I can offer a same-day 15% deposit discount and lock your slot now. Shall I proceed?",
          "01",
        ),
        ev("USER RESPONSE", "Yes — apply the discount and send the deposit link.", "02"),
        ev("AI ACTION", "Issue 15% voucher • Create deposit link • CRM update + slot confirm", "03"),
        ev(
          "RESULT: DEAL CLOSED",
          "Deal Closed: Deposit $320 (after discount) · Slot confirmed · Receipt sent",
          "04",
        ),
      ],
    };
  }

  if (industry === "car") {
    if (lang === "th") {
      return {
        visionLogs: [
          "[Vision] Luxury Showroom · แขกยืนจ่อ SUV รุ่นท็อป (dwell สูง)",
          "[Vision] ล็อก ROI ป้ายรุ่น / ทริมหลักในโซนโชว์",
          "[Vision] ส่งบริบทไปยัง AI Sales — ปากพูดประสานกับดวงตา",
        ],
        chatEvents: [
          ev(
            "AI RESPONSE",
            "สวัสดีครับ — Vision ที่โชว์รูมหรูแจ้งว่าคุณกำลังสนใจ SUV รุ่นท็อปคันนี้ ขอส่งสเปกเต็ม + แพ็กไฟแนนซ์ และจอง Test Drive ให้ทันทีไหมครับ",
            "01",
          ),
          ev("USER RESPONSE", "ได้ครับ ขอนัดเสาร์บ่ายสอง", "02"),
          ev("AI ACTION", "จอง Test Drive • แจ้งเซลส์ • ส่ง QR ยืนยัน + แพ็กเอกสาร", "03"),
          ev(
            "RESULT: DEAL CLOSED",
            "Deal Closed: Luxury SUV Test Drive · เสาร์ 14:00 · เซลส์รับชุดข้อมูลครบ",
            "04",
          ),
        ],
      };
    }
    return {
      visionLogs: [
        "[Vision] Luxury showroom · guest anchored on flagship SUV (high dwell)",
        "[Vision] Badge / trim ROI locked in the display zone",
        "[Vision] Context to AI Sales — voice stays in sync with sight",
      ],
      chatEvents: [
        ev(
          "AI RESPONSE",
          "Hi — Vision at the luxury showroom sees you on this flagship SUV. I can send the full spec + finance pack and book a test drive now—shall I?",
          "01",
        ),
        ev("USER RESPONSE", "Yes — Saturday 2:00 PM works.", "02"),
        ev("AI ACTION", "Book test drive • Notify sales • Send confirmation QR + packet", "03"),
        ev(
          "RESULT: DEAL CLOSED",
          "Deal Closed: Luxury SUV test drive · Sat 14:00 · Sales brief delivered",
          "04",
        ),
      ],
    };
  }

  /* enterprise — perimeter / security */
  if (lang === "th") {
    return {
      visionLogs: [
        "[Vision] ตรวจพบการบุกรุกโซนหวงห้าม (perimeter breach)",
        "[Vision] ล็อกวัตถุ/เส้นทาง · confidence สูง",
        "[Vision] ส่งเหตุการณ์ไป AI Sales / SOC playbook",
      ],
      chatEvents: [
        ev(
          "AI RESPONSE",
          "[SECURITY] ยืนยันการบุกรุกพื้นที่หวงห้าม — แจ้ง Security Operations และบันทึกหลักฐานลง AirGapX ทันที",
          "01",
        ),
        ev("USER RESPONSE", "ยืนยันระดับ A — ขอส่งรายงานผู้บริหาร", "02"),
        ev("AI ACTION", "ล็อกสตรีมกล้อง • บันทึกเหตุการณ์ • Mirror ไป AirGapX cold vault", "03"),
        ev(
          "RESULT: INCIDENT SEALED",
          "Result: Incident logged · AirGapX sealed · SOC + executive notify queued",
          "04",
        ),
      ],
    };
  }
  return {
    visionLogs: [
      "[Vision] Restricted-zone perimeter breach detected",
      "[Vision] Subject/track locked · high-confidence alert",
      "[Vision] Event routed to AI operator + SOC workflow",
    ],
    chatEvents: [
      ev(
        "AI RESPONSE",
        "[SECURITY] Perimeter breach confirmed — alerting Security Operations and sealing evidence to AirGapX now.",
        "01",
      ),
      ev("USER RESPONSE", "Ack severity A — escalate to leadership.", "02"),
      ev("AI ACTION", "Lock camera streams • Write immutable log • Mirror to AirGapX vault", "03"),
      ev(
        "RESULT: INCIDENT SEALED",
        "Result: Incident logged · AirGapX sealed · SOC + executive notify queued",
        "04",
      ),
    ],
  };
}

export function heroSystemVisionLine(lang: "th" | "en"): HeroSessionEvent {
  return {
    type: "system",
    title: "SYSTEM",
    text: lang === "th" ? "[System] รับข้อมูลจาก Vision AI แล้ว" : "[System] Data received from Vision AI",
    time: TM + "00",
  };
}

export function heroVisionStatusChip(phase: HeroWorkflowPhase, lang: "th" | "en"): string {
  if (phase === "vision_sight" || phase === "data_link") {
    return lang === "th" ? "[SIGHT · ใช้งาน]" : "[SIGHT ACTIVE]";
  }
  if (phase === "chat_ingest" || phase === "chat_typing" || phase === "chat_turns") {
    return lang === "th" ? "[SIGHT · เสถียร]" : "[SIGHT · STABLE]";
  }
  if (phase === "deal_beat" || phase === "revenue_pulse") {
    return lang === "th" ? "[SIGHT · เสถียร]" : "[SIGHT · STABLE]";
  }
  return lang === "th" ? "[SIGHT · พร้อม]" : "[SIGHT · STANDBY]";
}

export function heroChatStatusChip(phase: HeroWorkflowPhase, lang: "th" | "en"): string {
  switch (phase) {
    case "vision_sight":
      return lang === "th" ? "[รอสัญญาณ · SIGHT]" : "[AWAITING SIGHT]";
    case "data_link":
      return lang === "th" ? "[BRAIN · ซิงค์สายตา→แชท]" : "[BRAIN · SYNC]";
    case "chat_ingest":
      return lang === "th" ? "[BRAIN · ผนวกเหตุการณ์]" : "[BRAIN · ROUTE]";
    case "chat_typing":
      return lang === "th" ? "[VOICE · กำลังพิมพ์]" : "[VOICE · TYPING]";
    case "chat_turns":
      return lang === "th" ? "[VOICE · สนทนา]" : "[VOICE · LIVE]";
    case "deal_beat":
      return lang === "th" ? "[VOICE · ปิดดีล]" : "[VOICE · CLOSE]";
    case "revenue_pulse":
      return lang === "th" ? "[REVENUE · ซิงค์ HUB]" : "[REVENUE · SYNC]";
    default:
      return lang === "th" ? "[VOICE · พร้อม]" : "[VOICE · STANDBY]";
  }
}

export function heroHubStatusChip(phase: HeroWorkflowPhase, lang: "th" | "en"): string {
  if (phase === "revenue_pulse") {
    return lang === "th" ? "[REVENUE · กำลังแปลง]" : "[REVENUE ACTIVE]";
  }
  if (phase === "deal_beat") {
    return lang === "th" ? "[REVENUE · เตรียมรับยอด]" : "[REVENUE · PRIME]";
  }
  if (phase === "idle") {
    return lang === "th" ? "[REVENUE HUB]" : "[REVENUE HUB · LIVE]";
  }
  return lang === "th" ? "[REVENUE · เฝ้าระวัง]" : "[REVENUE · ARMED]";
}
