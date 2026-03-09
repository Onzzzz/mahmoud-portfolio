#!/bin/bash
cd "$(dirname "$0")"

# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

# Start dev server in background
npm run dev &

# Wait for server to be ready then open browser
sleep 3
open http://localhost:3000
