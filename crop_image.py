from PIL import Image
import os

img_path = r"d:\code new\fong 1\Join for faceless income secrets! 🔥.webp"
out_dir = r"d:\code new\fong 1\images"

if os.path.exists(img_path):
    img = Image.open(img_path)
    width, height = img.size
    print(f"Original image size: {width}x{height}")

    # 1. Crop top hero illustration
    # The top section goes from y=0 to around y=height * 0.42
    hero_crop = img.crop((0, 0, width, int(height * 0.425)))
    hero_crop.save(os.path.join(out_dir, "hero_exact.png"))

    # 2. Crop profile avatar
    # Avatar is located around x: 50%-90%, y: 48%-70%
    avatar_crop = img.crop((int(width * 0.48), int(height * 0.47), int(width * 0.88), int(height * 0.72)))
    avatar_crop.save(os.path.join(out_dir, "profile_exact.png"))

    print("Successfully cropped exact image assets!")
