#!/usr/bin/env python3
"""
Asset verification script for Discord Badge Knowledgebase.
Verifies file existence, SHA-256 checksums, identifies exact binary duplicates, and writes asset manifest.
"""

import os
import sys
import hashlib
import json

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

def check_assets():
    print("Checking assets in assets/ directory...")
    asset_dir = "assets"
    manifest = []
    hashes = {}
    duplicates = []

    for root, dirs, files in os.walk(asset_dir):
        for f in files:
            path = os.path.join(root, f)
            rel = os.path.relpath(path, ".")
            with open(path, "rb") as fp:
                content = fp.read()
                sha256 = hashlib.sha256(content).hexdigest()
                size = len(content)

            ext = os.path.splitext(f)[1].lower()
            if sha256 in hashes:
                duplicates.append((rel, hashes[sha256]))
            else:
                hashes[sha256] = rel

            manifest.append({
                "path": rel,
                "filename": f,
                "format": ext.lstrip("."),
                "size_bytes": size,
                "sha256": sha256
            })

    print(f"Total asset files cataloged: {len(manifest)}")
    print(f"Unique file content hashes: {len(hashes)}")
    if duplicates:
        print(f"Detected {len(duplicates)} byte-identical asset pairs (e.g. cross-referenced variants):")
        for d in duplicates[:5]:
            print(f"  • {d[0]} == {d[1]}")

    with open("data/asset_manifest.json", "w", encoding="utf-8") as f:
        json.dump({"total_assets": len(manifest), "assets": manifest}, f, indent=2)
    print("✔ Saved asset manifest to data/asset_manifest.json")

if __name__ == "__main__":
    check_assets()
