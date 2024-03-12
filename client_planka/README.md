# build
npm run build

# copy client_test/build -> server/public
cd build/
cp -rfv * ../../server/public


# copy client_test/build/index.html -> server/view/index.ejs
cd build/
cp index.html  ../../server/views/index.js

