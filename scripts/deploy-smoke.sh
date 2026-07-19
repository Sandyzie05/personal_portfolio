#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-http://localhost:4173}"

status=$(curl -s -o /dev/null -w '%{http_code}' "$BASE_URL/")
if [ "$status" != "200" ]; then
  echo "FAIL: $BASE_URL/ returned HTTP $status (expected 200)"
  exit 1
fi
echo "PASS: $BASE_URL/ returned HTTP 200"

headers=$(curl -sI "$BASE_URL/resume.pdf")
if ! echo "$headers" | grep -q "200"; then
  echo "FAIL: $BASE_URL/resume.pdf did not return HTTP 200"
  echo "$headers"
  exit 1
fi
if ! echo "$headers" | grep -qi "Content-Type: application/pdf"; then
  echo "FAIL: $BASE_URL/resume.pdf missing Content-Type: application/pdf header"
  echo "$headers"
  exit 1
fi
echo "PASS: $BASE_URL/resume.pdf returned HTTP 200 with Content-Type: application/pdf"
