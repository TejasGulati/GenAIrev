#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install -r backend/requirements.txt

# Install frontend dependencies
cd frontend/ai-business-solutions
npm install

# Build frontend
npm run build

# Collect static files
cd ../../backend
python manage.py collectstatic --no-input

# Run database migrations
python manage.py migrate