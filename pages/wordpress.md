# WordPress

## WPScan

Para poder hacer un escaneo de seguridad con la API gratuita de WPScan necesitaremos obtener un token con una cuenta en https://wpscan.com

Una vez obtenido el token lo utilizaremos con el comando:

```$ wpscan --url https://dominio.com/ --api-token ed5AkhpP2c1V8vzdhVMWVad27pPz2zXksPeffalZyA```

## Errores php-error

https://wordpress.stackexchange.com/a/373027/39047

wp-admin/admin-header.php:

```
$debug = print_r(error_get_last(),true);
echo '<p>php-error: '.esc_attr($debug).'</p>';
```