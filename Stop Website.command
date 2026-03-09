#!/bin/bash

# Kill any process on port 3000
lsof -ti:3000 | xargs kill -9 2>/dev/null

echo "Server on port 3000 stopped."
