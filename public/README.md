# Public Assets Folder

This folder contains all the static assets for your Next.js application.

## 📹 Video Files

Place your hero section videos in this folder:

### Required Video Files:
- `hero-coffee-video-desktop.mp4` - Desktop version (1920x1080 or higher)
- `hero-coffee-video-mobile.mp4` - Mobile version (768x432 or similar)
- `hero-coffee-video.mp4` - Fallback video (any resolution)

### Video Specifications:
- **Format**: MP4 (H.264 codec recommended)
- **Desktop**: 1920x1080, 30fps, optimized for web
- **Mobile**: 768x432, 30fps, smaller file size
- **Fallback**: Any resolution, serves as backup

## 🖼️ Image Files

- `placeholder.svg` - Fallback image for slow connections
- `favicon.ico` - Website favicon
- `apple-touch-icon.png` - iOS app icon

## 📁 Folder Structure

```
public/
├── hero-coffee-video-desktop.mp4    # Desktop hero video
├── hero-coffee-video-mobile.mp4     # Mobile hero video
├── hero-coffee-video.mp4            # Fallback video
├── placeholder.svg                   # Fallback image
├── favicon.ico                      # Website icon
├── apple-touch-icon.png             # iOS icon
└── README.md                        # This file
```

## 🚀 Usage

The HeroSection component will automatically:
1. Detect screen size
2. Load appropriate video
3. Fall back to image if video fails
4. Switch videos on window resize

## 💡 Tips

- **Optimize videos** for web (compress, use appropriate bitrates)
- **Test on different devices** to ensure smooth playback
- **Keep file sizes reasonable** for fast loading
- **Use CDN** for production deployment if needed

## 🔧 Video Optimization

For best performance:
- Desktop: 2-5MB file size
- Mobile: 1-3MB file size
- Use tools like HandBrake or FFmpeg for compression
- Test loading times on slower connections
