cd dev/backend
ls
npm install
npm run build
cp .env build/.env
cd build
ls

pm2 stop all
npm run start

