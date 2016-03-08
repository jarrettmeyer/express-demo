#!/usr/bin/env bash

curl -o gosu -fsSL "https://github.com/tianon/gosu/releases/download/1.7/gosu-$(dpkg --print-architecture)"
chmod +x ./gosu
mv ./gosu /usr/local/bin
echo "gosu successfully installed at $(which gosu)."
