#!/bin/bash

# Current DIR
cd "$(dirname "$0")"

storageDir="./mongo-mem-server/storage"

# Clear storage
rm -rf $storageDir/*

# Create .gitkeep to track storage folder
touch $storageDir/.gitkeep

echo "Storage cleared :)"