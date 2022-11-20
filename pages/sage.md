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