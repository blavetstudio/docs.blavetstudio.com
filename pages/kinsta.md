---
title: Kinsta
---

# {% $markdoc.frontmatter.title %}

## Problemas encontrados al hacer los deploys a Kinsta

https://roots.io/guides/deploying-to-kinsta-with-trellis/

## Trellis no podía leer el código desde bitbucket

Añadir SSH pública del server al repo

## No se puede hacer el deploy porque da un fallo en la conexión SSH

En la guía para utilizar Trellis + Bedrock en Kinsta (https://roots.io/guides/deploying-to-kinsta-with-trellis/) se salta el paso de que hay que poner el usuario y grupo a utilizar para las conexiones via SSH:

En  trellis/group_vars/staging/main.yml y  trellis/group_vars/production/main.yml, aparte de poner el directorio correcto según la instalación en Kinsta hay que cambiar el usuario de example al usuario que se te proporcione para acceder via SSH

- web_user: example
- web_group: www-data

## No se compila Sage

https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml

En los deploys de Trellis no se compila nada. Hay que compilarlo en local y luego copiarlo todo al server. 

Por eso no se utiliza Yarn en el servidor y no hay problemas de compatibilidad entre versiones. Para esto hay que descomentar las tareas de este archivo https://github.com/roots/trellis/blob/master/deploy-hooks/build-before.yml y Trellis lo ejecutará mediante Ansible antes del deploy

## Añadir constantes al archivo .env

El archivo .env se genera cada vez que se hace un deploy. Para que se genere con constantes personalizadas tenemos que declararlas:

- en la variable wordpress_env_defaults en el archivo trellis/roles/deploy/vars/main.yml
- en la variable wordpress_env_defaults en el archivo trellis/group_vars/all/helpers.yml
- en group_vars/<environment>/wordpress_sites.yml creando una variable env. Algo así:
  ```wordpress_sites:
  example.com:
  ...
  env:
    db_name: override_name
    new_env_var: foo
  ```

+info aquí https://discourse.roots.io/t/custom-env-variables-trellis/6330/2

## Refrescar caché en los deploys

Si la URL puesta en la documentación para refrescar la caché da error, utilizar este repo para hacerlo automáticamente:
https://github.com/ItinerisLtd/trellis-purge-kinsta-cache-during-deploy

Después de instalarlo como pone se puede lanzar la ejecución de varias formas:

1. el hook deploy_after lo añadimos a trellis/roles/deploy/defaults/main.yml
2. También se podría poner en otro sitio, como en trellis/roles/deploy/hooks, añadiendo un nuevo archivo, pero habría que hacer la llamada a ese nuevo archivo desde trellis/roles/deploy/defaults/main.yml
3. También se podría, como aconsejan aquí https://roots.io/trellis/docs/deploys/#hooks, poner los hooks personalizados en la carpeta trellis/deploy-hooks
4. En la documentación del repo pone que se ponga en trellis/group_vars/all/deploy-hooks.yml pero esta opción no la he probado

```yaml
# group_vars/all/deploy-hooks.yml
# Learn more on https://roots.io/trellis/docs/deploys/#hooks
deploy_after:
  - "{{ playbook_dir }}/vendor/roles/trellis-purge-kinsta-cache-during-deploy/tasks/main.yml"
```
  
## Revisar tamaño del disco via SSH

```$ du -h /www/juristas_284/public | sort -rn```

## Tareas para el personal de Kinsta cuando hagamos un proyecto nuevo

1. Cambiar el document root

Hi, I'm using Trellis, Bedrock and Sage to deploy to Kinsta. I need the final step here for my xxxxxxx.com site - https://kinsta.com/blog/bedrock-trellis/#final-steps-with-kinsta-support

I need the document root to point to public/current/web on staging and production

3. Cambiar cronjobs para que funcionen con Bedrock **Esto lo podemos hacer nosotros cambiando el crontab y asignando /wp/wp-cron.php**

Last, I need to change the cronjobs to run /wp/wp-cron.php route as it is a bedrock installation and WordPress is installed in the /wp folder

MAILTO=""
#Ansible: domain WordPress cron
1,16,31,46 * * * * curl -kILs -H 'Host: domain.com' https://localhost/wp/wp-cron.php?server_triggered_cronjob >/dev/null 2>&1 # Kinsta Primary domain cron

2. Bloquear emails de staging - **Ponemos mu plugin para desactivar emails ya que postfix se autohabilita solo**

I need to block POSTFIX email service completely on staging. I don't want any email be sent from staging as I have transactional emails that are sent to customers and they may get duplicated emails.

