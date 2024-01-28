---
title: Valet
---

# {% $markdoc.frontmatter.title %}

## Instalar/Actualizar Valet +
```$ composer global require weprovide/valet-plus -W```

## Instalar Laravel Valet
```$ brew update```  
```$ brew install php```  
```$ composer global require laravel/valet```  

Poner composer en el path en ~/.bash_profile
export PATH="$PATH:$HOME/.composer/vendor/bin"

```$ valet install```  

## Borrar toda instalación de Mysql que exista

1. Check for MySQL processes with: ps -ax | grep mysql

2. Stop or kill any MySQL processes (note: they kept respawning for me, I skipped it).

3. Run commands in terminal:

``` 
# Remove MySQL via Homebrew
brew remove mysql
brew cleanup

# Remove files
sudo rm /usr/local/mysql
sudo rm -rf /usr/local/var/mysql
sudo rm -rf /usr/local/mysql*
sudo rm ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist
sudo rm -rf /Library/StartupItems/MySQLCOM
sudo rm -rf /Library/PreferencePanes/My*

# Unload previous MySQL auto-login
launchctl unload -w ~/Library/LaunchAgents/homebrew.mxcl.mysql.plist

# Open the previous MySQL config
nano /etc/hostconfig

# Then delete the line: MYSQLCOM=-YES-

# Remove previous MySQL preferences
rm -rf ~/Library/PreferencePanes/My*
sudo rm -rf /Library/Receipts/mysql*
sudo rm -rf /Library/Receipts/MySQL*
sudo rm -rf /private/var/db/receipts/*mysql*
```

4. Restart your computer just to ensure any MySQL processes are killed.

5. Run mysql in terminal. It should fail if MySQL was removed successfully.

6. Remove and re-install Valet+ so it installs the correct MySQL 5.7.

7. Force your shell to use MySQL 5.7 (see section: “Install” step 3).

https://manuals.gravitydept.com/develop/command-line/brew  
https://gist.github.com/vitorbritto/0555879fe4414d18569d


## Instalar mariadb con brew
```brew install mariadb```

## Cambiar contraseña para el usuario root
```sudo mysql_secure_installation```
Tiene que estar el servicio arrancado para poder poner la contraseña.  
``` $ brew services list```   
``` $ brew services start mariadb```  

##  Table 'mysql.global_priv' doesn't exist
```$ mysql_install_db```
```$ mysql_upgrade```

## Contectar con root

```mysql -u root -p```

## Xdebug
https://javorszky.co.uk/2018/05/03/getting-xdebug-working-on-php-7-2-and-homebrew/

Con php 7.3 actualmente la versión estable de XDebug no funciona. Hay que instalar xdebug-beta
https://sys.cuquejo.org/install-php-7-3-xdebug-on-macos-mojave-with-homebrew/

Si no funciona ir a esta página:
https://xdebug.org/wizard
Copiar y pegar la salida de phpinfo() para instrucciones

https://stitcher.io/blog/php-73-upgrade-mac

## Mailhog

http://127.0.0.1:8025  
```$ brew install mailhog```  
```$ brew services start mailhog```  
https://protone.media/en/blog/setup-mailhog-with-laravel-valet  

## Nuevo proyecto WordPress
https://aaemnnost.tv/wp-cli-commands/valet/
https://github.com/aaemnnosttv/wp-cli-valet-command

Configuración inicial en ~/.wp-cli/config.yml

```
$ cd ~/Sites
$ wp valet new nombresitio
$ cd nombresitio
$ valet link nombresitio
```



## Uninstall Valet
```
$ brew list  
$ valet uninstall  
$ sudo brew services stop nginx  
$ sudo brew services stop php70  
$ sudo brew services stop dnsmasq  
$ brew uninstall nginx  
$ brew uninstall php70  
$ brew uninstall dnsmasq  
$ rm -rf ~/.valet  
$ rm /usr/local/bin/valet  
```

## Install Valet+
https://github.com/weprovide/valet-plus#installation

Si hay problemas al instalar alguna versión de PHP:
https://github.com/henkrehorst/homebrew-php/issues/158

https://github.com/henkrehorst/homebrew-php/issues/158#issuecomment-1079396166
https://www.php.net/downloads.php

brew edit valet-php@8.0

## Uninstall valet +
```$ composer global remove weprovide/valet-plus``` 

Desinstalar todos los paquetes relativos a laravel  
```$ brew list```  
```$ brew uninstall dnsmasq```
```$ brew uninstall php70```

