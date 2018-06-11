wget http://172.106.88.37:8000/toychain-last.tar.gz
tar -xzf toychain-last.tar.gz
rm toychain-last.tar.gz
cd toychain
pm2 start app.js --name=toyc
pm2 save

# curl -o- http://172.106.88.37:8000/install.sh | bash