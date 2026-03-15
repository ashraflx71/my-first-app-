// اسم ذاكرة التخزين (يمكنك تغييره عند تحديث الموقع)
const cacheName = 'creative-2026-v1';

// الملفات التي سيتم حفظها لتعمل بدون إنترنت
const assets = [
  '/',
  '/index.html',
  // أضف هنا أي ملفات أخرى مثل الصور أو ملفات الـ CSS الخارجية
];

// 1. مرحلة التثبيت: حفظ الملفات في ذاكرة الهاتف
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('جاري حفظ ملفات الموقع في الذاكرة...');
      return cache.addAll(assets);
    })
  );
});

// 2. مرحلة التفعيل: تنظيف الذاكرة القديمة
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

// 3. مرحلة جلب البيانات: عرض الموقع من الذاكرة إذا انقطع الإنترنت
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
