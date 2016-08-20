#!/bin/sh

# inspired by/copied from
# https://github.com/concord-consortium/drawing-tool/blob/master/push-gh-pages.sh

echo "- cloning checkin repo into temporary dir"
git clone git@github.com:HackGT/checkin.git --branch gh-pages __gh-pages-tmp__

echo "- copying built content into temporary dir"
cd app
cp index.html ../__gh-pages-tmp__
rsync -R build/* ../__gh-pages-tmp__
rsync -R views/**/*.html ../__gh-pages-tmp__
cd ../__gh-pages-tmp__

echo "- committing changes in gh-pages branch"
git add --all .
git commit -m "Auto-generated build commit"

echo "- pushing gh-pages branch"
git push origin gh-pages -f
cd ..

echo "- removing temporary dir"
rm -rf __gh-pages-tmp__
