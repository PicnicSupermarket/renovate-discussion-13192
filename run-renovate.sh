#!/usr/bin/env bash

set -e -u -o pipefail

config_variant=${1:?Config variant (1 or 2) not specified}
config_path="$(dirname "$(readlink -f "${0}")")/config-${config_variant}.js"

docker run --rm \
  -v "${config_path}:/usr/src/app/config.js" \
  -e LOG_LEVEL=debug -e GITHUB_TOKEN="${GITHUB_TOKEN}" \
  renovate/renovate
