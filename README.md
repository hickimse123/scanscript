# 📝 ScanScript Studio v1.0

ScanScript Studio, manga, manhwa ve webtoon çevirmenlerinin çalışma hızını katlamak ve tamamen tarayıcı içerisinden kopmadan çeviri yapabilmelerini sağlamak amacıyla geliştirilmiş gömülü bir **Chrome Uzantısıdır**. 

Herhangi bir sekmede tek bir tıkla açılır, sitenin orijinal yapısını bozmadan sağ tarafa jilet gibi yerleşir.

## ✨ Öne Çıkan Özellikler

*   **Canlı İstatistik Motoru:** Karakter, kelime ve tahmini balon (konuşma satırı) sayılarını hiçbir takılma olmadan anlık olarak hesaplar.
*   **BÜYÜK HARF Senkronizasyonu:** Tek tıkla tüm metni Türkçe kurallarına uygun şekilde (`ı -> I`, `i -> İ`) büyük harfe çevirir, sayaçları anında günceller.
*   **Akıllı Kısayollar:** 
    *   `Tab`: Satır başındaki karakter isminin yanına otomatik olarak `: ` ekler (Örn: `Kemal: `).
    *   `Ctrl + Enter`: Otomatik olarak bir sonraki sayfanın ayracını fırlatır (`=== SAYFA 1 ===`).
*   **Gelişmiş Arayüz Kontrolleri:** Panel genişliğini mouse ile sürükleyerek ayarlayabilir; şeffaflık, yazı boyutu ve satır aralığı slider'ları ile editörü gözünüze göre optimize edebilirsiniz.
*   **Otomatik Kayıt (Auto-Save):** Yazdığınız her şey tarayıcı hafızasına site bazlı olarak kaydedilir. Sayfa kapansa da çeviriniz kaybolmaz.
*   **Tek Tıkla Çıktı Almak:** Çevirinizi anında `.txt` veya Microsoft Word formatına tam uyumlu biçimlendirilmiş `.docx` olarak indirebilirsiniz.

## 🛠️ Kurulum Notları

Eklentiyi yerel olarak tarayıcınıza yüklemek için şu adımları takip edin:

1.  Bu depodaki tüm dosyaları (`manifest.json`, `background.js`, `content.js`) bilgisayarınızda açacağınız `ScanScript` adlı bir klasörün içine indirin.
2.  Google Chrome'u açın ve adres çubuğuna `chrome://extensions/` yazarak uzantılar sayfasına gidin.
3.  Sağ üst köşede bulunan **"Geliştirici Modu"** (Developer Mode) anahtarını aktif hale getirin.
4.  Sol üstte çıkan **"Paketlenmemiş öğe yükle"** (Load unpacked) butonuna tıklayın ve dosyaların bulunduğu klasörü seçin.
5.  Uzantı tarayıcınıza eklenecektir. İstediğiniz bir manga sitesine girip uzantı simgesine basarak paneli tamamen gizleyebilir veya açabilirsiniz!

## 📜 Lisans
Bu proje MIT Lisansı ile korunmaktadır. Özgürce geliştirebilir ve toplulukla paylaşabilirsiniz.
