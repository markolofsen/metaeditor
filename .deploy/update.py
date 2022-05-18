import re
import os
import sys
import time

HOST = 'ps.metaeditor.io'
LOCALHOST = 'ps-dev.metaeditor.io'
NGINX_CONFIG_PATH = '/home/admin/conf/web/%s.nginx.conf' % HOST
PORT = 4110  # >> set same port in package.json (next start -p ***)
PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Base:
    @staticmethod
    def CMD(title, arr, delay: int = 0, wait_sec: int = 1):
        print('*' * 30)
        print(title)
        for a in arr:
            print(a)
        print('*' * 30)

        time.sleep(delay)
        os_string = ' && '.join(arr)
        print(os_string)
        os.system(os_string)
        time.sleep(wait_sec)


class Nginx:

    @classmethod
    def makeConfig(self):
        with open('nginx.conf', "r+") as f:
            data = f.read()  # read everything in the file

            data = re.sub("__PROJECT_DIR__", PROJECT_DIR, data)
            data = re.sub("__HOST__", ' '.join([HOST, LOCALHOST]), data)
            data = re.sub("__PORT__", str(PORT), data)

            return data

    @classmethod
    def init(self):
        data = self.makeConfig()

        with open(NGINX_CONFIG_PATH, 'w+') as f:
            f.write(data)

        os.system('service nginx restart')

    @classmethod
    def showConfig(self):
        data = self.makeConfig()

        print('\n'*5)
        print('** NGINX CONFIG **')
        print('\n'*5)
        print(data)


class Nodejs:

    @classmethod
    def restart(self):
        list = [
            'cd %s' % PROJECT_DIR,
            'pm2 restart ecosystem.config.js',
        ]

        Base.CMD(title='Nodejs worker', arr=list, wait_sec=3)

    @classmethod
    def build(self):

        list = [
            'cd %s' % PROJECT_DIR,
            'git pull',
            'cd ./project',
            'pm2 stop ecosystem.config.js',
            'yarn build',
            'pm2 start ecosystem.config.js --env production',
        ]

        Base.CMD(title='Nodejs worker', arr=list, wait_sec=3)


if __name__ == '__main__':

    is_root = os.geteuid() == 0

    if 'nginx' in sys.argv:

        Nginx.showConfig()

        if is_root:
            # sudo python3 update.py nginx
            Nginx.init()
        else:
            print('Nginx config hasn\'t changed!')

    elif 'build' in sys.argv:
        Nodejs.build()

    elif 'start' in sys.argv:
        Nodejs.restart()
