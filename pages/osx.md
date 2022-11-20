---
title: OSX
---

# {% $markdoc.frontmatter.title %}


## Cambio de versión PHP instalada por defecto en OSX

Es posible que composer necesite tener instalada una versión actual de PHP para funcionar. La versión que tenemos instalada se puede ver con ```php -v```. Si tenemos una menor podemos actualizarla con los scripts proporcionados por liip.ch

https://php-osx.liip.ch/

Para instalar la 7.2 serías así:

```curl -s http://php-osx.liip.ch/install.sh | bash -s 7.2```

Para que desde la consola nos muestre la nueva versión de PHP instalada tenemos que hacer:

```export PATH=/usr/local/php5/bin:$PATH```

Más info 
https://coolestguidesontheplanet.com/upgrade-php-on-osx/
https://jason.pureconcepts.net/2016/09/upgrade-php-mac-os-x/


## Desactivamos Spotlight para mejorar carga de CPU

```sudo mdutil -a -i off```

https://macmetric.com/fix-mds_stores-consuming-high-cpu-usage/