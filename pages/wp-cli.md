---
title: WP-CLI
---

# {% $markdoc.frontmatter.title %}

## Comandos útiles para trabajar con WP-CLI

Genera posts en blog con contenido concreto a partir de la api de loripsum
```for n in {1..43}; do curl "https://loripsum.net/api/10/long/headers/decorate/link/ul/ol/bq/code/prude" | wp post generate --count=1 --post_status=publish --post_date=2018-10-17 --post_content; done```

Genera posts en blog con contenido concreto a partir de la api de loripsum y le asigna a cada post una imagen destacada con ID 208
```for n in {1..43}; do curl "https://loripsum.net/api/10/long/headers/decorate/link/ul/ol/bq/code/prude" | wp post generate --count=1 --post_status=publish --post_date=2018-10-17 --post_content --format=ids | xargs -0 -d ' ' -I % wp post meta update % _thumbnail_id 208; done```


Borra todos los posts de la papelera
```wp post delete $(wp post list --post_status=trash --format=ids)```


Borra todos los posts sin pasar por la papelera
```wp post delete $(wp post list --post_type=post --format=ids) --force```


Introduce 10 comentarios a un post concreto XXX
```for n in {1..10}; do curl "https://loripsum.net/api/1/short" | wp comment create --comment_post_ID=XXX  --comment_content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quantum Aristoxeni ingenium consumptum videmus in musicis? Quo modo autem philosophus loquitur? Consequens enim est et post oritur, ut dixi. Praeteritis, inquit, gaudeo. Summum ením bonum exposuit vacuitatem doloris; Duo Reges: constructio interrete. Haec dicuntur inconstantissime. Aliud igitur esse censet gaudere, aliud non dolere."; done```

Borra todos los comentarios
```wp comment delete $(wp comment list --format=ids) --force```

Genera 1 comentario para el post XXX
```wp comment generate --format=ids --count=1 --post_id=XXX --comment_content```

Genera 1 comentario para el post 15 con autor
```wp comment create --comment_post_ID=15 --comment_content="hello blog" --comment_author="wp-cli"```

Genera 200 usuarios con el role member y les pone contenido en un meta position
```for n in {1..100}; do wp user create test$n carlos+test$n@supermundano.com --role=member --first_name=Carlos --last_name=Faria --porcelain && wp user meta update test$n position "Director financiero" && wp user meta update test$n active 1; done```

Cambio de meta de usuarios. Cambiar a activo los 50 primeros usuarios
```for n in {1..100}; do wp user meta update test$n active 1; done```

Borrar todos los usuarios con el role member
```wp user delete $(wp user list --role=member --field=ID)```

Cambiar meta country a DE (Alemania) de los posts del ID 245 al 252
```for n in {245..252}; do wp post meta update $n country "DE"; done```

## Crear archivo POT para traducciones

Para poder utilizar el comando i18n de wp-cli, este debe estar actualizado. Si no lo está actualizarlo con:

```wp cli update```

Una vez actualizado podemos ir al directorio del plugin o tema y ejecutar lo siguiente:

```wp i18n make-pot . languages/nombre-del-dominio.pot```

Si nos da algún error, hay que mirar que no esté activo XDebug en el servicio php corriendo en el servidor. Si no dará un error de *** Fatal error: Maximum function nesting level of 'XXX' reached, aborting!” in PHP ***

## Error icu4c

Al actualizar brew e intentar instalar la última versión de WP-CLI nos hemos encontrado con que se actualiza la versión de icu4c pero PHP busca la versión para la que fue compilado.

En nuestro caso PHP buscaba icu4c 70 y esta se actualizó a la 73.6.

Instalamos la versión 70, pero como es una versión anterior, hay que forzar esa instalación:

https://mikebian.co/installing-an-old-homebrew-package/

```
$ brew tap-new $USER/local-tap
$ brew extract --version=70 icu4c $USER/local-tap
$ brew install icu4c@70

$ brew link --overwrite --force icu4c@70
``````

https://mikebian.co/installing-an-old-homebrew-package/