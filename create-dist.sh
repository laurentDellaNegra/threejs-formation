#!/bin/bash

cp index.html ./dist/index.html

# Define an array of strings
repositories=("04-local-server-final" "05-transform-objects-final" "06-animations-final" "07-cameras-final" "08-fullscreen-and-resizing-final" "09-geometries-final" "10-debug-ui-final" "11-textures-final" "12-materials-final" "13-3d-text-final" "14-go-live-final" "15-lights-final" "16-shadows-final" "17-haunted-house-final" "18-particles-final" "19-galaxy-generator-final" "20-scroll-based-animation-final" "21-physics-final" "22-imported-models-final" "23-raycaster-and-mouse-events-final" "24-custom-models-with-blender-final" "25-environment-map-final" "26-realistic-render-final" "27-code-structuring-for-bigger-projects-final" "28-shaders-final")

# Iterate over the elements in the array
for repository in "${repositories[@]}"; do
    echo "mkdir -p ./dist/$repository && cp -r $repository/dist/* ./dist/$repository/"
    mkdir -p ./dist/$repository && cp -r $repository/dist/* ./dist/$repository/
done