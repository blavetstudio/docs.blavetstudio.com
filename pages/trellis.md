---
title: Trellis
---

# {% $markdoc.frontmatter.title %}

## Problema Nginx se queda apagado cuando hacemos un vagrant halt y luego un vagrant up
https://github.com/roots/trellis/issues/979#issuecomment-383458537

Si al instalar nuestra web en Trellis paramos el server con vagrant halt y luego lo volvemos a arrancar con vagrant up, nginx se queda sin arrancar y no va la web.

Para evitar esto hay que añadir en el archivo roles/nginx/tasks/main.yml lo siguiente:

```
- name: Enable Nginx to start on boot
  service:
    name: nginx
    enabled: yes
    state: started
    use: service
```

Si no funciona una vez hayamos apagado el vagrant y vuelto a encender,  tendremos que entrar por ssh y activar el encendido automático de nginx

```$ vagrant ssh```

```
$ sudo systemctl enable nginx
$ sudo service nginx restart
```

Para comprobar que va todo bien

```
$ sudo systemctl is-enabled nginx
$ service nginx status
```

## Para hacer cambios en Trellis
Cambiar los archivos que toquen y luego:

```$ ansible-playbook server.yml -e env=<environment>```

O se puede poner el tag para actualizar roles concretos

```$ ansible-playbook server.yml -e env=<environment> --tags=php```

## Versión de Ansible compatible para hacer los deploys
Actual 2.4.0.0 - 2.4.3.0

Si se ha instalado una versión mayor, se puede desinstalar e instalar la 2.4.X así:
pip install ansible==2.4.3.0
pip install ansible==2.7.13 --user

\+ info de estos temas aquí:
https://discourse.roots.io/t/updated-to-ansible-2-4-deploys-broken-now-what/10588/2?u=s3w47m88
https://imwz.io/error-trellis-no-longer-supports-ansible-2-3-1-0/
https://stackoverflow.com/questions/50474137/roots-trellis-ansible-2-4-error-unexpected-exception-this-is-probably-a/50474138#50474138

# Configuración de XDebug para debuggear con VSCode 
https://discourse.roots.io/t/trellis-xdebug-vscode-local-development/11087

En trellis/group_vars/development/php.yml

xdebug_remote_enable: 1
xdebug_remote_connect_back: 1
xdebug_remote_autostart: 1

SKIP_GALAXY=true ANSIBLE_TAGS=php vagrant reload --provision

**Y en la configuración de VSCode**
```
{
  "name": "Listen for XDebug",
  "type": "php",
  "request": "launch",
  "port": 9000,
  "pathMappings": {
    "/var/www/web": "${workspaceRoot}/webv2/web"
  },
},
```

## Vault Commands 
- ansible-vault encrypt <file>
- ansible-vault view <file>
- ansible-vault edit <file>
- ansible-vault rekey <file>

https://roots.io/trellis/docs/vault/


## Composer no permite hacer descargas de repos privados en bitbucket
Hay que permitir que la máquina virtual utilice las ssh keys del usuario de bitbucket que previamente habremos puesto en bitbucket

En OSX ```ssh-add -L``` para ver el listado de keys que se van a autorizar con ssh-agent forwarding

Si nuestra key no está en la lista habrá que ponerla con ```ssh-add -K```

Para que esté siempre en la lista y no tengamos que ponerla de nuevo cada vez que reiniciemos el ordenador o iTerm hay que poner esto en el archivo ~/.ssh/config:

```
Host *
  UseKeychain yes
  AddKeysToAgent yes
  IdentityFile ~/.ssh/id_rsa
```

Más info en https://developer.github.com/v3/guides/using-ssh-agent-forwarding/


## Mailhog en Trellis
http://yourdevelopmentdomain.test:8025

## Problemas con permisos al hacer composer update
Si al utilizar composer no se actualizan los plugins y da errores de permisos hay que hacer fuera de la máquina virtual en la carpeta de bedrock lo siguiente:

