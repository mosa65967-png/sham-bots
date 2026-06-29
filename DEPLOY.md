# دليل النشر على Railway (مجاني)

## رفع التحديثات إلى GitHub
```bash
# في مجلد المشروع
git add .
git commit -m "رسالة التحديث"
git push
```

## النشر على Railway
- Railway متصل مع GitHub تلقائياً
- كل ما ترفع تحديثات لـ GitHub، Railway ينشرها تلقائياً
- رابط الموقع: https://sham-bots-production.up.railway.app

## الخدمات المجانية المستخدمة

| الخدمة | الاستخدام |
|--------|-----------|
| Railway | الاستضافة |
| Supabase | قاعدة بيانات (قريباً) |
| Google Gemini | الذكاء الاصطناعي |
| GitHub | الكود المصدري |

## متغيرات البيئة (Environment Variables)
- `NEXTAUTH_SECRET`: مفتاح سري للمصادقة
- `DATABASE_URL`: رابط قاعدة البيانات
- `GEMINI_API_KEY`: مفتاح Google Gemini API
