# Lucky Draw System 🎉

ระบบจับฉลากออนไลน์ที่ทันสมัยและใช้งานง่าย สำหรับการจัดกิจกรรมสุ่มรางวัลในองค์กรหรืองานอีเวนต์ต่างๆ

## ✨ คุณสมบัติหลัก

### 🏠 การจัดการห้องสุ่มรางวัล
- **สร้างห้องสุ่มรางวัล** พร้อมระบบรหัสผ่านเพื่อความปลอดภัย
- **ค้นหาและเข้าร่วมห้อง** ที่มีอยู่แล้ว
- **จัดการห้อง** แก้ไข ลบ และควบคุมการเข้าถึง

### 👥 การจัดการผู้เข้าร่วม
- **นำเข้าข้อมูลผู้เข้าร่วม** จากไฟล์ Excel (.xls, .xlsx) หรือ CSV
- **เพิ่มผู้เข้าร่วมแบบ Manual** ผ่านฟอร์มในระบบ
- **แก้ไขข้อมูลผู้เข้าร่วม** สถานะการเข้าร่วม และข้อมูลส่วนตัว
- **สร้าง QR Code** สำหรับฟอร์มลงทะเบียนออนไลน์

### 🎁 การจัดการรางวัล
- **เพิ่มรางวัล** พร้อมรูปภาพและจำนวน
- **แก้ไขรางวัล** ชื่อ จำนวน และรูปภาพ
- **ลบรางวัล** ที่ไม่ต้องการ
- **แสดงรางวัลแบบ Carousel** พร้อมระบบ Autoplay

### 🎯 ระบบสุ่มรางวัลขั้นสูง
- **ตั้งเงื่อนไขการสุ่ม** ตามตำแหน่งงาน สถานะการเข้าร่วม และสถานะการได้รับรางวัล
- **สุ่มหลายคนพร้อมกัน** ในรางวัลเดียว
- **ระบบแอนิเมชันการสุ่ม** ที่น่าตื่นเต้น
- **ป้องกันการสุ่มซ้ำ** ผู้ที่ได้รับรางวัลแล้วจะไม่ถูกสุ่มอีก

### 📊 ระบบรายงานและสรุปผล
- **Dashboard สรุปผลรางวัล** แสดงผู้ชนะทั้งหมด
- **รายละเอียดผู้ชนะ** พร้อมข้อมูลเงื่อนไขการสุ่ม
- **รางวัลที่เหลือ** ติดตามจำนวนรางวัลคงเหลือ
- **ประวัติการสุ่ม** พร้อมเวลาและวันที่

## 🛠 เทคโนโลยีที่ใช้

### Frontend
- **Nuxt 3** - Vue.js Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Utility-first CSS Framework
- **DaisyUI** - Component Library
- **Nuxt UI** - Modern UI Components
- **Pinia** - State Management
- **Vue Router** - Client-side Routing

### UI/UX Libraries
- **SweetAlert2** - Beautiful Alert Dialogs
- **QRCode.vue** - QR Code Generation
- **Vue Multiselect** - Advanced Select Component
- **XLSX** - Excel File Processing
- **Axios** - HTTP Client

### Styling & Animation
- **Custom CSS Animations** - Glow effects และ transitions
- **Gradient Backgrounds** - Modern design aesthetics
- **Responsive Design** - Mobile-first approach
- **Loading Animations** - Hamster wheel loader

## 📁 โครงสร้างโปรเจค

```
├── assets/                 # Static assets (images, fonts, etc.)
├── components/             # Vue Components
│   ├── drawRoom/          # Components สำหรับหน้าสุ่มรางวัล
│   ├── player/            # Components จัดการผู้เข้าร่วม
│   ├── prize/             # Components จัดการรางวัล
│   └── winner/            # Components แสดงผู้ชนะ
├── composables/           # Vue Composables
├── layouts/               # Layout Templates
├── pages/                 # Page Components (Auto-routing)
├── services/              # API Service Layer
├── stores/                # Pinia Stores (State Management)
├── types/                 # TypeScript Type Definitions
└── utils/                 # Utility Functions
```

## 🚀 การติดตั้งและใช้งาน

### ข้อกำหนดระบบ
- Node.js 18+ 
- npm หรือ yarn หรือ pnpm

### การติดตั้ง

1. **Clone Repository**
```bash
git clone <repository-url>
cd lucky-draw-frontend
```

2. **ติดตั้ง Dependencies**
```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

3. **ตั้งค่า Environment Variables**
```bash
cp .env.example .env
```
แก้ไขไฟล์ `.env` ให้ตรงกับการตั้งค่าของคุณ

4. **รันโปรเจค**
```bash
# Development
npm run dev

# Production Build
npm run build
npm run preview
```

## 🎮 วิธีการใช้งาน

### 1. สร้างห้องสุ่มรางวัล
- เข้าสู่หน้าแรกของระบบ
- กรอกชื่อห้องและรหัสผ่าน (ถ้าต้องการ)
- คลิก "สร้างห้อง"

### 2. เพิ่มรางวัล
- เข้าสู่ห้องที่สร้าง
- คลิก "เพิ่มรางวัล"
- กรอกชื่อรางวัล จำนวน และอัปโหลดรูปภาพ

### 3. เพิ่มผู้เข้าร่วม
- อัปโหลดไฟล์ Excel/CSV ที่มีข้อมูลผู้เข้าร่วม
- หรือเพิ่มทีละคนผ่านฟอร์ม
- สร้าง QR Code สำหรับให้ผู้เข้าร่วมลงทะเบียนเอง

### 4. สุ่มรางวัล
- เลือกรางวัลที่ต้องการสุ่ม
- ตั้งเงื่อนไขการสุ่ม (ตำแหน่ง, สถานะ, จำนวน)
- คลิก "สุ่มรางวัล" และรอดูผลลัพธ์

### 5. ดูสรุปผล
- เข้าสู่หน้า Dashboard
- ดูรายชื่อผู้ชนะและรางวัลที่เหลือ
- ดูรายละเอียดการสุ่มแต่ละครั้ง

## 🎨 Features เด่น

### ระบบแอนิเมชันการสุ่ม
- เอฟเฟกต์ Glow บนการ์ดผู้เข้าร่วม
- การสุ่มแบบ Progressive Speed
- แอนิเมชัน Transition ที่ลื่นไหล

### Responsive Design
- รองรับทุกขนาดหน้าจอ
- Mobile-first approach
- Touch-friendly interface

### ระบบความปลอดภัย
- รหัสผ่านห้อง
- การตรวจสอบสิทธิ์การเข้าถึง
- ป้องกันการสุ่มซ้ำ

### UX/UI ที่ทันสมัย
- Apple-level design aesthetics
- Gradient backgrounds
- Micro-interactions
- Loading states

## 🔧 การปรับแต่ง

### เปลี่ยนธีมสี
แก้ไขไฟล์ `assets/css/main.css`:
```css
@theme {
  --color-my-custom-bg: #ffe168;
  --font-display: "Mitr", sans-serif;
}
```

### เพิ่ม Animation ใหม่
สร้างไฟล์ CSS ใน `assets/css/` และ import ใน `main.css`

### ปรับแต่ง API Endpoint
แก้ไขไฟล์ `.env`:
```
VITE_API=http://your-api-endpoint.com
```
