import type { playerType } from "@/types/player";

// type helper ให้ TypeScript รู้ type ของ XLSX
type XLSXModule = typeof import("xlsx");

export const parsePlayerExcel = async (file: File): Promise<playerType[]> => {
  // กันไม่ให้เรียกจากฝั่ง server เผื่อโดนใช้ผิดที่
  if (import.meta.server) {
    throw new Error("parsePlayerExcel can only be used on the client.");
  }

  // 🔥 โหลด xlsx เฉพาะตอนอยู่ฝั่ง client เท่านั้น
  const XLSX: XLSXModule = await import("xlsx");

  const reader = new FileReader();

  const fileContent: string | ArrayBuffer | null = await new Promise(
    (resolve, reject) => {
      reader.onload = (e) => resolve(e.target?.result ?? null);
      reader.onerror = () => reject(new Error("เกิดข้อผิดพลาดในการอ่านไฟล์"));

      if (file.name.toLowerCase().endsWith(".csv")) {
        reader.readAsText(file, "UTF-8");
      } else {
        reader.readAsBinaryString(file);
      }
    }
  );

  if (!fileContent) {
    throw new Error("ไม่พบข้อมูลในไฟล์");
  }

  const workbook = XLSX.read(fileContent, {
    type: "binary",
    codepage: 874,
    cellText: true,
    cellDates: true,
    raw: true,
  });

  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  const jsonData = XLSX.utils.sheet_to_json(worksheet, {
    raw: false,
    defval: "",
    blankrows: false,
  });

  const importedPlayer: playerType[] = (jsonData as any[])
    .map((row) => {
      const lowerCasedKeys = Object.fromEntries(
        Object.entries(row).map(([k, v]) => [k.toLowerCase(), v])
      );

      const prefix = String(
        row["prefix"] || row["คำนำหน้า"] || lowerCasedKeys["prefix"] || ""
      );
      const first_name = String(
        row["firstName"] || row["ชื่อ"] || lowerCasedKeys["firstname"] || ""
      );
      const last_name = String(
        row["lastName"] || row["นามสกุล"] || lowerCasedKeys["lastname"] || ""
      );
      const member_id = String(
        row["member_id"] ||
          row["รหัสบัตรประชาชน/รหัสสมาชิก"] ||
          lowerCasedKeys["member_id"] ||
          ""
      );
      const position = String(
        row["position"] || row["สถานะ"] || lowerCasedKeys["position"] || ""
      );
      const status = String(
        row["active"] || row["เข้าร่วม"] || lowerCasedKeys["active"] || ""
      );

      const timestamp = String(
        row["timestamp"] ||
          row["วันที่"] ||
          row["เวลา"] ||
          lowerCasedKeys["timestamp"] ||
          ""
      );

      return {
        prefix,
        first_name,
        last_name,
        member_id,
        position,
        status,
        image: null,
        full_name: `${prefix ?? ""} ${first_name ?? ""} ${
          last_name ?? ""
        }`.trim(),
        room_id: "",
        timestamp,
      };
    })
    .filter((p) => p.first_name && p.first_name !== "ไม่ระบุชื่อ");

  return importedPlayer;
};