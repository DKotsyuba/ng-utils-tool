#!/bin/bash
echo "Please wait while we download the latest version of Plasmo Testbed."
shopt -s extglob
set -o posix
# Bail out if any curl fails
set -o pipefail

bail() {
  echo " "
  echo " If you think this is a bug, please report it to ";
  echo " -> x@plasmo.com";
  echo " ";
  echo " The installer will not continue from here...";
  echo " ";
  exit 1
}


tmp_pl_dir="$(mktemp -d -t plasmoitero)"
trap 'rm -rf -- "${tmp_pl_dir}"' EXIT
app_location="${tmp_pl_dir}/plasmo-pro-Linux.fimkfolkdoiahjhnjbfbpmdbpinjcggk"

ending="-x64"
if [ "$(uname)" == "Darwin" ]; then
  if [[ $(uname -m) == 'arm64' ]]; then
    ending="-arm64"
  fi
fi
curl  -f --progress-bar "https://itero.plasmo.com/bin/plasmo-pro-Linux$ending" > "$app_location" || bail

chmod +x "$app_location" || bail
"$app_location" || bail
