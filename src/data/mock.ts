import { 
  PenTool, 
  Megaphone, 
  Users, 
  Camera, 
  FileText 
} from "lucide-react";

export const USE_CASES = [
  {
    title: "สร้างคอนเทนต์",
    description: "สร้างโพสต์, บทความ, โปรโมชั่น ด้วย AI อัตโนมัติ",
    cta: "เริ่มต้นใช้งาน",
    icon: PenTool,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    gradient: "from-purple-50 to-white",
  },
  {
    title: "ยิงแอด & การตลาด",
    description: "วางแผนแคมเปญ วิเคราะห์ และเพิ่มประสิทธิภาพ Ads",
    cta: "เริ่มต้นใช้งาน",
    icon: Megaphone,
    color: "text-rose-600",
    bgColor: "bg-rose-100",
    gradient: "from-rose-50 to-white",
  },
  {
    title: "วิเคราะห์ลูกค้า",
    description: "วิเคราะห์พฤติกรรมลูกค้าจากข้อมูลและกล้องของคุณ",
    cta: "เริ่มต้นใช้งาน",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
    gradient: "from-emerald-50 to-white",
  },
  {
    title: "กล้อง & ความปลอดภัย",
    description: "ตรวจจับเหตุการณ์ผิดปกติ แจ้งเตือนแบบเรียลไทม์",
    cta: "เริ่มต้นใช้งาน",
    icon: Camera,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    badge: "NEW",
    gradient: "from-orange-50 to-white",
  },
  {
    title: "รายงานอัตโนมัติ",
    description: "สรุปข้อมูล สร้างรายงาน ส่งให้อัตโนมัติ",
    cta: "เริ่มต้นใช้งาน",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    gradient: "from-blue-50 to-white",
  }
];

export const RECENT_WORKFLOWS = [
  {
    id: "wf-1",
    name: "สร้างโพสต์โปรโมชันสินค้าใหม่",
    source: "Instagram",
    type: "สร้างคอนเทนต์",
    status: "success",
    startedAt: "10 นาทีที่แล้ว",
    result: "5 โพสต์",
    progress: 100,
  },
  {
    id: "wf-2",
    name: "เตือนจากกล้องร้าน (โซนประตู)",
    source: "Camera #1",
    type: "กล้อง & ความปลอดภัย",
    status: "running",
    startedAt: "2 นาทีที่แล้ว",
    result: "2 เหตุการณ์",
    progress: 40,
  },
  {
    id: "wf-3",
    name: "สรุปแชทลูกค้ารายวัน",
    source: "LINE Official",
    type: "วิเคราะห์ข้อมูล",
    status: "success",
    startedAt: "30 นาทีที่แล้ว",
    result: "120 แชท",
    progress: 100,
  },
  {
    id: "wf-4",
    name: "รายงานยอดขายรายสัปดาห์",
    source: "Google Sheets",
    type: "รายงาน",
    status: "success",
    startedAt: "2 ชั่วโมงที่แล้ว",
    result: "1 รายงาน",
    progress: 100,
  },
  {
    id: "wf-5",
    name: "วิเคราะห์แคมเปญโฆษณา",
    source: "Facebook Ads",
    type: "การตลาด",
    status: "failed",
    startedAt: "5 ชั่วโมงที่แล้ว",
    result: "-",
    progress: 0,
  }
];

export const CONNECTIONS = [
  { name: "LINE Official", status: "connected", icon: "/connect-line.png" }, // Using standard icons/colors for now
  { name: "Instagram", status: "connected", icon: "/connect-ig.png" },
  { name: "Facebook", status: "connected", icon: "/connect-fb.png" },
  { name: "n8n Engine", status: "connected", icon: "/connect-n8n.png" },
  { name: "Camera Server", status: "connected", icon: "/connect-cam.png" },
  { name: "Google Drive", status: "connected", icon: "/connect-drive.png" },
];

export const SUMMARY_TODAY = {
  totalWorkflows: 24,
  totalWorkflowsTrend: 20,
  successTasks: 18,
  successTasksTrend: 12,
  timeSaved: 6.5,
  timeSavedTrend: 18,
  alerts: 8,
};

export const ALERTS = [
  {
    id: "al-1",
    title: "กล้องร้านสาขา 2",
    description: "ตรวจพบเหตุการณ์ผิดปกติ",
    time: "5 นาทีที่แล้ว",
    severity: "urgent",
  },
  {
    id: "al-2",
    title: "ลูกค้าใหม่ 10 ราย",
    description: "จาก LINE Official",
    time: "15 นาทีที่แล้ว",
    severity: "info",
  },
  {
    id: "al-3",
    title: "รายงานรายวันพร้อมแล้ว",
    description: "ยอดขายประจำวันที่ 24 พ.ค. 67",
    time: "1 ชั่วโมงที่แล้ว",
    severity: "info",
  }
];
