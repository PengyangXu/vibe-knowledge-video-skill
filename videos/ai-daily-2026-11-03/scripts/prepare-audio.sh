#!/usr/bin/env bash
# Light bed + SFX for the 11.03 daily. Cuts follow the voiceover, not the beat grid.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL="$(cd "$ROOT/../../vibe-knowledge-video" && pwd)"
python3 "$SKILL/scripts/sfx.py" "$ROOT/public/sfx" --key D
python3 "$SKILL/scripts/compose.py" "$ROOT/public/music.wav" \
  --bpm 92 --bars 40 --drop 2 --key D --mode minor --seed 1103 --style calm --lufs -18
echo "VO stays public/vo.mp3 (Maia, 97.416s). Do not stretch the picture to the old 2:20 estimate."
