# Interactive Investment Map

منصة ويب لإدارة الفرص الاستثمارية وتحليلها وعرضها على خريطة ولوحات مؤشرات.
هذا المستودع **نسخة تطوير مستقلة**، وليس المشروع المنشور على Render.
لا تربط هذا المستودع بخدمات النشر الأصلية، ولا تضع فيه عناوين أو بيانات اتصال بقاعدة الإنتاج.

## البنية

- `backend/`: FastAPI + SQLAlchemy + PostgreSQL (psycopg2).
  - `app/main.py`: التطبيق، ومسارات `/api/*` (الفرص، القطاعات، البيانات المالية، الوحدات الإدارية، البنية التحتية، فحص الصحة).
  - `app/database.py`: الاتصال بالقاعدة، ويقرأ `DATABASE_URL` من `backend/.env`.
  - `app/services/opportunity_service.py`: جلب فرصة كاملة حسب الرمز.
  - `app/ai/`: محرك التحليل الاستثماري القائم على القواعد (`analyzer.py`, `scoring.py`, `schemas.py`, `router.py`)، ومساره `POST /api/ai/opportunities/{code}/analyze`.
  - `import_google_sheets.py`: استيراد بيانات من Google Sheets.
- `frontend/`: React 19 + TypeScript + Vite + Tailwind، مبني على قالب TailAdmin. الخرائط بـ Leaflet والرسوم بـ ApexCharts.
  - `src/pages/`: صفحات المنصة (لوحة التحكم، الفرص، الخريطة، القطاعات، التقارير...). بعض الصفحات والمكونات من القالب غير مستخدمة (ecommerce, videos, calendar...).
  - `src/services/opportunityService.ts` و`opportunityApi.ts`: الاتصال بالخلفية.
- `investment_db.sql`: هيكل القاعدة. `investment_db_inserts.sql`: الهيكل + البيانات.
  عند تشغيل الخلفية على قاعدة بلا جدول `investment_opportunities`، تستورد `seed_database()` الملف الثاني تلقائياً.

## التشغيل المحلي (Windows / PowerShell)

الخلفية (من مجلد `backend`):

```powershell
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env     # ثم ضع DATABASE_URL الصحيح
python -m uvicorn app.main:app --reload
```

- العنوان: `http://127.0.0.1:8000`، والتوثيق: `/docs`، وفحص الصحة: `/api/health`.
- مثال: `DATABASE_URL=postgresql+psycopg2://postgres:كلمة_المرور@127.0.0.1:5432/investment_db`.
  الرموز الخاصة في كلمة المرور يجب ترميزها (`@` تصبح `%40`).
- وضع `--reload` لا يلتقط تغيير `.env`، فأعد تشغيل الخلفية بعد تعديله.

الواجهة (من مجلد `frontend`):

```powershell
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

- إن منعت PowerShell سكربتات npm: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` أو استخدم `npm.cmd`.
- عنوان الخلفية يُقرأ من `VITE_API_URL` (الافتراضي `http://127.0.0.1:8000`)، انظر `frontend/.env.example`.

## ملاحظات عمل

- لا ترفع ملفات `.env` أو كلمات مرور أو أي بيانات اتصال. `.env.example` فقط مسموح.
- CORS في الخلفية يسمح افتراضياً بـ `localhost:5173`؛ للمنافذ والنطاقات الأخرى استخدم المتغير `CORS_ORIGINS` (قائمة مفصولة بفواصل).
- أخطاء 5xx تعيد رسالة عامة للعميل، والسبب الحقيقي يُطبع في طرفية الخلفية.
- لا يوجد حالياً اختبارات تلقائية. تحقق من التعديلات بتشغيل الخلفية والواجهة ومراجعة `/docs`.
- شيفرة المنصة ومعظم التعليقات بالعربية؛ حافظ على أسلوب الملف الذي تعدّله.
