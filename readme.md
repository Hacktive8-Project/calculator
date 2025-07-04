# Kalkulator Ilmiah Lengkap (Advanced Scientific Calculator)

Kalkulator ilmiah yang komprehensif dan modern, dibangun dengan HTML5, CSS3, dan JavaScript vanilla. Aplikasi ini menawarkan fungsi matematika tingkat lanjut dengan antarmuka yang intuitif dan responsif.

## 🌟 Fitur Utama

### Operasi Matematika Dasar

- Operasi aritmatika (penjumlahan, pengurangan, perkalian, pembagian)
- Operasi kurung buka/tutup untuk mengatur prioritas
- Desimal dan angka negatif
- Operator persentase (%)

### Fungsi Ilmiah

- **Trigonometri**: sin, cos, tan, arcsin, arccos, arctan
- **Trigonometri Hiperbolik**: sinh, cosh, tanh
- **Logaritma**: log (basis 10), ln (logaritma natural)
- **Akar**: akar kuadrat (√), akar kubik (∛)
- **Pangkat**: x^y, x², x³
- **Konstanta**: π (pi), e (euler)
- **Lainnya**: faktorial (n!), nilai absolut (|x|), resiprokal (1/x)

### Mode Sudut

- **DEG**: Mode derajat (0-360°)
- **RAD**: Mode radian (0-2π)

### Fungsi Memori

- **MC**: Memory Clear (hapus memori)
- **MR**: Memory Recall (panggil dari memori)
- **M+**: Memory Add (tambah ke memori)
- **M-**: Memory Subtract (kurangi dari memori)
- **MS**: Memory Store (simpan ke memori)

### Fitur Lanjutan

- **Riwayat Perhitungan**: Menyimpan dan menampilkan 50 perhitungan terakhir
- **Keyboard Support**: Dukungan input dari keyboard
- **Error Handling**: Penanganan kesalahan yang robust
- **Auto-save**: Riwayat disimpan di localStorage
- **Responsive Design**: Mendukung desktop, tablet, dan mobile

## 📁 Struktur File

```
Calculator/
├── index.html    # Struktur HTML utama dengan komponen UI lengkap
├── style.css     # Styling CSS3 dengan animasi dan responsive design
├── script.js     # Logika JavaScript untuk semua fungsi kalkulator
└── readme.md     # Dokumentasi proyek lengkap
```

## 🚀 Cara Memulai

### Instalasi

1. Clone atau download repository ini

   ```bash
   git clone <repository-url>
   cd Calculator
   ```

2. Buka `index.html` di web browser

   ```bash
   # Untuk Windows
   start index.html

   # Untuk macOS
   open index.html

   # Untuk Linux
   xdg-open index.html
   ```

3. Mulai menggunakan kalkulator!

### Persyaratan Sistem

