## GraphQL Api Error 

```
=================
GraphQl API error
-----------------
== errors:
   - Internal server error [internal]
== query: GdprConfigs
== variables: {
  "lang": "FR"
}
=================
```

El error es producido porque no tiene datos de WordPress de la configuración GDPR. Hay que entrar en la configuración del plugin de Cookies y guardar una primera vez para que se envíen datos.

http://localhost/wp-admin/options-general.php?page=cookie-law-consent-settings