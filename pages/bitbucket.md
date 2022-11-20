---
title: Bitbucket
---

# {% $markdoc.frontmatter.title %}

Pipelines en Bitbucket

Crear Pipeline

Poner VAULT_PASS como variable protegida en el pipeline
Una clave SSH del pipeline debe configurarse en Kinsta (~/.ssh/authorized_keys) para que Bitbucket pueda acceder a Kinsta para copiar archivos
La clave SSH del repo en Kinsta (~/.ssh/id_rsa.pub) debe configurarse en Bitbucket para que desde Kinsta se pueda descargar el repositorio via GIT



docker build sage10-docker --progress=plain

docker build sage10-docker -t blavetstudio/sage10-docker
docker push blavetstudio/sage10-docker