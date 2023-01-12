let habitaciones = [
    {id: 1, nombre: "Luna Nueva", precio: 9000,cantPersonas: "1 persona", imgUrl:"./img/lunanueva.jpg"},
    {id: 2, nombre: "Luna Nueva", precio: 172500,cantPersonas: "2 personas", imgUrl:"./img/lunanueva.jpg" },
    {id: 3, nombre: "Luna Nueva", precio: 430000,cantPersonas: "Hasta 5 personas (familiar)", imgUrl:"./img/lunanueva.jpg" },
    {id: 4, nombre: "Luna Creciente", precio: 9000,cantPersonas: "1 persona", imgUrl:"./img/lunacreciente.jpg" },
    {id: 5, nombre: "Luna Creciente", precio:172500,cantPersonas: "2 personas", imgUrl:"./img/lunacreciente.jpg" },
    {id: 6, nombre: "Luna Creciente", precio: 430000,cantPersonas: "Hasta 5 personas (familiar)", imgUrl:"./img/lunacreciente.jpg" },
    {id: 7, nombre: "Luna Llena", precio: 9000,cantPersonas: "1 persona", imgUrl:"./img/lunallena.jpg" },
    {id: 8, nombre: "Luna Llena", precio: 172500,cantPersonas: "2 personas", imgUrl:"./img/lunallena.jpg" },
    {id: 9, nombre: "Luna Llena", precio: 430000,cantPersonas: "Hasta 5 personas (familiar)", imgUrl:"./img/lunallena.jpg" }

]

let contenedorCarrito = document.getElementById("contenedorCarrito")
let contenedor = document.getElementById("contenedorHabitaciones")

let carrito = []
if (localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
renderizarCarrito(carrito)

for (const habitacion of habitaciones) {
    let tarjetaHabitacion = document.createElement("div")
    tarjetaHabitacion.className = "habitacion"

    tarjetaHabitacion.innerHTML = `
    <h3>${habitacion.nombre}</h3>
    <img src=${habitacion.imgUrl}>
    <p>Cantidad de personas a hospedar: ${habitacion.cantPersonas}
    <p>Precio $${habitacion.precio}</p>
    <button class= "boton" id= ${habitacion.id}>Añadir al carrito</button>
    `
    contenedor.appendChild(tarjetaHabitacion)    
}
    
let botones = document.getElementsByClassName("boton")
for(const boton of botones) {
    boton.addEventListener("click", agregarAlCarrito)
}

function agregarAlCarrito(e){
    let habitacionBuscada = habitaciones.find(habitacion => habitacion.id == e.target.id)
    let posicionDeHabitacionBuscada = carrito.findIndex(habitacion => habitacion.id == habitacionBuscada.id)
    if (posicionDeHabitacionBuscada != -1){
        carrito[posicionDeHabitacionBuscada].unidades++;
        carrito[posicionDeHabitacionBuscada].subtotal = carrito[posicionDeHabitacionBuscada].unidades * carrito[posicionDeHabitacionBuscada].precioUnitario
    } else {
        carrito.push({id: habitacionBuscada.id, nombre: habitacionBuscada.nombre, precioUnitario: habitacionBuscada.precio, unidades: 1, subtotal: habitacionBuscada.precio})    
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
    
}

function renderizarCarrito(arrayDeProductos){
    contenedorCarrito.innerHTML = ""
    for (const producto of arrayDeProductos) {
        contenedorCarrito.innerHTML +=`
        <div class= "flex">
            <p>${producto.nombre}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}</p>
        </div>     
        `     
    }

    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML +=`
    <h3>TOTAL ${total}</H3>
   `
}

let botonComprar = document.getElementById("comprar")
botonComprar.addEventListener("click", () => {
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito(carrito)
})

