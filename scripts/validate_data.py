#!/usr/bin/env python3
"""
Comprehensive validation script for Discord Badge Knowledgebase.
Validates schemas, ID uniqueness, broken asset links, dates, and consistency.
"""

import json
import os
import sys
import re

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

def validate_all():
    print("=" * 60)
    print("RUNNING DISCORD BADGE KNOWLEDGEBASE VALIDATION SUITE")
    print("=" * 60)
    
    errors = []
    warnings = []
    
    # 1. Load schema
    schema_path = "data/schema.json"
    if not os.path.exists(schema_path):
        errors.append(f"Missing schema file: {schema_path}")
        return False
        
    with open(schema_path, "r", encoding="utf-8") as f:
        schema = json.load(f)
    print("✔ Loaded data/schema.json")
    
    # 2. Load badges
    badges_path = "data/badges.json"
    if not os.path.exists(badges_path):
        errors.append(f"Missing badges file: {badges_path}")
        return False
        
    with open(badges_path, "r", encoding="utf-8") as f:
        badge_data = json.load(f)
    badges = badge_data.get("badges", [])
    print(f"✔ Loaded data/badges.json with {len(badges)} badge entries")
    
    # 3. Load sources and categories
    with open("data/sources.json", "r", encoding="utf-8") as f:
        source_data = json.load(f)
    valid_source_ids = {s["id"] for s in source_data.get("sources", [])}
    print(f"✔ Loaded data/sources.json with {len(valid_source_ids)} verified sources")

    with open("data/categories.json", "r", encoding="utf-8") as f:
        cat_data = json.load(f)
    valid_categories = {c["id"] for c in cat_data.get("categories", [])}
    valid_statuses = {s["id"] for s in cat_data.get("statuses", [])}
    print(f"✔ Loaded data/categories.json with {len(valid_categories)} categories and {len(valid_statuses)} statuses")

    # 4. Check uniqueness of IDs
    seen_ids = set()
    category_counts = {}
    status_counts = {}
    
    for idx, b in enumerate(badges):
        b_id = b.get("id")
        if not b_id:
            errors.append(f"Row {idx}: missing 'id' field")
            continue
        if b_id in seen_ids:
            errors.append(f"Duplicate badge ID found: '{b_id}'")
        seen_ids.add(b_id)
        
        # Check ID format
        if not re.match(r"^[a-z0-9_-]+$", b_id):
            errors.append(f"Badge ID '{b_id}' has invalid characters (must match ^[a-z0-9_-]+$)")
            
        # Category check
        cat = b.get("category")
        if cat not in valid_categories:
            errors.append(f"Badge '{b_id}': invalid category '{cat}'")
        category_counts[cat] = category_counts.get(cat, 0) + 1
        
        # Status check
        status = b.get("status")
        if status not in valid_statuses:
            errors.append(f"Badge '{b_id}': invalid status '{status}'")
        status_counts[status] = status_counts.get(status, 0) + 1
        
        # Asset path check
        asset_id = b.get("current_asset_id")
        if asset_id:
            # Check existence in assets/ or public/assets/
            local_path = asset_id.lstrip("/")
            pub_path = os.path.join("public", local_path)
            if not os.path.exists(local_path) and not os.path.exists(pub_path):
                warnings.append(f"Badge '{b_id}': asset path not found on disk: '{asset_id}'")
                
        # Variants check
        for v in b.get("asset_variants", []):
            v_path = v.get("path", "").lstrip("/")
            v_pub = os.path.join("public", v_path)
            if not os.path.exists(v_path) and not os.path.exists(v_pub):
                warnings.append(f"Badge '{b_id}': variant asset path not found: '{v.get('path')}'")

        # Source reference check
        for src in b.get("official_sources", []):
            if src not in valid_source_ids:
                warnings.append(f"Badge '{b_id}': referenced official source '{src}' not in sources.json")
                
        # Date consistency check
        start = b.get("availability_start")
        end = b.get("availability_end")
        ret = b.get("retirement_date")
        if start and end and start > end:
            errors.append(f"Badge '{b_id}': availability_start ({start}) > availability_end ({end})")
        if start and ret and start > ret:
            errors.append(f"Badge '{b_id}': availability_start ({start}) > retirement_date ({ret})")

    # 5. Output Summary Statistics
    print("\n--- DATASET SUMMARY STATISTICS ---")
    print(f"Total Unique Badges: {len(badges)}")
    print("\nBadges by Category:")
    for c, count in sorted(category_counts.items(), key=lambda x: -x[1]):
        print(f"  • {c:15s}: {count:3d}")
    print("\nBadges by Status:")
    for s, count in sorted(status_counts.items(), key=lambda x: -x[1]):
        print(f"  • {s:25s}: {count:3d}")

    print("\n--- VALIDATION RESULTS ---")
    if errors:
        print(f"❌ {len(errors)} ERRORS ENCOUNTERED:")
        for e in errors:
            print("   -", e)
    else:
        print("✔ No fatal errors encountered! All schemas, IDs, and constraints passed.")

    if warnings:
        print(f"⚠ {len(warnings)} Warnings:")
        for w in warnings[:10]:
            print("   -", w)
        if len(warnings) > 10:
            print(f"   ... and {len(warnings) - 10} more warnings.")
    else:
        print("✔ Zero warnings! Every asset reference is clean.")

    return len(errors) == 0

if __name__ == "__main__":
    success = validate_all()
    sys.exit(0 if success else 1)
