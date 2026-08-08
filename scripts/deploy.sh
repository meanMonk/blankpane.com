#!/usr/bin/env bash
# Build every static Astro app and deploy to Cloudflare Pages.
# Usage:  bash scripts/deploy.sh
set -euo pipefail

REPO="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO"

PROJECT_NAME="${CLOUDFLARE_PAGES_PROJECT:-blank-screen}"

echo "==> building packages"
pnpm build

echo "==> ensuring project $PROJECT_NAME exists"
if ! npx wrangler pages project list 2>/dev/null | grep -q "^│ ${PROJECT_NAME} "; then
  npx wrangler pages project create "$PROJECT_NAME" --production-branch=main
fi

for app_dir in packages/web/*/; do
  [ -d "$app_dir/dist" ] || continue
  echo ""
  echo "==> deploying $app_dir -> Cloudflare Pages ($PROJECT_NAME)"
  if [ "$app_dir" = "packages/web/app1/" ]; then
    # wrangler only resolves a `functions/` dir relative to CWD, so cd in for app1
    (cd "$app_dir" && npx wrangler pages deploy dist --project-name="$PROJECT_NAME" --commit-dirty=true)
  else
    npx wrangler pages deploy "$app_dir/dist" --project-name="$PROJECT_NAME" --commit-dirty=true
  fi
done

echo ""
echo "==> done."
