import os
from PIL import Image

def optimize_images(directory, max_width=1200, quality=80):
    print(f"Starting image optimization in: {directory}")
    total_old_size = 0
    total_new_size = 0
    converted_count = 0
    
    # Supported image extensions for optimization
    valid_exts = ('.png', '.jpg', '.jpeg', '.tiff')
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            ext = os.path.splitext(file)[1].lower()
            if ext in valid_exts:
                old_path = os.path.join(root, file)
                # Keep favicon and similar small files unmodified if they are special
                if 'fongrub1.png' in file or 'image.png' in file or '.git' in root:
                    continue
                
                # Check size
                old_size = os.path.getsize(old_path)
                total_old_size += old_size
                
                try:
                    with Image.open(old_path) as img:
                        width, height = img.size
                        
                        # Resize if larger than max_width
                        if width > max_width:
                            ratio = max_width / float(width)
                            new_height = int(float(height) * ratio)
                            # Handle different Pillow versions for resampling
                            try:
                                resample_method = Image.Resampling.LANCZOS
                            except AttributeError:
                                resample_method = Image.ANTIALIAS
                            
                            img = img.resize((max_width, new_height), resample_method)
                            print(f"Resized {file} from {width}x{height} to {max_width}x{new_height}")
                        
                        # New webp filename
                        new_filename = os.path.splitext(file)[0] + '.webp'
                        new_path = os.path.join(root, new_filename)
                        
                        # Save as WebP
                        img.save(new_path, 'WEBP', quality=quality)
                        new_size = os.path.getsize(new_path)
                        total_new_size += new_size
                        converted_count += 1
                        
                        reduction = (old_size - new_size) / (1024 * 1024)
                        print(f"Converted: {file} ({old_size/1024:.1f} KB) -> {new_filename} ({new_size/1024:.1f} KB). Saved {reduction:.2f} MB")
                        
                        # Delete original png/jpg to free space and keep build clean
                        os.remove(old_path)
                        
                except Exception as e:
                    print(f"Failed to process {file}: {e}")
                    
    print("\n--- Optimization Summary ---")
    print(f"Total files converted: {converted_count}")
    print(f"Original total size: {total_old_size / (1024 * 1024):.2f} MB")
    print(f"Optimized total size: {total_new_size / (1024 * 1024):.2f} MB")
    savings = total_old_size - total_new_size
    if total_old_size > 0:
        print(f"Total Space Saved: {savings / (1024 * 1024):.2f} MB ({(savings/total_old_size)*100:.1f}% reduction)")
    else:
        print("No files optimized.")

if __name__ == "__main__":
    # Optimize images in public directory
    public_images_dir = r"d:\code new\fong 1\public\images"
    optimize_images(public_images_dir)
