---
title: Consola
---

# {% $markdoc.frontmatter.title %}

Comandos útiles para trabajar via consola

## Cambio de base de datos cuando descargamos desde producción e instalamos en local para compatibilidad entre versiones de MySQL

```sed -i back 's~utf8mb4_unicode_520_ci~utf8mb4_unicode_ci~g' base-de-datos.sql```

https://stackoverflow.com/a/11287641/504910

Si la herramienta sed nos da este error: ```sed: RE error: illegal byte sequence```

...entonces ejecutar:

```LC_ALL=C sed -i back 's~utf8mb4_unicode_520_ci~utf8mb4_unicode_ci~g' base-de-datos.sql```

## Visualizar registros DNS de un dominio

```whois google.com```  
```host -a google.com```  
```nslookup -type=mx google.com``` 
```dig extraordinaria.es any```  

https://www.whatsmydns.net/ 

http://www.beginninglinux.com/home/server-administration/list-dns-records-nameservers-of-a-domain-from-command-line


## Buscar cadena en fichero grande (base de datos por ejemplo...)
grep "woocommerce_version" hcreati_db-migrate-20181122171659.sql

## Mostrar espacio utilizado via línea de comandos
https://superuser.com/a/162750/636217
du -sh /var/* | sort -h

## Configurar cronjobs via línea de comandos

- Listar ```$ crontab -l```
- Listar los cronjobs de todos los usuarios ```$ for user in $(cut -f1 -d: /etc/passwd); do echo $user; crontab -u $user -l; done```
- Editar cronjobs ```$ crontab -e```

Ejemplo de edición de cronjobs

MAILTO=""
#30	3	*	*	*	./backup_diario.sh
30	7	*	*	*	/etc/init.d/psa restart

## Borrar carpetas node_modules de proyectos antiguos para liberar espacio
```$ npx npkill```