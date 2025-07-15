#!/bin/bash

VERSION_TYPE=$1

if [[ "$VERSION_TYPE" != "patch" && "$VERSION_TYPE" != "minor" && "$VERSION_TYPE" != "major" ]]; then
  echo "Uso: npm run release [patch|minor|major]"
  exit 1
fi

npm version $VERSION_TYPE --message "chore(release): v%s"
git push
git push --tags