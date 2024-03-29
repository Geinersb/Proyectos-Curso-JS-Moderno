//ejemplo de un WEAKSET

//al weakset solo se le pueden pasar objetos y no son iterables 
const weakset = new WeakSet();

const cliente = {
    nombre: 'Geiner',
    saldo: 100
}

weakset.add(cliente);

//igual se usa el delete y el has 

//para saber el largo del weakset no se puede con size


console.log(weakset)