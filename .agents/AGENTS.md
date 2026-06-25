# Cafe Content Curation Guidelines

Whenever extracting images or adding new cafes to the database (`src/data.ts` or via UI), STRICTLY follow these curation rules:

1. **Main Gallery & Thumbnail Images:**
   - **Priority:** Interior and Exterior atmosphere/vibe shots.
   - The gallery should be predominantly aesthetic interior or exterior photos of the cafe.
   - You may include a maximum of 1 or 2 food/beverage images in the gallery to show presentation, but the vibe is most important.

2. **Signature Menu (Featured Dishes):**
   - **Priority:** Strictly food and beverage close-ups.
   - Do not use interior/exterior shots for the `featuredMenu` items. Use high-quality photos of the actual dishes/drinks.

3. **Menu Cards (`menuImages`):**
   - The District.in website has 100% accurate menu card images for every cafe. Ensure you grab the literal menu pages from Zomato/District for the `menuImages` array so users can read the physical menu.

4. **Sources:**
   - If Zomato/District does not have enough high-quality interior images, fall back to Google Maps Photos or Google Image Search to fulfill the interior/exterior quota.
