---
title: SSH / SSL
---

# {% $markdoc.frontmatter.title %}

## Generación de keys formato X.509

Para generar claves compatibles con formato X.509 OpenSSH no es compatible actualmente con ese formato, con lo que hay que generar el par de claves, cambiarle la cabecera y utilizar OpenSSL para generar el archivo PEM en formato X.509.

Estos son los pasos:

1. Creación de clave RSA 4096
```$ ssh-keygen -t rsa -b 4096```

2. Cambio de cabeceras de clave de OpenSSH a RSA
```$ ssh-keygen -p -m PEM -f ~/.ssh/braindex-staging-id_rsa```

3. Generación de archivo PEM en formato X.509
```$ openssl req -x509 -key ~/.ssh/braindex-staging-id_rsa -nodes -newkey rsa:2048 -out braindex-staging-id_rsa.pem```