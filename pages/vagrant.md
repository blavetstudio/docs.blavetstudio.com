---
title: Vagrant
---

# {% $markdoc.frontmatter.title %}

## Problemas con los enlaces permanentes

Si al instalar nuestra web en vagrant con Scotch Box no funcionan los enlaces permanentes, probar a poner esto en el archivo de configuración del virtual host. Normalmente deberían estar en ```/etc/apache2/sites-available```

```
<VirtualHost *:80>
        ...
    <Directory "directory/of/your/.htaccess">
        AllowOverride All
    </Directory>
</VirtualHost>
```

## Para configurar las máquinas virtuales en Scotch Box 3.5

https://blog.praveen.science/working-with-virtual-hosts-in-scotch-box-pro/


## Configurar XDebug en Scoth Box 3.5

**Entrar en la máquina via ssh**
```vagrant ssh```

**Instalar xdebug**
```sudo apt-get update```
```sudo apt-get install php-xdebug```

**Ajustar PHP para que acepte conexiones xdebug**
```sudo nano /etc/php/7.0/apache2/php.ini```

[XDebug]
xdebug.remote_enable = 1
xdebug.remote_autostart = 1
xdebug.remote_connect_back = 1

**Reiniciar Apache**
```sudo service apache2 restart```

**Y en la configuración de VSCode**

```
{
  "name": "Listen for XDebug",
  "type": "php",
  "request": "launch",
  "port": 9000,
  "pathMappings": {
    "/root/to/the/web/in/vagrant": "${workspaceRoot}/root/to/web/on/local/project"
  },
},
```

**Desactivar Xdebug cuando no se utilice**

XDebug se come muchísimos recursos y hace que el TTFB sea abismal. Si no lo vamos a utilizar mejor tenerlo desactivado. Para esto:

```sudo nano /etc/php/7.0/mods-available/xdebug.ini```

una vez dentro comentar la línea zend_extension=xdebug.so poniendo un ; delante

```sudo service apache2 restart```

Para volver a activarlo volver a descomentar la línea y reiniciar apache


## Mailhog en Scotch Box 3.5

http://192.168.33.35:8025


## Date con Valor por defecto 0000-00-00 no deja duplicar tablas

ssh vagrant  
mysql -u root -p  

SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'NO_ZERO_IN_DATE',''));  
SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'NO_ZERO_DATE',''));  

## Instalar PHP 7.2 en Scotchbox

https://www.liquidweb.com/kb/install-php-7-2-ubuntu-16-04/
https://www.rosehosting.com/blog/how-to-install-php-7-2-on-ubuntu-16-04/

```$ php -v```
```$ php --ini```
```$ sudo cp -a /etc/php/7.0/ /etc/php/7.0.backup```
```$ php -m > /tmp/7.0.modulelist.txt```
```$ sudo add-apt-repository ppa:ondrej/php```
```$ sudo apt-get update```
```$ sudo apt-get install php7.2```
```$ php -v```
```$ ls /etc/apache2/mods-available/php*```
```$ ls /etc/apache2/mods-enabled/php*```
```$ sudo a2dismod php7.0```
```$ sudo a2enmod php7.2```
```$ apachectl -t```
```$ sudo service apache2 restart```
```$ sudo apt-get install php7.2-curl php7.2-gd php7.2-json php7.2-mbstring php7.2-intl php7.2-mysql php7.2-xml php7.2-zip```
```$ sudo service apache2 restart```

**Verificación de que todo funciona**

1. ```$ ls /etc/apache2/mods-enabled/php*```
2. Entrar en info.php desde el server y ver que se está cargando 


## Activar Cronjob en Vagrant 
```$ crontab -e```

*/5 * * * * curl http://hellocreatividad.test/wp/wp-cron.php > /path/to/log-file.