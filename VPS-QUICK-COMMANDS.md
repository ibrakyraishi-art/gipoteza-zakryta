# ⚡ Шпаргалка команд для Timeweb VPS

## 🔑 Подключение

```bash
# Подключение к VPS
ssh root@ваш-IP-адрес

# Или если создали пользователя nodejs
ssh nodejs@ваш-IP-адрес
```

## 📦 Быстрая установка всего (скрипт)

Скопируйте и выполните одной командой (как root):

```bash
# Обновление и установка всего необходимого
apt update && apt upgrade -y && \
apt install -y curl wget git nano ufw nginx && \
ufw allow 22 && ufw allow 80 && ufw allow 443 && ufw --force enable && \
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
apt install -y nodejs && \
npm install -g pm2 && \
echo "✅ Всё установлено!"
```

## 🚀 Деплой проекта (быстрая версия)

```bash
# 1. Создать пользователя
adduser nodejs
su - nodejs

# 2. Клонировать проект
cd ~
git clone https://github.com/ваш-username/gipoteza-zakryta.git
cd gipoteza-zakryta

# 3. Установить и собрать
npm install
npm run build

# 4. Запустить через PM2
pm2 start npm --name "gipoteza-zakryta" -- start
pm2 startup
pm2 save

# 5. Выйти и настроить Nginx (как root)
exit
```

## 🌐 Конфиг Nginx (готовый)

```bash
# Создать конфиг
cat > /etc/nginx/sites-available/gipoteza-zakryta << 'EOF'
server {
    listen 80;
    server_name ваш-домен.ru www.ваш-домен.ru;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# Активировать
ln -s /etc/nginx/sites-available/gipoteza-zakryta /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl restart nginx
```

## 🔒 SSL одной командой

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d ваш-домен.ru -d www.ваш-домен.ru --non-interactive --agree-tos --email ваш@email.com --redirect
```

## 🔄 Обновление сайта

```bash
ssh nodejs@ваш-IP-адрес
cd ~/gipoteza-zakryta
git pull
npm install
npm run build
pm2 restart gipoteza-zakryta
```

## 📊 Полезные команды

### PM2
```bash
pm2 status                    # Статус
pm2 logs                      # Все логи
pm2 logs gipoteza-zakryta     # Логи конкретного приложения
pm2 restart gipoteza-zakryta  # Перезапуск
pm2 monit                     # Мониторинг
pm2 flush                     # Очистить логи
```

### Nginx
```bash
systemctl status nginx        # Статус
systemctl restart nginx       # Перезапуск
nginx -t                      # Проверка конфига
tail -f /var/log/nginx/error.log  # Логи ошибок
```

### Система
```bash
df -h                         # Свободное место
free -m                       # Использование RAM
htop                          # Мониторинг (apt install htop)
reboot                        # Перезагрузка
```

## 🆘 Если что-то сломалось

### Сайт не работает:
```bash
pm2 logs gipoteza-zakryta     # Смотрим логи приложения
systemctl status nginx        # Проверяем Nginx
ufw status                    # Проверяем firewall
```

### Нехватка памяти:
```bash
# Создать SWAP
fallocate -l 2G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab
free -m
```

### Перезапуск всего:
```bash
pm2 restart all
systemctl restart nginx
```

## 🔐 Безопасность

```bash
# Fail2Ban
apt install -y fail2ban
systemctl enable fail2ban

# Отключить root вход
nano /etc/ssh/sshd_config
# PermitRootLogin no
systemctl restart sshd

# Изменить SSH порт
nano /etc/ssh/sshd_config
# Port 2222
ufw allow 2222
systemctl restart sshd
```

## 📱 Telegram уведомления о падении (бонус)

Создайте скрипт мониторинга:

```bash
nano ~/check-app.sh
```

```bash
#!/bin/bash
if ! pm2 status | grep -q "online"; then
    curl -s -X POST "https://api.telegram.org/bot<TOKEN>/sendMessage" \
    -d chat_id=<CHAT_ID> \
    -d text="⚠️ Приложение упало на VPS!"
fi
```

```bash
chmod +x ~/check-app.sh
crontab -e
# Добавить: */5 * * * * /home/nodejs/check-app.sh
```

## 🎯 Один скрипт для всего

Полная автоматизация (выполнить как root):

```bash
curl -s https://raw.githubusercontent.com/yourusername/gipoteza-zakryta/main/deploy-vps.sh | bash
```

(Создайте файл `deploy-vps.sh` в репозитории с этим содержимым)

---

**Сохраните эту шпаргалку - пригодится! 📌**
