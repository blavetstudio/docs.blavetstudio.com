---
title: Sage
---

# {% $markdoc.frontmatter.title %}

## Errores StyleLint

Quitamos el StyleLint porque si no es demasiado restrictivo y vamos muy lentos programando.

/resources/assets/build/webpack.config.js:174

Comentamos esto

```
new StyleLintPlugin({
  failOnError: !config.enabled.watcher,
  syntax: 'scss',
}),
```

## Para instalar paquetes de npm desde github

https://stackoverflow.com/questions/17509669/how-to-install-an-npm-package-from-github-directly

```yarn add git+https://git@github.com/woocommerce/selectWoo.git```

o vía SSH

```yarn add git+ssh://git@github.com/visionmedia/express.git```


## Para instalar forks de paquetes php a través de composer directamente desde github 

https://stackoverflow.com/questions/13498519/how-to-require-a-fork-with-composer

```
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/woocommerce/selectWoo"
        }
    ],
    "require": {
        "select2/select2": "dev-master"
    }
}
```

y luego desde la consola

```composer update```

## Actualizacion Sage 10 beta 1 para utilizar php8

Al hacer la actualización de BAU a PHP8 hemos tenido que hacer una actualizacion de Sage10 beta1 para que funcionara con PHP8. 

Para referencias futuras, hay que hacer todo los cambios del commit:
Compatibilidad con PHP 8.0	fb645ae	Carlos Faria <carlos@blavetstudio.com>	23 ene 2023 13:28
https://github.com/blavetstudio/bau-web/commit/fb645ae302f23a2a671969f2bf1fd4dec0a9ba93

- Modificar laravel Mix para que utilice la carpeta public/ en lugar de dist/
- Actualizar Acorn para utilizar versión ^2.0

- site/composer.json
```
    "vlucas/phpdotenv": "^5.2",
```
- site/config/application.php
```
$env_files = file_exists($root_dir . '/.env.local')
    ? ['.env', '.env.local']
    : ['.env'];

$dotenv = Dotenv\Dotenv::createUnsafeImmutable($root_dir, $env_files, false);
```

- site/web/app/themes/nombre-tema/.gitignore
```
/public/*
!/public/entrypoints.json
!/public/manifest.json
```

- site/web/app/themes/nombre-tema/composer.json
```
    "php": "^7.3|^8.0",
    "roots/acorn": "^2.0"
```

- site/web/app/themes/nombre-tema/webpack.mix.js
  .setPublicPath('./public')

- Borrar la carpeta site/web/app/themes/nombre-tema/config o dejar solo app.php si estamos llamando desde ahí a ThemeServiceProvider

- Crear archivo site/web/app/themes/nombre-tema/public/entrypoints.json

Este archivo será el que controle la carga de los assets (js y css)

```
{
  "app": {
    "js": [
      "scripts/manifest.js",
      "scripts/vendor.js",
      "scripts/app.js"
    ],
    "css": [
      "styles/app.css"
    ],
    "dependencies": [
      "jquery"
    ]
  },
  "editor": {
    "js": [
      "scripts/manifest.js",
      "scripts/editor.js"
    ],
    "css": [
      "styles/editor.css"
    ],
    "dependencies": [
      "wp-blocks"
    ]
  }
}

```

- Crear archivo **vacío** site/web/app/themes/nombre-tema/public/manifest.json

- Si estamos haciendo deploys con Trellis, modificar trellis/deploy-hooks/build-before.yml para que haga el rsync de public/ y no de dist/

```src: "{{ project_local_path }}/web/app/themes/nombre-tem/public"```

- Cambiar las llamadas a asset() en setup.php a bundle('xxxx')->enqueue(); 

```use function Roots\bundle;```

```bundle('app')->enqueue();```

```bundle('editor')->enqueue();```

- Cambiar en functions.php la llamada a Bootloader
```
/*
|--------------------------------------------------------------------------
| Register The Bootloader
|--------------------------------------------------------------------------
|
| The first thing we will do is schedule a new Acorn application container
| to boot when WordPress is finished loading the theme. The application
| serves as the "glue" for all the components of Laravel and is
| the IoC container for the system binding all of the various parts.
|
*/

try {
    \Roots\bootloader();
} catch (Throwable $e) {
    wp_die(
        __('You need to install Acorn to use this theme.', 'sage'),
        '',
        [
            'link_url' => 'https://docs.roots.io/acorn/2.x/installation/',
            'link_text' => __('Acorn Docs: Installation', 'sage'),
        ]
    );
}
```


## wp/app/themes/

Si al actualizar todo, plugins y composer packages y sobre todo Acorn a la 5.0 y hay un error al cargar los estilos porque a la ruta le pone *dominio.com/wp/app* en vez de *dominio.com/app* es por culpa de Soil

1. Desactivar Soil
2. wp acorn optimize


## Al actualizar ACF Composer en un proyecto basado en las primeras versiones de Sage 10 no se cargan los scripts

El problema es que se lanza antes el hook do_action( 'enqueue_block_assets' ); que los add_action('enqueue_block_assets' de acf_composer

Hay que hacer los cambios de este PR en Sage:

https://github.com/roots/sage/pull/3167