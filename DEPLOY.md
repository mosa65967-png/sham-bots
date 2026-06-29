# 🚀 دليل النشر على Vercel (مجاني تماماً)

## 🎯 الخطوة 1: إنشاء حساب على Vercel
1. اذهب إلى https://vercel.com
2. سجل بحساب GitHub (مجاني، لا يحتاج بطاقة ائتمان)
3. فعّل حسابك عبر الإيميل

## 📦 الخطوة 2: رفع المشروع على GitHub
```bash
# في مجلد المشروع
git init
git add .
git commit -m "Initial commit - Sham Bots"
# أنشئ مستودع على GitHub باسم sham-bots
git remote add origin https://github.com/your-username/sham-bots.git
git push -u origin main
```

## ▲ الخطوة 3: النشر على Vercel
1. في Vercel، اضغط "Add New" → "Project"
2. اختر مستودع `sham-bots` من GitHub
3. الإعدادات التلقائية (لا تغير شيئاً):
   - Framework: Next.js
   - Build Command: `npx next build`
   - Output: `.next`
4. أضف المتغيرات البيئية:
   - `NEXTAUTH_SECRET` = (أي نص عشوائي طويل)
5. اضغط "Deploy"

## 🌐 الخطوة 4: النطاق المجاني
- بعد النشر، ستحصل على نطاق مثل:
  `https://sham-bots.vercel.app`
- هذا النطاق مجاني بالكامل ويعمل HTTPS

## 💎 الخطوة 5: نطاق مخصص (للمستقبل)
- اشتري نطاق (مثلاً sham.sy)
- في Vercel: Project → Settings → Domains
- أضف النطاق وغير DNS

## 📊 الخدمات المجانية المستخدمة

| الخدمة | الاستخدام | الحد المجاني |
|--------|-----------|-------------|
| Vercel | الاستضافة | 100GB/month |
| Supabase | قاعدة بيانات | 500MB, 50k rows |
| Cloudinary | الصور والفيديو | 25GB |
| Google Gemini | الذكاء الاصطناعي | 60 طلب/دقيقة |
| GitHub | الكود المصدري | غير محدود |

## ⚡ بعد النشر
- اذهب إلى: `https://sham-bots.vercel.app`
- المنصة جاهزة للاستخدام!
