---
title: Composer
---

# {% $markdoc.frontmatter.title %}

## Subir plugins premium a bitbucket

- Subida inicial  
  - Crear carpeta del plugin en carpeta Composer en smdev  
  - Crear archivo composer.json dentro de la carpeta del plugin  
  - Crear nuevo repo en github  
  - Subir el contenido al repo: git push origin master  
  - Etiquetar commit con el número de versión del plugin git tag -a 1.2.3 -m "Versión 1.2.3"  
  - Subir etiqueta: git push --tags  


- Subida de versión  
  - Actualizar el código  
  - Hacer un nuevo commit  
  - Subir el contenido al repo: git push origin master  
  - Etiquetar commit con el número de versión del plugin git tag -a 1.2.3 -m "Versión 1.2.3"  
  - Subir etiqueta: git push --tags  


## Ejemplo de archivo composer.json
```
{
  "name": "smpremium/woocommerce-sponsor-a-friend",
  "type": "wordpress-plugin",
  "require": {    
    "composer/installers": "~1.2.0"
  }
}
```