# Deploy app with Nginx and PM2 on Linux - Ubuntu

### Docker


```bash
#sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
#sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce
sudo service docker start
sudo systemctl status docker
```


### Install packages


```bash
sudo -i
apt update
apt install nodejs
npm install -g pm2
npm install -g yarn
npm install -g npx

```

### Update manager

```bash
sudo python3 update.py nginx # set up nginx config
python3 update.py # don't use sudo here
```



### PM2: Ecosystem

https://pm2.keymetrics.io/docs/usage/application-declaration/

```bash
# Start all applications
pm2 start ecosystem.config.js

# Stop all
pm2 stop ecosystem.config.js
```




### Python Env

```bash
sudo pip3 install virtualenv

virtualenv ./venv
#or
python3.9 -m venv ./venv
#or
virtualenv -p $(which python3.9) ./venv
```

```bash
. ./venv/bin/activate
pip3 install -r requirements.txt
```