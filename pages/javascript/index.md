# Conversión jQuery a Vanilla Javascript ES6

Para olvidarnos de jQuery de una vez por todas vamos a poner un listado de funciones que normalemnte utilizamos para no tener que recurrir a jQuery para todo

## Consulta de elementos
const box = document.querySelector('.box'); // el primero
const boxes = document.querySelectorAll('.box'); // todos

## Binding de eventos
box.addEventListener('click', function(){

});

## Asignación de clases a un elemento
https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
box.classList.add('active')
box.classList.remove('active')
box.classList.replace('active', 'inactive')
box.classList.toggle('active')

box.classList.contains('active') // Devuelve true si existe la clase en la lista

## AppendTo
const box = document.querySelector('.box'); // el primero
const p = document.createElement('p')
box.appendChild(p);

## Función MAP
Si necesitamos mostrar lo que devuelve la función map, todo lo separa con comas. Para evitar esto hay que hacer un join('') después.

-----

llamadas Ajax
trigger de eventos pasando parámetros


