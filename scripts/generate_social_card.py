#!/usr/bin/env python3
"""
Generate high-resolution Open Graph social cards for Lagos State MOE&WR.
Dimensions:
1. moelagos-social-card.jpg: 1200 x 630 px (Standard OG landscape for WhatsApp, Facebook, Twitter, LinkedIn)
2. moelagos-social-square.jpg: 600 x 600 px (Square fallback)
3. favicon-32x32.png, apple-touch-icon.png: Favicons
"""

import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_landscape_card():
    width, height = 1200, 630
    card = Image.new('RGB', (width, height), color='#02381F')
    draw = ImageDraw.Draw(card)

    # 1. Subtle Elegant Gradient
    # From deep government green (#012d18) to vibrant emerald green (#025930)
    for y in range(height):
        ratio = y / height
        r = int(1 + (3 - 1) * ratio)
        g = int(45 + (89 - 45) * ratio)
        b = int(24 + (48 - 24) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # 2. Modern Decorative Geometry & Glow
    # Top accent bar (Lagos State Gold / Orange #FF6A00 and Yellow #FBBF24)
    draw.rectangle([(0, 0), (width, 8)], fill='#FF6A00')
    draw.rectangle([(0, 8), (width, 12)], fill='#FBBF24')
    
    # Bottom accent bar
    draw.rectangle([(0, height - 8), (width, height)], fill='#008751')

    # Subtle circular ambient glow in top-right and bottom-left
    overlay = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(overlay)
    glow_draw.ellipse([(900, -100), (1350, 350)], fill=(0, 135, 81, 45))
    glow_draw.ellipse([(-100, 350), (350, 800)], fill=(255, 106, 0, 25))
    glow_draw.ellipse([(450, 150), (950, 650)], fill=(0, 168, 107, 30))
    card = Image.alpha_composite(card.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(card)

    # 3. Load Fonts
    font_bold_path = "C:/Windows/Fonts/segoeuib.ttf"
    font_reg_path = "C:/Windows/Fonts/segoeui.ttf"
    font_semibold_path = "C:/Windows/Fonts/segoeuib.ttf"

    font_badge = ImageFont.truetype(font_bold_path, 20)
    font_title_large = ImageFont.truetype(font_bold_path, 54)
    font_title_sub = ImageFont.truetype(font_bold_path, 46)
    font_tagline = ImageFont.truetype(font_reg_path, 26)
    font_tag = ImageFont.truetype(font_bold_path, 20)
    font_footer = ImageFont.truetype(font_semibold_path, 22)

    # 4. Paste Lagos State Emblem / Crest
    crest_path = "public/uploads/2019/12/cropped-LAGOS-ICON.fw_.png"
    if os.path.exists(crest_path):
        crest_img = Image.open(crest_path).convert('RGBA')
        # Resize crest to 200x200
        crest_size = 210
        crest_resized = crest_img.resize((crest_size, crest_size), Image.Resampling.LANCZOS)
        
        # Create subtle white circular card backing for the crest
        crest_x = 90
        crest_y = 170
        
        # White circular pedestal backing with subtle gold border
        pedestal_radius = crest_size + 24
        ped_x0 = crest_x - 12
        ped_y0 = crest_y - 12
        ped_x1 = ped_x0 + pedestal_radius
        ped_y1 = ped_y0 + pedestal_radius
        
        draw.ellipse([(ped_x0 - 4, ped_y0 - 4), (ped_x1 + 4, ped_y1 + 4)], fill='#FBBF24')
        draw.ellipse([(ped_x0, ped_y0), (ped_x1, ped_y1)], fill='#FFFFFF')
        
        # Paste crest
        card.paste(crest_resized, (crest_x, crest_y), crest_resized)
        draw = ImageDraw.Draw(card)

    # 5. Right Content Column
    content_x = 350

    # Top Badge: LAGOS STATE GOVERNMENT
    badge_text = "LAGOS STATE GOVERNMENT • OFFICIAL DIGITAL PORTAL"
    badge_bbox = font_badge.getbbox(badge_text)
    badge_w = badge_bbox[2] - badge_bbox[0]
    badge_h = badge_bbox[3] - badge_bbox[1]
    
    badge_bg_x0 = content_x
    badge_bg_y0 = 120
    badge_bg_x1 = content_x + badge_w + 32
    badge_bg_y1 = badge_bg_y0 + badge_h + 16

    # Draw rounded rectangle badge
    draw.rounded_rectangle([(badge_bg_x0, badge_bg_y0), (badge_bg_x1, badge_bg_y1)], radius=10, fill=(0, 60, 35), outline='#FF6A00', width=2)
    draw.text((badge_bg_x0 + 16, badge_bg_y0 + 7), badge_text, font=font_badge, fill='#FFD54F')

    # Main Headline
    title_line1 = "Ministry of the Environment"
    title_line2 = "& Water Resources"
    
    draw.text((content_x, 185), title_line1, font=font_title_large, fill='#FFFFFF')
    draw.text((content_x, 250), title_line2, font=font_title_sub, fill='#34D399')

    # Horizontal Divider with gold dot
    draw.line([(content_x, 325), (content_x + 760, 325)], fill=(255, 255, 255, 60), width=1)
    draw.line([(content_x, 324), (content_x + 120, 324)], fill='#FF6A00', width=3)

    # Tagline / Mission
    tagline_text = "Securing a Cleaner, Greener, Healthier & Flood-Resilient Megacity."
    draw.text((content_x, 345), tagline_text, font=font_tagline, fill='#E2E8F0')

    # Agency & Service Badges (LAWMA | LASEPA | LASPARK | DRAINAGE)
    pills = [
        ("Drainage & Flood Control", '#059669'),
        ("LAWMA Waste Management", '#D97706'),
        ("LASEPA Pollution Standards", '#2563EB'),
        ("Water Resources & Sanitation", '#0D9488')
    ]
    
    pill_x = content_x
    pill_y = 405
    for text, color in pills:
        bbox = font_tag.getbbox(text)
        pw = bbox[2] - bbox[0]
        ph = bbox[3] - bbox[1]
        
        # Draw pill
        draw.rounded_rectangle([(pill_x, pill_y), (pill_x + pw + 24, pill_y + ph + 14)], radius=8, fill=(10, 40, 25), outline=color, width=1)
        draw.text((pill_x + 12, pill_y + 6), text, font=font_tag, fill='#F1F5F9')
        pill_x += pw + 36
        if pill_x > 1050:
            pill_x = content_x
            pill_y += 42

    # Bottom Official URL Banner
    footer_box_y0 = 540
    footer_box_y1 = 600
    draw.rounded_rectangle([(content_x, footer_box_y0), (width - 70, footer_box_y1)], radius=12, fill=(0, 35, 20), outline='#10B981', width=1)
    
    # Official Domain text
    draw.text((content_x + 24, footer_box_y0 + 17), "🌐  https://moelagos.gov.ng", font=font_footer, fill='#38BDF8')
    draw.text((content_x + 450, footer_box_y0 + 17), "•  Office of the Honourable Commissioner", font=font_footer, fill='#A7F3D0')

    # Save landscape social card
    output_path = "public/moelagos-social-card.jpg"
    card.save(output_path, "JPEG", quality=92, optimize=True)
    print(f"Generated {output_path} ({os.path.getsize(output_path)} bytes)")

    # Also save in dist/
    if os.path.exists("dist"):
        dist_output = "dist/moelagos-social-card.jpg"
        card.save(dist_output, "JPEG", quality=92, optimize=True)
        print(f"Generated {dist_output}")


def create_square_card():
    size = 600
    card = Image.new('RGB', (size, size), color='#02381F')
    draw = ImageDraw.Draw(card)

    # Gradient
    for y in range(size):
        ratio = y / size
        r = int(1 + (3 - 1) * ratio)
        g = int(45 + (89 - 45) * ratio)
        b = int(24 + (48 - 24) * ratio)
        draw.line([(0, y), (size, y)], fill=(r, g, b))

    # Gold accent
    draw.rectangle([(0, 0), (size, 6)], fill='#FF6A00')
    draw.rectangle([(0, size - 6), (size, size)], fill='#008751')

    # Crest
    crest_path = "public/uploads/2019/12/cropped-LAGOS-ICON.fw_.png"
    if os.path.exists(crest_path):
        crest_img = Image.open(crest_path).convert('RGBA')
        crest_size = 190
        crest_resized = crest_img.resize((crest_size, crest_size), Image.Resampling.LANCZOS)
        
        cx = (size - crest_size) // 2
        cy = 50
        
        # Pedestal
        draw.ellipse([(cx - 10, cy - 10), (cx + crest_size + 10, cy + crest_size + 10)], fill='#FFFFFF')
        card.paste(crest_resized, (cx, cy), crest_resized)
        draw = ImageDraw.Draw(card)

    font_bold_path = "C:/Windows/Fonts/segoeuib.ttf"
    font_reg_path = "C:/Windows/Fonts/segoeui.ttf"

    font_h1 = ImageFont.truetype(font_bold_path, 30)
    font_h2 = ImageFont.truetype(font_bold_path, 24)
    font_sub = ImageFont.truetype(font_reg_path, 18)
    font_link = ImageFont.truetype(font_bold_path, 20)

    # Texts centered
    t1 = "LAGOS STATE MINISTRY OF THE"
    t2 = "ENVIRONMENT & WATER RESOURCES"
    t3 = "Cleaner, Greener, Healthier & Flood-Resilient"
    t4 = "moelagos.gov.ng"

    for y_pos, text, font, color in [
        (280, t1, font_h2, '#FDE047'),
        (320, t2, font_h1, '#FFFFFF'),
        (375, t3, font_sub, '#E2E8F0'),
        (430, "Official State Government Portal", font_sub, '#34D399'),
        (510, t4, font_link, '#38BDF8')
    ]:
        bbox = font.getbbox(text)
        w = bbox[2] - bbox[0]
        draw.text(((size - w) // 2, y_pos), text, font=font, fill=color)

    # Pill for URL
    bbox = font_link.getbbox(t4)
    lw = bbox[2] - bbox[0]
    draw.rounded_rectangle([((size - lw) // 2 - 20, 500), ((size + lw) // 2 + 20, 545)], radius=10, outline='#38BDF8', width=2)

    output_path = "public/moelagos-social-square.jpg"
    card.save(output_path, "JPEG", quality=92, optimize=True)
    print(f"Generated {output_path} ({os.path.getsize(output_path)} bytes)")

    if os.path.exists("dist"):
        dist_output = "dist/moelagos-social-square.jpg"
        card.save(dist_output, "JPEG", quality=92, optimize=True)


def create_favicons():
    crest_path = "public/uploads/2019/12/cropped-LAGOS-ICON.fw_.png"
    if os.path.exists(crest_path):
        img = Image.open(crest_path).convert('RGBA')
        
        # 32x32
        fav32 = img.resize((32, 32), Image.Resampling.LANCZOS)
        fav32.save("public/favicon-32x32.png")
        fav32.save("public/favicon.ico")
        
        # 180x180
        fav180 = img.resize((180, 180), Image.Resampling.LANCZOS)
        fav180.save("public/apple-touch-icon.png")
        
        # Also copy legacy WordPress names so anything cached won't 404
        os.makedirs("public/wp-content/uploads/2019/12", exist_ok=True)
        fav32.save("public/wp-content/uploads/2019/12/cropped-LAGOS-ICON.fw_-32x32.png")
        fav180.save("public/wp-content/uploads/2019/12/cropped-LAGOS-ICON.fw_-180x180.png")
        
        # Also create DSC_0126-scaled.jpg legacy fallback
        os.makedirs("public/uploads/2025/02", exist_ok=True)
        os.makedirs("public/wp-content/uploads/2025/02", exist_ok=True)
        
        card = Image.open("public/moelagos-social-card.jpg")
        card.save("public/uploads/2025/02/DSC_0126-scaled.jpg", "JPEG", quality=90)
        card.save("public/wp-content/uploads/2025/02/DSC_0126-scaled.jpg", "JPEG", quality=90)
        print("Generated favicons and legacy fallbacks successfully.")

if __name__ == "__main__":
    create_landscape_card()
    create_square_card()
    create_favicons()
