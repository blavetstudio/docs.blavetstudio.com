---
title: Staging
---

# {% $markdoc.frontmatter.title %}

## Podríamos intentar utilizar un servicio como Runcloud
https://runcloud.io/

## Montaje de Staging para proyectos varios
https://marketplace.digitalocean.com/apps/wordpress

## Usuario SSH para loguearse como www-data

- Crear usuario nuevo
```$ useradd ssh-staging```

- Cambiar uid y gid en el archivo /etc/passwd al del usuario www-data y de paso poner el shell (normalmente el del root bin/bash)
```$ nano /etc/passwd```

- Cambiar usuario y grupo del directorio home del nuevo usuario
```$ chown www-data /home/ssh-staging```
```$ chgrp www-data /home/ssh-staging```

## Acceso via ssh
```$ rsync --archive --chown=www-data:www-data ~/.ssh /home/ssh-staging ```

## Instalar utilidades en las versiones que toquen

- Composer (en root)
```
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('sha384', 'composer-setup.php') === 'a5c698ffe4b8e849a443b120cd5ba38043260d5c4023dbf93e1558871f1f07f58274fc6f4c93bcfd858c6bd0775cd8d1') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```

Y luego 

``` $ mv composer.phar /usr/local/bin/composer ```

- NVM + NPM (en usuario ssh-staging)

Si el archivo ~/.bash_profile no existe crearlo
```$ touch ~/.bash_profile```
```$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash```
```$ nvm install 6.16.0```

GULP
```$ npm install -g gulp-cli```

BOWER
```$ npm install -g bower```

## Montar ansistrano en local para hacer los deploys

Si no tenemos instalado Ansistrano instalarlo así

```$ ansible-galaxy install ansistrano.deploy ansistrano.rollback```

## Problemas al clonar con SSH

Generar las claves SSH id_rsa/id_rsa.pub en la carpeta /var/www que es donde la busca git cuando intenta hacer un clonado del repo

```$ ssh-keygen -t rsa -b 4096 -C "carlos@supermundano.com" -f $HOME/.ssh/id_rsa```

Copiarlas a /var/www
```$ mkdir /var/www/.ssh```
```$ cp ~/.ssh/id_rsa* /var/www/.ssh```


Dar de alta la clave pública en nuestro usuario Bitbucket para que se pueda leer el repo

https://confluence.atlassian.com/bitbucket/access-keys-294486051.html  
https://confluence.atlassian.com/bitbucket/troubleshoot-ssh-issues-271943403.html  

## Cambiar sites_enabled/sites_available para que funcione

Modificar 

/etc/apache2/sites-available/000-default.conf  
/etc/apache2/sites-enabled/000-default.conf  
/etc/apache2/sites-enabled/000-default-le-ssl.conf  

Para que el directorio de inicio sea /var/www/current/web


## Proteger directorio principal con contraseña

```$ sudo htpasswd -c /var/www/.htpasswd nombre-usuario```

Y en el archivo .htaccess poner esto:

```
AuthType Basic
AuthName "Password Required"
AuthUserFile /var/www/.htpasswd
Require user malasmadres
```

## Para saber donde está el archivo de configuración de Mysql
mysqld --verbose --help | grep -A 1 "Default options"  

```$ sudo service mysql start```  
```$ sudo service mysql stop```  
```$ sudo service mysql status```  

## Para saber que proceso se está llevando toda la CPU en el servidor
top

## Para activar la zona SWAP e impedir los fallos por falta de memoria
https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-18-04

## Auto arrancar MySQL si está caído
```$ crontab -e```
```
# Restart MySQL if it's down
* * * * *    root      service mysql status || service mysql start
```

## Instalar y activar Mailhog para funcionar en staging en Ubuntu 16.04/18.04

http://staging.hellocreatividad.com:8025/

**Instalar como root.**

Seguramente en otros servers Ubuntu se hará igual independientemente de la versión

### Instalar Mailhog

1. Instalar Go si no está instalado

Probar si está instalado
```
$ go
```

2. Instalar Go

```
$ sudo apt-get install golang-go
$ mkdir gocode
$ echo "export GOPATH=$HOME/gocode" >> ~/.profile
$ source ~/.profile
```

3. Bajar Go y Mhsendmail
```
$ go get github.com/mailhog/MailHog
$ go get github.com/mailhog/mhsendmail
```

4. Copiar ejecutables en sitio global
```
$ sudo cp /root/gocode/bin/MailHog /usr/local/bin/mailhog
$ sudo cp /root/gocode/bin/mhsendmail /usr/local/bin/mhsendmail
```

5. Cambiar en php.ini el sendmail_path
```
$ nano /etc/php/7.2/apache2/php.ini
```
** sendmail_path = /usr/local/bin/mhsendmail **

6. Arrancar automáticamente Mailhog cuando arranque el sistema

En el archivo */etc/systemd/system/mailhog.service* poner:

```
[Unit]
Description=MailHog service

[Service]
ExecStart=/usr/local/bin/mailhog \
  -api-bind-addr 127.0.0.1:8025 \
  -ui-bind-addr 127.0.0.1:8025 \
  -smtp-bind-addr 127.0.0.1:1025

[Install]
WantedBy=multi-user.target
```

```
$ systemctl daemon-reload
$ systemctl start mailhog
$ systemctl enable mailhog
```

7. Arrancar de nuevo apache
```
$ service apache2 restart
```

8. Asegurarse que el servicio está arrancado y funcionando
```
$ systemctl | grep mailhog
```

### Abrir puerto en Firewall

1. Revisar que puertos hay abiertos
``` 
$ sudo netstat -tunlp 
```
``` 
$ sudo netstat -tnlp | grep :8025 
```

2. Abrir puerto 8025 a todo dios
``` 
$ sudo ufw allow from any to any port 8025 proto tcp 
```

3. Para ver que puertos están abiertos
``` 
$ sudo ufw status 
```

4. Para borrar el acceso a algún puerto

- Obtener el id del puerto en el firewall
``` 
$ sudo ufw status numbered 
```
- Borrar con el id
``` 
$ sudo ufw delete [id] 
```


**Se deberá utilizar el plugin wp-mailhog para que se utilicen los puertos correctos (1025) al enviar correos**

Info en:
https://www.lullabot.com/articles/installing-mailhog-for-ubuntu-1604
https://websiteforstudents.com/find-all-open-ports-listening-ports-on-ubuntu-18-04-16-04/
https://linuxconfig.org/how-to-open-allow-incoming-firewall-port-on-ubuntu-18-04-bionic-beaver-linux


## Deshabilitar Postfix para que no se envíe ningún tipo de correo desde Staging
```
$ sudo service --status-all
$ sudo service postfix stop
```

Deshabilitarlo del inicio en Ubuntu 15.04+ con systemctl  
```$ sudo systemctl disable postfix```

O en Ubuntus anteriores hacerlo con  
```$ sudo rm /etc/init/postfix```

O con el comando  
```$ sudo update-rc.d postfix disable```  


Info en:
https://askubuntu.com/a/692826/1152132