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


### Install VestaCP container

https://hub.docker.com/r/niiknow/vestacp/


```bash
docker pull niiknow/vestacp

# Run this image:

# Use sudo for folder creation!!
sudo rm -rf /opt/vestacp
sudo mkdir -p /opt/vestacp/{vesta,home,backup}

docker run -d --restart=always \
-p 3322:22 -p 80:80 -p 443:443 -p 9088:8083 \
-v /opt/vestacp/vesta:/vesta -v /opt/vestacp/home:/home -v /opt/vestacp/backup:/backup \
niiknow/vestacp

# Passwords
docker ps
sudo docker exec $CONTAINER_ID cat /vesta-start/root/password.txt

```


### Admin panel

```
https://54.211.78.197:9088/
admin
aeRaj6ungoor
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