## /usr/local/bin/valet: No such file or directory
Si no se encuentra valet poner lo siguiente:
```$ source ~/.bashrc_profile```

## CORS Rules for Laravel Valet Nginx 
https://gist.github.com/poul-kg/b669a76fc27afcc31012aa0b0e34f738

server {
    listen 80 default_server;
    root /;
    charset utf-8;
    client_max_body_size 128M;

    location /41c270e4-5535-4daa-b23e-c269744c2f45/ {
        internal;
        alias /;
        # CORS Rules
        add_header Access-Control-Allow-Origin *;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, OPTIONS, DELETE';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range,Authorization';
        # END of CORS Rules #
        try_files $uri $uri/;
    }

    location / {
        # CORS Rules
    	add_header Access-Control-Allow-Origin *;
    	add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, OPTIONS, DELETE';
	    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range,Authorization';
        # END of CORS Rules #
        rewrite ^ /Users/carlos/.composer/vendor/weprovide/valet-plus/server.php last;
    }

    access_log off;
    error_log /Users/carlos/.valet/Log/nginx-error.log;

    error_page 404 /Users/carlos/.composer/vendor/weprovide/valet-plus/server.php;

    location ~ \.php$ {
        # CORS Rules
    	add_header Access-Control-Allow-Origin *;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, OPTIONS, DELETE';
        add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range,Authorization';
        # END of CORS Rules #
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_read_timeout 3600;
        fastcgi_pass unix:/Users/carlos/.valet/valet.sock;
        fastcgi_index /Users/carlos/.composer/vendor/weprovide/valet-plus/server.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME /Users/carlos/.composer/vendor/weprovide/valet-plus/server.php;
        fastcgi_param SERVER_NAME $host;
    }

    location ~ /\.ht {
        deny all;
    }
}

## Cargar imágenes desde producción si no las tenemos en local

https://medium.com/@devron/laravel-valet-fetch-missing-assets-from-production-automatically-ffc007753945

Generar primero archivo para configurar Nginx para el sitio. En la carpeta del sitio (donde apunta el site .test) poner:
```valet secure```

Modificar archivo Nginx generado en:
/Users/carlos/.valet/Nginx/dominio.test

```
    location ~* .(png|jpe?g|gif|ico|svg)$ {
        expires 24h;
        log_not_found off;
        root '/Users/carlos/.valet/Sites/dominio/';    
        if (-f $request_filename) {
            break;
        }
    
        try_files $uri $uri/ @production;
    } 
    
    location @production {
        resolver 8.8.8.8;
        proxy_pass https://dominio.com/$uri;
    }
```

## PHP Warning:  Module 'xxxxxx' already loaded in Unknown on line 0

Si nos encontramos con este error, seguramente al instalar o cambiar a la versión de PHP que estamos utilizando se haya puesto en el php.ini de la versión de php la misma línea para la carga de un módulo concreto dos veces.

1. Saber que versión estamos utilizando con:

```$ php --version```

2. Si estamos utilizando Valet/Valet Plus, ir a:

```$ cd /usr/local/etc/valet-php```

Y en la carpeta de la versión concreta de php que estemos utilizando modificar el archivo php.ini

En mi caso lo tenía así

```
extension="geoip.so"
extension="yaml.so"
extension="geoip.so"
extension="apcu.so"
```

3. Por último hacer un restart para aplicar cambios

```$ valet restart```

## Cambio de versión de XDebug a v3

Al hacer el cambio de PHP a la v8.X, cuando activamos XDebug en Valet con valet use xdebug nos bajará la versión 3. La configuración de XDebug deberá cambiar ya que si no tendremos el siguiente error:

```Xdebug: [Config] The setting 'xdebug.remote_autostart' has been renamed```

Tendremos la configuración de XDebug en el php.ini de 8.X o en cualquier archivo de configuración interno dentro de conf.d.

```cd /usr/local/etc/valet-php/8.0/```

Modificar la configuración de xdebug2

```
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.remote_autostart=1
```

por la de xdebug3

```
xdebug.mode=debug
xdebug.client_host=localhost
xdebug.client_port=9000
xdebug.start_with_request=1
xdebug.log_level=0
```

## Valet stop se queda colgado

A veces se queda colgado valet stop en alguno de los servicios porque no lo puede parar. Para solucionarlo:

``` $ brew services stop mariadb ```
``` $ brew services stop redis ```
``` $ brew services stop mailhog ```

Luego igual hay que hacer un start manual cuando hagamos valet start
