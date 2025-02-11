---
title: Bedrock
---

# {% $markdoc.frontmatter.title %}

## Al hacer un sync.sh no descarga la base de datos

Al ejecutar ```./sync.sh staging development --local```no descarga la base de datos.

Es posible que haya una incompatibilidad entre la versión en production/staging y la de nuestro entorno de desarrollo. Normalmente el problema es que en la primera línea del SQL exportado por WP-CLI se pone este código:

```/*!999999\- enable the sandbox mode */```

Está relacionado con una incompatibilidad entre versiones de mariadb.

Para solucionarlo, en el script.sh habría que cambiar esta línea:

```wp "@$FROM" db export --default-character-set=utf8mb4 - | wp db import - &&```

Por esta otra:

```wp "@$FROM" db export --default-character-set=utf8mb4 - | tail +2 | wp db import - &&```

Al hacer el import quitamos la línea antes de importarla en la base de datos local.

*Hay que tener en cuenta que se ejecuta esto dos veces en la última versión de sync.sh, con lo que habrá que actualizar el código en las dos líneas*

**+ info**

- https://github.com/Dolibarr/dolibarr/issues/29724
- https://mariadb.org/mariadb-dump-file-compatibility-change/



https://upsun.com/blog/bedrock-wordpress-development/
https://12factor.net/