# webGtuverse

**Next.js 15 + React 19 tabanlı, Vaul, date-fns 4 ve React Day Picker 9 ile geliştirilmiş web uygulaması.**

---

## 📥 Projeyi İndirme & Kurulum

1. **Repository’yi klonlayın**  
   ```bash
   git clone https://github.com/GTUVERSE/webGtuverse.git
   cd webGtuverse
Bağımlılıkları yükleyin

bash
Kopyala
Düzenle
npm install
Ortam Değişkenlerini Ayarlayın

Eğer bir .env.example dosyası varsa çoğaltın:

bash
Kopyala
Düzenle
cp .env.example .env.local
.env.local içindeki anahtarları kendi API anahtarlarınız, veritabanı URL’leri vb. ile doldurun.

🚀 Geliştirme Modu
Canlı yeniden yüklemeli geliştirme sunucusunu başlatmak için:

bash
Kopyala
Düzenle
npm run dev
Sunucu http://localhost:3000 adresinde çalışır.

Kodda yaptığınız değişiklikler anında tarayıcıya yansır.

🔍 Kod Kalitesi Kontrolleri
Lint (ESLint):

bash
Kopyala
Düzenle
npm run lint
Tip Denetimi (TypeScript):

bash
Kopyala
Düzenle
npm run type-check
📦 Üretim (Production) Modu
Optimize Edilmiş Build Oluşturma

bash
Kopyala
Düzenle
npm run build
Bu komut, .next klasöründe statik ve dinamik sayfalarınızı üretir.

Üretim Sunucusunu Başlatma

bash
Kopyala
Düzenle
npm start
Sunucu yine http://localhost:3000 üzerinde çalışır.

Artık geliştirme araçları kapalı, sadece derlenmiş kod sunuluyor.

⚙️ Kullanılan Teknolojiler
Framework: Next.js 15

UI Kit & Stil: Tailwind CSS + Shadcn/UI

Durum Yönetimi: Vaul 1.x

Tarih İşlemleri: date-fns 4

Tarih Seçici: React Day Picker 9

Test: Jest & React Testing Library (isteğe bağlı)

🤝 Katkıda Bulunma
Reposu fork’layın

Yeni bir branch açın:

bash
Kopyala
Düzenle
git checkout -b feature/yeni-özellik
Değişikliklerinizi commit edin:

bash
Kopyala
Düzenle
git commit -m "feat: açıklayıcı commit mesajı"
Branch’inizi push’layın ve bir Pull Request açın.
