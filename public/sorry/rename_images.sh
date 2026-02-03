#!/bin/bash

# Create a mapping file
> mapping.txt

counter=1
for file in $(ls -1 | grep -E '\.(jpg|JPG|jpeg|JPEG)$' | sort); do
  extension="${file##*.}"
  extension_lower=$(echo "$extension" | tr '[:upper:]' '[:lower:]')
  
  # Generate a hash based on file content
  hash=$(shasum -a 256 "$file" | cut -d' ' -f1 | cut -c1-16)
  new_name="${hash}.${extension_lower}"
  
  echo "$file -> $new_name" >> mapping.txt
  
  # Rename the file
  mv "$file" "$new_name"
  
  counter=$((counter + 1))
done

echo "Renaming complete. Check mapping.txt for the mapping."
cat mapping.txt
