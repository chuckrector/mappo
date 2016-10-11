#!/bin/bash

find data -iname "*.png" -type f -delete
find data -iname "*.json" -type f -delete
find src/react -iname "*.compiled.js" -type f -delete
