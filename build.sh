#!/bin/bash

# Build script for cross-browser extension

set -e

echo "🧹 Cleaning previous builds..."
npm run clean

echo "🦊 Building Firefox version..."
npm run build:firefox

echo "🎯 Building Chrome version..."
npm run build:chrome

echo "✅ Both versions built successfully!"
echo "📦 Firefox: dist/menlo-security-firefox-1.1.0.zip"
echo "📦 Chrome: dist/menlo-security-chrome-1.1.0.zip"

echo ""
echo "📁 Build artifacts:"
ls -la dist/*.zip