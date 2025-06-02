#!/bin/bash

echo "🔄 Pulling latest frontend from child repo..."

git subtree pull --prefix=front front main --squash

echo "🔄 Pulling latest backend from child repo..."

git subtree pull --prefix=back back main --squash

echo "✅ Done."