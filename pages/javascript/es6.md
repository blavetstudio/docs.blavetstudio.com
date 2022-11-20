# Tipos de variable
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357529
const
let
var

**Object.freeze()** nos permite bloquear un objeto declarado con const para que sus propiedades no cambien

const person = {
  name: "Carlos",
  age: 28
}
Object.freeze(person)

Ya no podríamos modificar person.age

# Arrow functions
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357534
**this** en arrow functions.
this no cambia cuando se llama a una arrow function, a diferencia de una función anónima normal. Con lo que si necesitamos que this no cambie dentro de una función para seguir utilizándolo, utilizaremos arrow functions.
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357538

En caso de que necesitemos acceder a this, hay que tener cuidado porque como una función arrow no cambia la variable this

En una función arrow tampoco podremos acceder a la variable **arguments** en la que están los argumentos pasados a una función, con lo que no podremos acceder a esa variable. En el caso de una función normal si que podremos.

# Template Strings
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357539
Backticks + ${}

> Importante, podemos anidar backticks para utilizar funciones o ternary operators ?: y que así nuestros template strings no sean una pesadilla ilegible

Se pueden utilizar tagged templates para hacer un sanitize de variables -> https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357551

# Funciones para strings nuevas

.startsWith()
.endsWith()
.includes()
.repeat()

# Destructuring

## Objetos
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357547

Nos permite extraer datos de un objeto en sus propias variables. 

const person = {
  first: 'Carlos',
  last: 'Faria',
  social: {
    twitter: '@fren',
    facebook: 'FacebookUrl',
  }
}
const {first, last} = person;

const {facebook, twitter} = person.social;

Y también podemos renombrar las variables:
const {first:name, last:surname} = person;

O ponerle un valor por defecto por si no encuentra la variable
const {first = 'Name', last = 'Surname', address = 'Not found'} = person;

Valor por defecto y renombrar variables
const {first: name = 'Name', last: surname = 'Surname'} = person;

## Arrays
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357554

const details = ['Carlos',123,'https://supermundano.com'];
const [name, id, url] = details;
const [name, ...resto] = details;

> Para intercambiar los valores de dos variables se puede utilizar destructuración de arrays
let val1 = 'hola';
let val2 = 'adios';
[val1, val2] = [val2, val1];


Un buen uso que le podemos dar a la desestructuración de objetos es el pase de variables a una función, para que no importe el orden en las que las pasamos:

function nombreFuncion({param1 = 'texto1', param2 = 'texto2', param3 = 'texto3'} = {}){
  return `${param1} ${param2} ${param3}`;
}

const texto = nombreFuncion({param1: 'Hola', param2:'mundo'}); // Hola mundo texto3
const texto = nombreFuncion({param1: 'Hola'}); // Hola texto2 texto3

## Nuevos loops
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357559

const numbers = ['Uno', 'Dos', 'Tres']
for ( const[i, number] of numbers.entries()){
  console.log(i, number);
}

## Nuevos métodos para vectores, arrays
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357564

> **console.log** nos indica lo que contiene la variable, pero también nos indica el length, que nos dice si la variable es convertible en array y también nos indica el tipo de variable (string, array, nodelist, etc...). Por último tenemos **prototype** que nos indica las funciones de javascript que podríamos aplicar a la variable. Nos sirve un poco de guía para saber 

Array.from() -> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
Array.of() -> Convierte los valores que le pases en un array.

Array.find -> Encuentra un objeto dentro de un array
Array.findIndex -> Devuelve el índice del objeto
Array.some() -> Comprueba si alguno o todos los elementos de un array cumple una condición
Array.every() -> Comprueba si todos los elementos de un array cumple una condición

## Spread and Rest (...)
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357560

Para copiar variables iterables (arrays, listas de objetos...) ya que utilizar el símbolo = lo que hace es referenciar, con lo que si cambias un elemento del array se cambiará en las dos variables. El operador spread (...) hace una copia exacta.

## Actualizaciones de object literals
https://courses.wesbos.com/account/access/59ccc198056a0c552688728b/view/174357571
