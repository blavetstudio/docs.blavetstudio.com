---
title: CI/CD
---

# {% $markdoc.frontmatter.title %}

## CI/CD en proyectos con Trellis

El proyecto debe estar subido a Github para poder utilizar Github actions. Vamos a utilizar 

- Crear carpeta en la raiz del proyecto .github/workflows  
- Crear archivo github-actions.yml

```
name: Deploy site to Kinsta

on:
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - uses: actions/setup-node@v2
      with:
        node-version: '16'
        cache: yarn
        cache-dependency-path: site/web/app/themes/lassal/yarn.lock
    - uses: shimataro/ssh-key-action@v2
      with:
        key: ${{ secrets.TRELLIS_DEPLOY_SSH_PRIVATE_KEY }}
        known_hosts: ${{ secrets.TRELLIS_DEPLOY_SSH_KNOWN_HOSTS }}
    - uses: webfactory/ssh-agent@v0.5.4
      with:
        ssh-private-key: ${{ secrets.TRELLIS_DEPLOY_SSH_PRIVATE_KEY }}
    - uses: roots/setup-trellis-cli@v1
      with:
        ansible-vault-password: ${{ secrets.ANSIBLE_VAULT_PASSWORD }}
    - name: Deploy
      run: trellis deploy production

```

## Ajustes

https://github.com/blavetstudio/**proyecto**/settings

- En el proyecto en github definir las siguientes variables en Settings / Security / Secrets and variables / Actions:

**ANSIBLE_VAULT_PASSWORD**  
La sacaremos de trellis/.vault-pass

**TRELLIS_DEPLOY_SSH_PRIVATE_KEY**  
Es la clave privada, no la pública. La sacaremos de ~/.ssh/id_rsa
Esta key debe de estar incluida en el servidor para que se pueda conetar
En Kinsta tenemos puestas dos keys: la del equipo de Josh y la de Carlos. Utilizar una de las dos.

**TRELLIS_DEPLOY_SSH_KNOWN_HOSTS**  
La sacaremos de ~/.ssh/known_hosts  
Debemos haber conectado antes desde un equipo para obtener el known_host de IP:puerto. Para saber IP y puerto del proyecto podemos verlo en trellis/hosts/entorno

Esta key es algo así:  
[35.205.43.218]:52109 ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmASJAHqaslzdHAyNTYAAAAIbmlzdHAyNTYAAABBBNo9vy/HKAJS17EtgiN5fthCR6dg0rmqrLw8nzylrF/WzOVJKJiavkCEbyYj5TASPO/VSoalOYx7j93etzJ1KrO+WqQtw0VI=

**Atención:** Hay que pegar también la IP que si no no puede conectar. Hay que poner toda la línea de known_hosts relativa al servidor + puerto...

## CI/CD directo a Beanstalk
Proximamente