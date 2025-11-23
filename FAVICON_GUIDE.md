# 🎨 Favicon Setup Guide

Favicon untuk Verita Truth Navigator sudah di-setup dengan SVG format.

## 📁 Files

- `public/favicon.svg` - SVG favicon (modern, scalable)
- `public/favicon.ico` - Legacy ICO format (untuk browser lama)
- `public/favicon.png` - PNG fallback
- `public/apple-touch-icon.png` - iOS home screen icon

## 🎨 Current Design

Favicon menggunakan design shield dengan checkmark dan huruf "V" untuk Verita:
- **Color**: Blue (#2563eb) - Trust & verification theme
- **Icon**: Shield dengan checkmark - Protection & verification
- **Letter**: "V" - Verita branding

## 🔄 Update Favicon

### Option 1: Update SVG (Recommended)

1. Edit `public/favicon.svg`
2. Design tools: Figma, Illustrator, atau online SVG editor
3. Keep viewBox: `0 0 64 64`
4. Save dan replace file

### Option 2: Generate dari Image

1. Buat design di Figma/Photoshop (64x64 atau 512x512)
2. Export sebagai PNG
3. Convert ke favicon formats:
   - **Online tools:**
     - [Favicon.io](https://favicon.io/) - Generate dari image
     - [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive generator
   - **Command line:**
     ```bash
     # Install imagemagick
     convert favicon.png -resize 16x16 favicon-16x16.png
     convert favicon.png -resize 32x32 favicon-32x32.png
     ```

### Option 3: Generate ICO & PNG

```bash
# Generate ICO dari SVG (butuh ImageMagick)
convert -background none -resize 32x32 public/favicon.svg public/favicon.ico

# Generate PNG dari SVG
convert -background none -resize 512x512 public/favicon.svg public/favicon.png
convert -background none -resize 180x180 public/favicon.svg public/apple-touch-icon.png
```

## 📝 HTML Reference

Favicon sudah di-reference di `index.html`:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## ✅ Browser Support

- **Modern browsers**: SVG favicon (Chrome, Firefox, Safari, Edge)
- **Legacy browsers**: ICO fallback
- **iOS**: Apple touch icon untuk home screen

## 🎯 Design Tips

1. **Simple & Clear**: Favicon kecil (16x16 atau 32x32), jadi design harus simple
2. **High Contrast**: Pastikan terlihat jelas di berbagai background
3. **Brand Colors**: Gunakan brand colors Verita (blue untuk trust)
4. **Scalable**: SVG lebih baik karena scalable tanpa quality loss

## 🔗 Resources

- [Favicon Best Practices](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#providing_icons_for_different_usage_contexts)
- [Favicon.io](https://favicon.io/) - Free favicon generator
- [RealFaviconGenerator](https://realfavicongenerator.net/) - Comprehensive favicon generator

---

*Current favicon: Shield with checkmark and "V" letter in blue*

