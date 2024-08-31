#!/bin/bash

# Specify the desired Angular version
ANGULAR_VERSION="16.2.0"

# List of Angular packages to downgrade
PACKAGES=(
  @angular/core
  @angular/cli
  @angular/common
  @angular/forms
  @angular/platform-browser
  @angular/platform-browser-dynamic
  @angular/router
  @angular/compiler
  @angular/compiler-cli
  @angular/language-service
  @angular-devkit/build-angular
  @angular-eslint/schematics
)

# Downgrade each package
for package in "${PACKAGES[@]}"
do
  ng update ${package}@${ANGULAR_VERSION} #--save-exact
done

# Update TypeScript to a compatible version
ng update typescript@5.1.6 #--save-exact

# Update zone.js to a compatible version
ng update zone.js@0.13.3 #--save-exact

# Clean npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Display the new Angular version
ng version
