#!/usr/bin/env bash

# Setup environment files from .env.example
# Usage: ./scripts/setup-env.sh

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}Setting up environment files...${NC}\n"

# Get the project root directory (parent of scripts/)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Setup Next.js web app (.env.local)
WEB_EXAMPLE="$PROJECT_ROOT/apps/a3n-web/.env.example"
WEB_TARGET="$PROJECT_ROOT/apps/a3n-web/.env.local"

if [ -f "$WEB_EXAMPLE" ]; then
  if [ -f "$WEB_TARGET" ]; then
    echo -e "${YELLOW}⚠ $WEB_TARGET already exists, skipping...${NC}"
  else
    cp "$WEB_EXAMPLE" "$WEB_TARGET"
    echo -e "${GREEN}✓ Created $WEB_TARGET${NC}"
  fi
else
  echo -e "${YELLOW}⚠ $WEB_EXAMPLE not found, skipping...${NC}"
fi

# Setup API (.env)
API_EXAMPLE="$PROJECT_ROOT/apps/a3n-api/.env.example"
API_TARGET="$PROJECT_ROOT/apps/a3n-api/.env"

if [ -f "$API_EXAMPLE" ]; then
  if [ -f "$API_TARGET" ]; then
    echo -e "${YELLOW}⚠ $API_TARGET already exists, skipping...${NC}"
  else
    cp "$API_EXAMPLE" "$API_TARGET"
    echo -e "${GREEN}✓ Created $API_TARGET${NC}"
  fi
else
  echo -e "${YELLOW}⚠ $API_EXAMPLE not found, skipping...${NC}"
fi

echo -e "\n${GREEN}✓ Environment setup complete!${NC}"
echo -e "\n${BLUE}Note: Remember to update the environment files with your actual values.${NC}"
