---
title: Server
---

# {% $markdoc.frontmatter.title %}

## Como gestionar caídas en un servidor de producción
Transcripción de https://www.rafaeldiez.com/mi-sitio-web-se-ha-caido-y-ahora-que-hago/

### Comprueba que de verdad está caido.

No te fies de la palabra de nadie, ni siquiera de la tuya propia. Puede que tu navegador te esté mostrando la versión cache. Prueba otro. Aprieta SHIFT a la vez que recargas la página.

Puede ser tu conexión a Internet. Entra en https://www.google.com ¿Funciona? Bien. Google siempre está ahí. Vale tienes conexión a Internet pero necesitas saber si la página solo te falla a ti o es general. Usa https://www.downforeveryoneorjustme.com

Si es un problema de la conexión a Internet ya puedes respirar tranquilo. En caso contrario, contacta con el proveedor de hosting y abre un ticket de soporte. Que curren que para eso cobran.

### Averigua que ha pasado.
Tu sitio web parece que no funciona. No te quedes de brazos cruzados esperando a que resuelvan el ticket. Las razones de la caída pueden ser varias:

- Un error de programación.
- Un problema con el nombre de dominio o con los DNS.
- Un problema de conectividad del servidor.
- Algun servicio o programa falla. (webserver, base de datos,etc).
- Todo el servidor se ha ido al garete.

Si el problema fuese de programación, lo normal es que el navegador (en la barra de estado) te diga que la carga de la página se ha completado en vez de "Esperando.." o "Conectando..". Todos los servidores web tienen logs; echa un vistazo a ver que está pasando.

Más pruebas. Tema básico. El comando ping. Hacer un ping es mandar un mensaje al servidor para ver si esta OK. Éste respondera con otro mensaje.

```$ ping www.dominio.com```

No pongas lo de http. Si el servidor está funcionando y tiene conexión lo normal es que veas algo parecido a esto en función de que SO estes usando:

```64 bytes from 173.194.41.18: icmp_seq=16 ttl=56 time=36.293 ms```

Es posible que el ping esté capado en nuestro servidor, con lo que no es fiable que no devuelva datos.

En la respuesta del ping aparece la IP de tu servidor. Comprueba que de verdad es tu IP. Tu proveedor de hosting tiene que saberlo. Si esa no es tu IP puede que tu dominio haya caducado. Usa Whois.sc para comprobar los datos y las fechas de renovación.


```$ whois dominio.com```

```$ nslookup dominio.com```

```$ host dominio.com```

### Sin conectividad

Si el ping no responde puede que el servidor se haya caido o que haya un problema de red. Ojo! Tienes que tener en cuenta que en alguno hostings, como Amazon EC2, bloquean las peticiones de ping. Aun hay posibilidades de que tu servidor esté vivo.

Para tener mas datos de si es un problema de red el comando traceroute( tracert en Windows) te muestra todos los nodos por los que pasas para llegar desde tu conexión hasta tu servidor.

```$ traceroute www.dominio.com```

Si ves tres asteriscos es que un nodo no responde, bien por seguridad o porque esté caido. El ultimo nodo que aparezca debería ser tu servidor, eso indica que está activo y funcionando.

En el caso de que no responda, lo normal seria que tu proveedor de hosting tenga problemas de red. Puedes intentar averiguar si esos problemas te afectan a solo a ti o a todos los servidores de ese proveedor. Si usas un hosting compartido http://www.my-ip-neighbors.com/ te mostrará con que sitios web compartes IP. Prueba si tus vecinos responden o no. Si no usas un alojamiento compartido puedes probar suerte haciendo ping a las IPS consecutivas a la tuya. Normalmente los proveedores de hosting compran paquetes de IP seguidas.

### Comprueba tu servidor web

Si tu servidor esta encendido y tiene conexión pero, aun así, no sirve las páginas web es hora de que mires a ver que pasa con el software.

Puedes interactuar con el servidor web sin usar un navegador. El comando telnet está disponible en Mac y Linux. En Windows XP y recientes creo que no asi que tendras que utilizar Putty.

```$ telnet www.dominio.com 80```
El servidor te contestará y se quedara esperando ordenes. Teclea lo siguiente y luego dos lineas en blanco:

```
GET / HTTP/1.1
Host: www.dominio.com
```

Con la primera / indicas que quieres que te sirva el contenido raiz; puedes pedir otras rutas como /blog/index.html. En el Host indicas que sitio web quieres ver ya que un mismo servidor puede manejar varios distintos. Si todo está funcionando bien el servidor te responderá con las cabeceras HTTP y después el código HTML. 

Si no consigues conectar con telnet o no te responde más o menos lo que has visto lo más seguro es que tu servidor web esté fallando.

### Conectate a tu servidor

Ya no hay mucho más que se pueda hacer desde fuera. Toca conectarse y ver desde dentro que está pasando.

Es posible que tu proveedor de hosting tenga un panel de control. Los mas comunes son cPanel y Plesk. Intenta acceder y ver si los servicios están arrancados.

Si no tienes panel de control, accede por SSH. En los alojamientos compartidos es posible que no tengas permiso para acceder via SSH.

```$ ssh -l nombredeusuario www.dominio.com```

