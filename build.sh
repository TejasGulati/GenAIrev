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

# Move built frontend to Django's static directory
mkdir -p ../../backend/staticfiles/
cp -r build/* ../../backend/staticfiles/

# Go back to the backend directory
cd ../../backend

# Run database migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --no-input