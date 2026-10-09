import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";

export default function NewOpportunity() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageMeta
        title="إضافة فرصة استثمارية | خارطة الاستثمار الذكية"
        description="إضافة فرصة استثمارية جديدة"
      />

      <div dir="rtl" className="space-y-6">
        {/* العنوان */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            إضافة فرصة استثمارية
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            إدخال البيانات الأساسية للفرصة الاستثمارية الجديدة
          </p>
        </div>

        {/* النموذج */}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
          className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* الرمز */}
            <Field
              label="رمز الفرصة"
              name="code"
              placeholder="مثال: DZ-037"
            />

            {/* الاسم */}
            <Field
              label="اسم الفرصة"
              name="name"
              placeholder="أدخل اسم الفرصة الاستثمارية"
            />

            {/* القطاع */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                القطاع
              </label>

              <select
                name="sector"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="">اختر القطاع</option>
                <option value="عقاري">عقاري</option>
                <option value="سياحي">سياحي</option>
                <option value="زراعي">زراعي</option>
                <option value="تعدين">تعدين</option>
                <option value="صناعي">صناعي</option>
                <option value="بيئي">بيئي</option>
                <option value="بنية تحتية">بنية تحتية</option>
                <option value="خدمي">خدمي</option>
                <option value="نقل">نقل</option>
                <option value="صحي">صحي</option>
              </select>
            </div>

            {/* الموقع */}
            <Field
              label="الموقع"
              name="location"
              placeholder="المدينة أو المنطقة"
            />

            {/* القيمة */}
            <Field
              label="القيمة الاستثمارية"
              name="value"
              type="number"
              placeholder="القيمة بالمليون دولار"
            />

            {/* الحالة */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                الحالة
              </label>

              <select
                name="status"
                defaultValue="فرصة جديدة"
                className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-800 outline-none focus:border-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="فرصة جديدة">فرصة جديدة</option>
                <option value="قيد الدراسة">قيد الدراسة</option>
                <option value="نشطة">نشطة</option>
                <option value="جاهزة">جاهزة</option>
              </select>
            </div>

            {/* الوصف */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                وصف الفرصة
              </label>

              <textarea
                name="description"
                rows={5}
                placeholder="أدخل وصفًا مختصرًا للفرصة الاستثمارية..."
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* رسالة مؤقتة */}
          {submitted && (
            <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-400">
              تم تجهيز بيانات الفرصة. سيتم ربط الحفظ بقاعدة البيانات في الخطوة التالية.
            </div>
          )}

          {/* الأزرار */}
          <div className="mt-6 flex justify-start gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
            <button
              type="submit"
              className="rounded-lg bg-brand-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-brand-600"
            >
              حفظ الفرصة
            </button>

            <button
              type="reset"
              onClick={() => setSubmitted(false)}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/[0.03]"
            >
              مسح
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

function Field({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 text-sm text-gray-800 outline-none transition focus:border-brand-500 dark:border-gray-700 dark:text-white"
      />
    </div>
  );
}