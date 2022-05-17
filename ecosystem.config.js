// pm2 start ecosystem.config.js --env production
// pm2 stop ecosystem.config.js
// pm2 restart ecosystem.config.js

module.exports = {
  apps: [{
    name: 'ps.metaeditor.io',
    script: 'yarn',
    args: "start",
    // cwd: "/var/www/myapp/",
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      API_URL: 'https://api.metaeditor.io',
      PORT: 4001
    }
  }]
};