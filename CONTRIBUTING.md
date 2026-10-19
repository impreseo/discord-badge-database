# Contributing to Discord Badge Knowledgebase

Thank you for helping maintain the most accurate, evidence-backed Discord badge knowledgebase and archive!

## How to Contribute

### 1. Adding a New Badge or Updating Requirements
1. Check `data/schema.json` to verify required fields.
2. Edit or add the record to `data/badges.json`.
3. If new artwork is available, place the verified SVG or high-resolution PNG in `assets/<category>/`.
4. Run validation:
   ```bash
   python3 scripts/validate_data.py
   python3 scripts/check_assets.py
   ```
5. Regenerate documentation:
   ```bash
   python3 scripts/generate_readme.py
   ```

### 2. Evidence Standards
- **Tier 1 (Official)**: Link official Discord Help Center articles, Developer Docs, or blog announcements.
- **Tier 2 (Technical)**: Provide reproduction steps, API flag values, or public Discord asset hashes.
- **Tier 3 (Community)**: Link established GitHub repository commits or community changelogs.
- Speculative or fan-created badge designs must not be marked as official or upcoming.

### 3. Pull Request Guidelines
- All PRs run the automated `.github/workflows/validate.yml` workflow.
- Ensure zero errors from `scripts/validate_data.py`.
- Keep commit messages descriptive (e.g. `feat(badges): add 2026 quest collectible and update nitro milestones`).