Desde Windows tendrás que usar Putty, no hay comando SSH en los sistemas operativos de Microsoft.

### El disco duro se ha llenado

Si se llena todo el espacio disponible en el servidor es posible que los servicios dejen de funcionar. No es algo habitual pero si muy facil de resolver. El comando df sirve para ver todos los volúmenes habilitados en el sistema.

```$ df -h```  

Por cada volumen se mostrara el tamaño total y el % de uso.

Si alguno de ellos está a tope toca operación limpieza. Conéctate por FTP y borra algo de lo que puedas prescindir temporalmente; por ejemplo backups antiguos.

Si no sabes por donde empezar puedes usar el comando find para encontrar archivos grandes o antiguos. Con un usuario no root tendrás muchos mensajes de permission denied.

**Muestra tamaño de un directorio concreto**
```$ du -sh folder/```

**Busca archivos mayores de 10 megabytes en todo el servidor:**

```$ find / -size +100000000c | more```

Puedes restringir la busqueda a una carpeta en concreto y además ver el tamaño de cada archivo:

```$ find /var/www/default -size +10000000c -printf "%15s %pn"```

Y además puedes buscar por antigüedad. Los archivos de mas de 60 días puede que no te hagan falta ya:

```$ find /var/www/default -size +10000000c -mtime +60 -printf "%15s %pn"```  

Una vez hayas salido de este marrón tendrás que preocuparte de averiguar que programas o scripts están provocando que el servidor se llene.

### ¿Te quedas sin memoria RAM?

Puede que tu servidor vaya tan, tan lento que parezca que esta parado. Y si ademas no tiene espacio en el disco para hacer swap ya ni te cuento.

Con el comando free puedes ver cuanta memoria RAM esta usando el servidor.

```$ free -m```

Con el parámetro -m haces que el resultado salga en megas, que es mas fácil de digerir. Mi VPS tiene 589 megas de RAM (si, que pasa!) de los cuales tiene 572 usados y 16 libres. Fíjate en buffers y cache. Cuanto más se acerce buffers a cache, más cerca estará el servidor de quedarse sin memoria, sobretodo si el swap también se llena.

Si el servidor se está quedando sin memoria vamos a ver quien es el se la está comiendo.

```$ top```

En tiempo real, top te muestra que aplicaciones están en ejecución y que recursos están consumiendo.

Cada aplicación o servicio puede tener varios procesos en ejecución. Revísalos cuidadosamente y si hay alguno que se esté pasando evalua si puede ser reiniciado o parado. Busca en Google información sobre ese proceso y que consecuencias puede tener el pararlo.

Tienes que tener cuidado con esto; no vayas a parar un proceso vital para el sistema y tires abajo todo el servidor.

Solo puedes parar un proceso que seas su dueño o seas root (que es el dueño de todos). Busca el ID de proceso y teclea el siguiente comando con el numero de ID de proceso que quieras detener:

```$ kill -9 25869```

El parámetro -9 ordena detenerlo completamente. De nuevo con top puedes ver si ese proceso ha vuelto a lanzarse o no. Si aparece en la lista y se está comiendo otra vez la RAM es que paraste un proceso hijo de otro que le está mandando hacer maldades. Para averiguar quien es su padre usa el siguiente comando:

```$ ps -o ppid,user,command 25869```

Y obtendras un resultado parecido a este:

```
$ ps -o ppid,user,command 25869
PPID USER     COMMAND
18401 www-data /usr/sbin/apache2 -k start
```

Con kill -9 puedes parar tambien el proceso padre. Y vuelta a empezar. Ojo, con parar servicios del sistema (daemons) con kill -9. Es mejor usar sudo service nombredeservicio stop. Depende de que SO estes usando pero normalmente puedes encontrar una lista de daemons en /etc/init/.

Si despues de reiniciar un servicio del sistema vuelve a devorar RAM tendrás que echarle un vistazo a los logs a ver que es lo que lo provoca.


## Habilitar el acceso de root via ssh

Por lo general dejamos desactivada la opción de que el usuario root se pueda conectar via SSH, con lo que solo permitimos la conexión a través de la consola de Digital Ocean. Para poder activarlo y poder entrar directamente desde nuestro terminal tenemos que habilitar el acceso ssh para root:

1. Desde la consola de Digital Ocean, editamos el archivo sshd_config en /etc/ssh/sshd_config
  ```$ nano /etc/ssh/sshd_config```
2. Cambiamos o añadimos (si no está ya) la siguiente línea:
  ```PermitRootLogin yes```
3. Guardamos el archivo /etc/ssh/sshd_config
4. Reiniciamos el servicio ssh: 
  ```$ service sshd restart```

## ssh: connect to host XXX.XXX.XXX.XXX port 22: Connection refused
Nos puede pasar en algún momento que nos de este error

En principio con hacer un restart del servicio SSH sería suficiente.

```$ sudo service sshd restart```

Si no funciona, hacer los pasos de la solución para habilitar el acceso root via ssh

https://linuxhint.com/fix_connection_refused_ubuntu/

## Autenticación multifactor
https://www.digitalocean.com/community/tutorials/how-to-set-up-multi-factor-authentication-for-ssh-on-ubuntu-16-04


## Listar todos los servicios activos
```$ service --status-all``` 