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


También podemos generar un nuevo certificado SSL 

```$ openssl req -newkey rsa:2048 -nodes -keyout braindex-development.key -out braindex-development.csr```

y luego generar el archivo PEM con formato -x509

```$ openssl req -x509 -key braindex-development.key -nodes -newkey rsa:2048 -out braindex-development.pem```

y por último obtener el .crt

```$ openssl req -key braindex-development.key -new -x509 -days 365 -out braindex-development.crt```


## Comprobación de certificados

Podemos comprobar el certificado viendo que estos comandos devuelven el mismo texto:

```$ openssl rsa -noout -modulus -in braindex-development.key | openssl md5```
```$ openssl x509 -noout -modulus -in braindex-development.crt | openssl md5```
```$ openssl req -noout -modulus -in braindex-development.csr | openssl md5```

```$ openssl pkey -pubout -in braindex-development.key | openssl sha256```
```$ openssl x509 -pubkey -in braindex-development.crt -noout | openssl sha256```
```$ openssl req -pubkey -in braindex-development.csr -noout | openssl sha256```


+ info

https://www.digitalocean.com/community/tutorials/openssl-essentials-working-with-ssl-certificates-private-keys-and-csrs
https://www.digicert.com/kb/ssl-support/openssl-quick-reference-guide.htm


De verdad, que locura. Resulta que hay que crear dos certificados. Uno que serviría de root, con el que firmaríamos y otro que es el que tendríamos que pasar firmado.

1. Creamos Key de root
```$ openssl genrsa -out braindex-development.key 4096```

2. Creamos CRT de root
```$ openssl req -x509 -new -nodes -key braindex-development.key -sha256 -days 1024 -out braindex-development.crt```

3. Creamos Key self signed que utilizaremos
```$ openssl genrsa -out blavetstudio.com.key 2048```

4. Creamos CSR 
```$ openssl req -new -key blavetstudio.com.key -out blavetstudio.com.csr```

5. Comprobamos CSR
```$ openssl req -in blavetstudio.com.csr -noout -text```

6. Obtenemos CRT firmándolo con la key root
```$ openssl x509 -req -in blavetstudio.com.csr -CA braindex-development.crt -CAkey braindex-development.key -CAcreateserial -out blavetstudio.com.crt -days 500 -sha256```

7. Verificamos
```$ openssl x509 -in blavetstudio.com.crt -text -noout```

https://gist.github.com/fntlnz/cf14feb5a46b2eda428e000157447309

Pues ahora por lo visto yo he utilizado openssl pero la versión que me daba que estaba utilizando era la LibreSSL 2.8.3

``` $ openssl version```

Para cambiar a OpenSSL 1.1.1 habría que poner esto en el PATH

export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"

https://stackoverflow.com/questions/62195898/openssl-still-pointing-to-libressl-2-8-3

Veremos a ver como lo hacemos para conectar con producción...

## Comprobación de un certificado SSL instalado en un dominio

Lo mejor es utilizar

https://www.ssllabs.com/ssltest/analyze.html?d=braindex.academy