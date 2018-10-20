#!/bin/sh
npm run build
rm -rf ../../fullstack3/build
cp -r build ../../fullstack3/build