```$ ls -alR > /dev/null````

Es un problema de Vagrant sin solucionar:
https://discourse.roots.io/t/composer-permissions-issue/10134?u=carlosfaria

## Composer no actualiza los plugins correctamente
Si composer no actualiza los plugins y se queda con la versión que tiene  en caché, hay que hacer un borrado de la misma. Para esto, entrar en trellis y hacer

```
$ composer clearcache
```

## Problemas al hacer vagrant up
Si al hacer vagrant up obtenemos este error es posible que OSX esté bloqueando Virtualbox por seguridad:
```VBoxManage: error: Failed to create the host-only adapter```
Seguir instrucciones en este post en medium
https://medium.com/@DMeechan/fixing-the-installation-failed-virtualbox-error-on-mac-high-sierra-7c421362b5b5


## Crear proyectos con trellis-cli
```$ trellis new dominio.com```


## Los certificados Let's Encrypt no se renuevan

No se que ha podido pasar, pero no se han renovado los certificados Let's Encrypt en bowicroqueta.com y cuando he ido a renovarlos tampoco me dejaba acceder vía SSH por el puerto 22. Me daba el siguiente error: 

```ssh connect to host port 22 connection refused```

He probado de todo, reiniciar el servidor, cambiar puerto del 22 al 2222... nada...  y al final lo que me ha dejado es:

Desde la consola en Digital Ocean

Login con root y

```nano /etc/ssh/sshd_config```

Cambiar **PermitRootLogin** de no a yes

Reiniciar el servicio ssh
```sudo service ssh restart```

Comprobar que podemos acceder vía ssh desde local

Renovar los certificados
```ansible-playbook server.yml -e env=production --tags letsencrypt```

## Error 500

La configuración de NGINX está en:
/etc/nginx/sites-available/dominio.com.conf

Dentro de la configuración tendremos donde está configurado que se guarden los logs de errores y accesos. Normalemnte en: /srv/www/dominio.com/logs/access.log


## Trellis New

Archivos a cambiar en nuevo proyecto con Trellis

trellis/deploy-hooks/build-before.yml
trellis/group_vars/all/deploy-hooks.yml
trellis/group_vars/development/wordpress_sites.yml
trellis/group_vars/production/wordpress_sites.yml
trellis/group_vars/production/main.yml
trellis/group_vars/staging/main.yml
trellis/group_vars/production/vault.yml
trellis/group_vars/staging/vault.yml
trellis/galaxy.yml

Kinsta

trellis/roles/deploy/hooks/finalize-after.yml
trellis/ansible.cfg


```$ trellis galaxy install```



## Bedrock New

Archivos a cambiar en nuevo proyecto con Bedrock

site/config/application.php
site/composer.json
site/auth.json
site/scripts/
site/wp-cli.yml



## ModuleNotFoundError: No module named 'ansible' Trellis error when deploying

Si encontramos este error:

Traceback (most recent call last):
  File "/Users/carlos/Sites/gruposaona.com/trellis/.trellis/virtualenv/bin/ansible-playbook", line 34, in <module>
    from ansible import context
ModuleNotFoundError: No module named 'ansible'
exit status 1

Tenemos que borrar la carpeta de trellis/.trellis y hacer un trellis init de nuevo.
Nos ha pasado por haber hecho una actualización de brew y nos ha petado la instalación


## Subir tamaño de archivos

En trellis/group_vars/staging/main.yml (si es staging)

```
php_post_max_size: 100M
php_upload_max_filesize: 100M
php_max_execution_time: 300
```

```$ trellis provision --tags "php nginx wordpress-setup" staging ```

Si no se ejecutan todos los tags al hacer el provision, es posible que sea NGINX el que no permita la subida por el límite que pone ```client_max_body_size``` en trellis/roles/wordpress-setup/templates/wordpress-site.conf.j2

Si nos pasa que no podemos subir un archivo grande es posible que sea por eso. Lo que tenemos que hacer es modificar el límite de subida de NGINX en el servidor. Para esto logueamos via ssh con el usuario root y modificamos la configuración del sitio en nginx:

```$ cd /etc/nginx/sites-enabled```
```$ nano nombre-del-sitio.com.conf```
client_max_body_size 100m
```$ sudo systemctl restar nginx```

## Fix Update apt packages

Tenemos este error

```fatal: [slynd_staging]: FAILED! => {"changed": false, "msg": "Failed to update apt cache: W:An error occurred during the signature verification. The repository is not updated and the previous index files will be used. GPG error: http://nginx.org/packages/mainline/ubuntu jammy InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 2FD21310B49F6B46, W:http://ppa.launchpad.net/ondrej/php/ubuntu/dists/jammy/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details., E:Repository 'http://ppa.launchpad.net/ondrej/php/ubuntu jammy InRelease' changed its 'Label' value from '***** The main PPA for supported PHP versions with many PECL extensions *****' to 'PPA for PHP', W:This must be accepted explicitly before updates for this repository can be applied. See apt-secure(8) manpage for details., W:https://mirror.rackspace.com/mariadb/repo/10.6/ubuntu/dists/jammy/InRelease: Key is stored in legacy trusted.gpg keyring (/etc/apt/trusted.gpg), see the DEPRECATION section in apt-key(8) for details."}```

Si entramos con el user root al servidor y hacemos ```$ apt update``` veremos que hay un error, seguramente en la key usada por nginx. Para solucionarlo, con root en la misma sesión hacemos esto para actualizar la KEY:

```curl -O https://nginx.org/keys/nginx_signing.key && apt-key add ./nginx_signing.key```

Otro posible problema es que el repo de mariadb esté dando problemas para actualizar MariaDB. En este commit Ben Words cambió el repo utilizado, pero es posible que en el servidor se quede configurado en /etc/apt/sources.list.d

https://github.com/roots/trellis/pull/1422/commits/c95af7755d66002288218e6777601eda54543176

La solución, renombrar el directorio /etc/apt/sources.list.d para que se vuelva a generar conforme vayan instalándose los diferentes roles:

```$ mv /etc/apt/sources.list.d /etc/apt/sources.list.d.back```

+ info: https://discourse.roots.io/t/trellis-provision-failed-to-update-apt-cache-unknown-reason/24758/12
+ info: https://discourse.roots.io/t/provisioning-production-fails-no-release-file/21678/18


## Fix unknown directive "http2" nginx

https://discourse.roots.io/t/nginx-emerg-unknown-directive-http2/28842/1

Hay que instalar última versión de nginx directamente con usuario root

Seguir esta guía:
https://medium.com/@mustafaaltunok/a-step-by-step-guide-to-upgrade-nginx-to-the-latest-stable-version-on-ubuntu-cbfac70afb65

```
$ nginx -v
$ sudo cp -r /etc/nginx /etc/nginx.backup
$ sudo apt update
$ sudo apt install software-properties-common
$ sudo add-apt-repository ppa:nginx/stable
$ sudo apt update
$ sudo apt install nginx -> Contestar **N** keep your currently-installed version
$ nginx -v
$ sudo systemctl restart nginx
$ sudo nginx -t
$ sudo systemctl status nginx
```