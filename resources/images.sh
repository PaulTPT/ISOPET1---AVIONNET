#!/bin/bash
echo "Generating images 800*800"
rm *_800.jpeg
mogrify -set filename:name %t -resize x800  -write '%[filename:name]_800.jpeg' *.jpeg