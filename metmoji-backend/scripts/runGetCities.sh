#!/bin/sh
./node_modules/.bin/serverless invoke local \
  --function getCities \
  --stage dev \
  --path scripts/mockevents/getCitiesEvent.json
