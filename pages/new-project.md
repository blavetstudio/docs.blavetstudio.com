---
title: Pasos nuevo proyecto
---

# {% $markdoc.frontmatter.title %}

## Instalación Trellis + Bedrock
```$ trellis new dominio.com```

Si no te funciona deberás de instalar el cliente de trellis: https://github.com/roots/trellis-cli
```brew install roots/tap/trellis-cli```

.vault_pass

## Archivos iniciales
.editorconfig  
.gitignore  
CHANGELOG.md  
README.md  
.vscode/  

## Configuración Bedrock
- .gitignore  
- .env  
- auth.json  
- composer.json  
- wp-cli.yml  

## Instalación Paquetes
composer install

## Instalación Sage
```$ composer create-project roots/sage projectheme dev-master```

### Archivos a modificar
- /dominio.com/site/web/app/themes/projectheme/style.css
Cambiar nombre del tema, autor, versión...

- /dominio.com/site/web/app/themes/projectheme/package.json
Quitar paquetes que no vamos a utilizar (tailwind)
Poner paquetes que vamos a utilizar (gsap, fontfaceobserver)

- /dominio.com/site/web/app/themes/projectheme/webpack.mix.js
Quitar lo referente a Tailwind

- /dominio.com/site/web/app/themes/projectheme/composer.json
- Poner paquetes que vamos a utilizar:
  "log1x/acf-composer": "^2.0",
  "log1x/sage-directives": "^1.1",
  "log1x/sage-html-forms": "^1.0",
  "log1x/sage-svg": "^1.0",

- /dominio.com/site/web/app/themes/projectheme/app/Providers/ThemeServiceProvider.php
Ampliar funcionalidad para captura de notices para que no pete Woops https://gist.github.com/cfaria/7eb83ca2853cb062fd7f6365c9bd6de2


- /dominio.com/site/web/app/themes/projectheme/resources/styles/app.scss
- /dominio.com/site/web/app/themes/projectheme/resources/styles/editor.scss
- /dominio.com/site/web/app/themes/projectheme/resources/styles/common/global.scss
Quitar referencias a Tailwind

- /dominio.com/site/web/app/themes/projectheme/resources/views/
Quitar clases de Tailwind

### Archivos a borrar
- /dominio.com/site/web/app/themes/projectheme/tailwind.config.js


```$ composer install```
```$ yarn && yarn build```

## Creación repositorio
Crear repositorio en bitbucket/github y 

## Instalación de plugins


## Crear base de datos
Crear base de datos


## Configuración scripts
site/scripts


## Renombrar dominio
/themes/TEMA/webpack.mix.js - browserSync