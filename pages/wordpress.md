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

## Error base de datos se queda colgada al desplegar

Al desplegar a producción la base de datos se queda colgada haciendo una consulta eterna tal que así:

```
SELECT `a` . `action_id` FROM `wp_actionscheduler_actions` `a` LEFT JOIN `wp_actionscheduler_groups` `g` ON `g` . `group_id` = `a` . `group_id` WHERE ? = ? AND `g` . `slug` = ? AND `a` . `hook` = ? AND `a` . `status` IN (?) AND `a` . `claim_id` = ? AND ( `a` . `hook` LIKE ? OR ( `a` . `extended_args` IS NULL AND `a` . `args` LIKE ? ) OR `a` . `extended_args` LIKE ? ) ORDER BY `a` . `scheduled_date_gmt` ASC LIMIT ?, ... 
```

Por lo visto hay muchas acciones completadas y la base de datos de acciones era tan grande que limitaba esa consulta y hacía que se quedase colgada la web.

Limpiamos la tabla wp_actionscheduler_actions así:

```
SET SQL_MODE='ALLOW_INVALID_DATES';
CREATE TEMPORARY TABLE tmp_data_table SELECT * FROM wp_actionscheduler_actions where `status` = 'pending';

TRUNCATE TABLE wp_actionscheduler_actions;

INSERT wp_actionscheduler_actions SELECT * FROM tmp_data_table;

DROP TABLE tmp_data_table;

TRUNCATE TABLE wp_actionscheduler_logs;
```

https://decodecms.com/borrar-tablas-wp_actionscheduler_actions-y-wp_actionscheduler_logs/