- Web browser modern (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- JavaScript harus diaktifkan
- Tidak memerlukan koneksi internet (aplikasi offline)

## 📖 Deskripsi File

### index.html

Berisi struktur HTML lengkap kalkulator termasuk:

- **Header**: Judul dan toggle mode sudut (DEG/RAD)
- **Display Section**: Area tampilan utama dan riwayat
- **Scientific Functions**: 12 tombol fungsi ilmiah (sin, cos, tan, log, ln, dll.)
- **Memory Functions**: 5 tombol fungsi memori (MC, MR, M+, M-, MS)
- **Main Buttons**: Grid 4x4 tombol angka dan operasi dasar
- **Additional Functions**: 12 tombol fungsi tambahan (kurung, pangkat, absolut, dll.)
- **History Panel**: Panel riwayat perhitungan dengan overlay

### style.css

Menangani styling visual lengkap:

- **Modern Design**: Gradient background dengan glassmorphism effect
- **Grid Layout**: Sistem grid responsif untuk semua section
- **Button Animation**: Efek hover, ripple, dan shadow
- **Responsive Design**: Breakpoint untuk mobile dan tablet
- **Color Scheme**: Palet warna yang konsisten untuk setiap kategori tombol
- **History Panel**: Styling untuk overlay dan animasi
- **Error States**: Visual feedback untuk kondisi error

### script.js

Implementasi logika kalkulator komprehensif:

- **Expression Parser**: Parser untuk evaluasi ekspresi matematika kompleks
- **Scientific Functions**: Implementasi semua fungsi trigonometri dan logaritma
- **Angle Conversion**: Konversi otomatis antara derajat dan radian
- **Memory Management**: Sistem memori dengan indikator visual
- **History System**: Penyimpanan dan recall riwayat dengan localStorage
- **Keyboard Support**: Event handler untuk input keyboard
- **Error Handling**: Validasi input dan penanganan kesalahan
- **Display Management**: Update tampilan real-time dengan formatting

## 🎯 Cara Penggunaan

### Operasi Dasar

- **Input Angka**: Klik tombol angka 0-9 atau gunakan keyboard
- **Operasi Aritmatika**: Gunakan tombol +, −, ×, ÷
- **Desimal**: Klik tombol "." untuk menambahkan titik desimal
- **Sama Dengan**: Tekan "=" atau Enter untuk menghitung hasil
- **Clear**:
  - AC (All Clear): Hapus semua input
  - CE (Clear Entry): Hapus input terakhir
  - ⌫ (Backspace): Hapus satu digit terakhir

### Fungsi Ilmiah

```
sin(30)     → 0.5 (dalam mode DEG)
cos(π/3)    → 0.5 (dalam mode RAD)
log(100)    → 2
ln(e)       → 1
√(16)       → 4
2^3         → 8
5!          → 120
```

### Mode Sudut

- **DEG**: Input dalam derajat (default)
- **RAD**: Input dalam radian
- Toggle dengan mengklik tombol DEG/RAD

### Fungsi Memori

1. **Simpan ke Memori**: Masukkan angka → tekan MS
2. **Tambah ke Memori**: Masukkan angka → tekan M+
3. **Kurangi dari Memori**: Masukkan angka → tekan M-
4. **Panggil Memori**: Tekan MR
5. **Hapus Memori**: Tekan MC

### Riwayat Perhitungan

- Klik tombol "📜 Riwayat" untuk membuka panel riwayat
- Klik item riwayat untuk menggunakan hasil tersebut
- Klik "Hapus Riwayat" untuk menghapus semua riwayat

### Keyboard Shortcuts

- **Angka**: 0-9
- **Operasi**: +, -, \*, /, ^, %
- **Lainnya**:
  - Enter atau = : Hitung hasil
  - Escape : Clear All
  - Backspace : Hapus digit terakhir
  - Delete : Clear Entry
  - ( dan ) : Kurung

## 🔧 Teknologi yang Digunakan

- **HTML5**: Struktur semantik dan accessibility
- **CSS3**:
  - Flexbox dan Grid Layout
  - CSS Variables untuk theming
  - Animations dan Transitions
  - Media Queries untuk responsive design
- **JavaScript ES6+**:
  - Arrow Functions
  - Template Literals
  - Destructuring
  - Local Storage API
  - Event Handling

## 🌐 Kompatibilitas Browser

| Browser | Versi Minimum | Status             |
| ------- | ------------- | ------------------ |
| Chrome  | 80+           | ✅ Fully Supported |
| Firefox | 75+           | ✅ Fully Supported |
| Safari  | 13+           | ✅ Fully Supported |
| Edge    | 80+           | ✅ Fully Supported |
| Opera   | 67+           | ✅ Fully Supported |

## 📱 Responsive Design

### Desktop (1200px+)

- Layout penuh dengan semua fitur
- Grid 4 kolom untuk fungsi ilmiah
- Panel riwayat sebagai overlay

### Tablet (768px - 1199px)

- Layout kompak dengan semua fitur
- Grid 3 kolom untuk fungsi ilmiah
- Panel riwayat fullscreen

### Mobile (< 768px)

- Layout optimized untuk layar kecil
- Grid 3 kolom untuk fungsi ilmiah
- Font size yang disesuaikan
- Touch-friendly button size

## 🚀 Fitur Lanjutan

### Error Handling

- Validasi input untuk mencegah ekspresi invalid
- Penanganan division by zero
- Timeout untuk operasi yang memakan waktu lama
- Visual feedback untuk kondisi error

### Performance Optimization

- Efficient DOM manipulation
- Debounced keyboard input
- Lazy loading untuk history panel
- Optimized calculation algorithms

### User Experience

- Smooth animations dan transitions
- Visual feedback untuk setiap interaksi
- Consistent color coding untuk kategori tombol
- Auto-scroll pada display untuk ekspresi panjang

## 🔒 Keamanan

- **XSS Protection**: Sanitisasi input untuk mencegah script injection
- **Safe Evaluation**: Menggunakan Function constructor yang aman
- **Input Validation**: Validasi ketat untuk semua input matematika
- **Error Boundaries**: Penanganan error yang comprehensive

## 📊 Contoh Penggunaan

### Perhitungan Sederhana

```
2 + 3 × 4 = 14
(2 + 3) × 4 = 20
100 ÷ 4 = 25
```

### Perhitungan Ilmiah

```
sin(90°) = 1
cos(0°) = 1
tan(45°) = 1
log(1000) = 3
ln(e²) = 2
√(144) = 12
2³ = 8
5! = 120
```

### Perhitungan Kompleks

```
sin(30°) + cos(60°) = 1
(2 + 3)² × √(16) = 100
ln(e) + log(100) = 3
π × 2² = 12.566...
```

## 🛠️ Pengembangan Lebih Lanjut

### Fitur yang Dapat Ditambahkan

- [ ] Unit converter (panjang, massa, suhu)
- [ ] Graphing calculator mode
- [ ] Matrix calculations
- [ ] Complex number support
- [ ] Equation solver
- [ ] Export history to file
- [ ] Multiple themes
- [ ] Voice input
- [ ] API integration untuk data real-time

### Optimasi Kode

- [ ] Modularisasi JavaScript
- [ ] Implementation of Web Workers untuk perhitungan berat
- [ ] Service Worker untuk offline support
- [ ] Progressive Web App (PWA) features

## 🐛 Troubleshooting

### Masalah Umum

**1. Calculator tidak merespons**

- Pastikan JavaScript diaktifkan di browser
- Refresh halaman
- Check browser console untuk error

**2. Hasil perhitungan tidak akurat**

- Gunakan parentheses untuk mengatur prioritas operasi
- Pastikan mode sudut (DEG/RAD) sesuai dengan kebutuhan

**3. Riwayat tidak tersimpan**

- Pastikan localStorage diaktifkan di browser
- Check private browsing mode

**4. Layout tidak responsif**

- Clear browser cache
- Update browser ke versi terbaru

## 📄 Lisensi

MIT License

Copyright (c) 2025 Calculator Project

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 👨‍💻 Kontributor

- **AnselZorro** - _Initial work and development_

## 🙏 Acknowledgments

- Inspirasi design dari kalkulator iOS dan Google Calculator
- Mathematical functions menggunakan JavaScript Math API
- Icons dan symbols menggunakan Unicode characters
- Responsive design patterns dari CSS Grid dan Flexbox specifications

---

**Dibuat dengan ❤️ untuk pendidikan dan pembelajaran**
