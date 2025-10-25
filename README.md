# 📘 Playwright - How to Run & Setup

## ✅ Requirements
ก่อนเริ่มต้นต้องมี:
| Tool | Version |
|------|----------|
| Node.js | >= 16 |
| npm | >= 8 |
| Git | (optional) |

ตรวจสอบเวอร์ชัน:
```bash
node -v
npm -v
```

---

## 🚀 1. Installation
ติดตั้ง dependencies:
```bash
npm install
```
ติดตั้ง Playwright พร้อม Browser:
```bash
npx playwright install
```

---

## 📂 2. Project Structure (ตัวอย่าง)
```
/tests
  ├─ registration-success.spec.ts
/playwright.config.ts
/package.json
```

---

## ▶️ 3. Running Tests
| คำสั่ง | ความหมาย |
|--------|-----------|
| `npx playwright test` | รันทดสอบทั้งหมด |
| `npx playwright test tests/registration.spec.ts` | รันไฟล์เดียว |
| `npx playwright test --headed` | แสดง UI browser |
| `npx playwright test --debug` | เปิด debug mode |
| `npx playwright test --project=chromium` | รันเฉพาะ Chrome/Chromium |

ตัวอย่าง:
```bash
npx playwright test tests/registration.spec.ts --headed
```

---

## 📊 4. Test Report
เปิดรายงานหลังรันเสร็จ:
```bash
npx playwright show-report
```

---

## ⚙️ 5. Useful Options
| Option | Description |
|--------|-------------|
| `--grep "keyword"` | รันเฉพาะ test ที่ตรงกับ keyword |
| `--workers=1` | รันแบบ 1-thread (กัน flakiness) |
| `--repeat-each=3` | รันซ้ำทุก test 3 รอบ |

ตัวอย่าง:
```bash
npx playwright test --grep "Email" --headed
```

---

## 🧪 6. Describe Block Example
```ts
test.describe('Email Validation', () => {
  test('Invalid email - missing @', async ({ page }) => { /* ... */ });
  test('Invalid email - missing dot', async ({ page }) => { /* ... */ });
  test('Valid email', async ({ page }) => { /* ... */ });
});
```


## 📎 Additional Notes
- ควรใช้ `data-testid` แทน xpath หรือ css selectors เพื่อลด flakiness
- ใช้ `--headed` ตอน debug
- ใช้ `--debug` เพื่อเปิด inspector ของ Playwright

---

## ✅ Ready to Use
หลัง config เสร็จ สามารถเริ่มเขียน test และรันได้ทันทีด้วยคำสั่ง
```bash
npx playwright test
```

