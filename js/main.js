// MENU HAMBURGESA
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".header__content__navbar");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})
document.querySelectorAll(".header__content__navbar-item").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))


// APP
if(localStorage.length === 0){
    localStorage.setItem('balance', 0)
    localStorage.setItem('gastoMes', 0)
    localStorage.setItem('ingresoMes', 0)
    localStorage.setItem('arrayBalance', "[]")
}


//DOM
const container = document.querySelector('#container')
const tgeneral = document.querySelector('#tgeneral')
const tgasto = document.querySelector('#tgasto')
const tingreso = document.querySelector('#tingreso')
const tregistro = document.querySelector('#tregistro')
const divRegistros = document.querySelector('#container__registros')

//PLANTILLA OBJETOS
class Gasto {
    constructor (detalle, monto){
        this.tipo = 'Gasto'
        this.detalle = detalle
        this.monto = parseFloat(monto)
        this.fecha = new Date()
        this.fecha = this.fecha.toLocaleDateString()
    }
}

class Ingreso {
    constructor (detalle, monto){
        this.tipo = 'Ingreso'
        this.detalle = detalle
        this.monto = parseFloat(monto)
        this.fecha = new Date()
        this.fecha = this.fecha.toLocaleDateString()
    }
}

// FUNCIONES
function verTotal(){
    alert(`El total registrado es de: $${balance}`)
    entrar()
}

function registroGasto(detalleGasto){
    let montoGasto = parseFloat(prompt(`¿Cual es el monto?`))

    if(montoGasto <= localStorage.balance){
        alert(`Gasto registrado correctamente\nSe gastó $${montoGasto} en ${detalleGasto}.`)
        
        let balance = Number(localStorage.balance) - montoGasto
        let gastoMes = montoGasto + Number(localStorage.gastoMes)

        localStorage.setItem('balance', balance)
        localStorage.setItem('gastoMes', gastoMes)
        
        let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
        arrayBalance.push(new Gasto(detalleGasto, montoGasto))

        localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));

        console.log(localStorage.arrayBalance)
        
        entrar()
    }else{
        alert(`El gasto supera al saldo total.\nTu saldo es $${balance}\nVuelve a intentarlo.`)
        entrar()
    }
}

function registroIngreso(){
    let detalleIngreso = prompt(`¿Detalle del ingreso?`)

    if (detalleIngreso == ''){
        alert('No dejes el espacio en blanco.')
        entrar()

    }else{
        let montoIngreso = Number(prompt(`¿Cual es el monto?`))
        alert(`Ingreso registrado correctamente\nDetalle del ingreso ${detalleIngreso}, monto $${montoIngreso}`)
        
        let balance = montoIngreso + Number(localStorage.balance)
        let ingresoMes = montoIngreso + Number(localStorage.ingresoMes)

        localStorage.setItem('balance', balance)
        localStorage.setItem('ingresoMes', ingresoMes)

        let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
        arrayBalance.push(new Ingreso(detalleIngreso, montoIngreso))

        localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));

        console.log(localStorage.arrayBalance)
        
        entrar()
    }
}

function verDetalles(){
    const detalles = balanceArray.map((de) => de.detalle)
    const tipos = balanceArray.map((ti) => ti.tipo)
    alert(`Tipo: ${tipos}\nDetalle: ${detalles}`)

    entrar()
}

// FUNCION PRINCIPAL
/* function entrar() {
    let op = prompt(`¿Que operación deseas hacer?\n\n1: Ver saldo total\n2: Registrar gasto\n3: Registrar ingreso\n4: Ver detalles\n5: Salir y ver resultado`)
    
    switch(op){
        case "1":
            verTotal()
            break
        case "2":
            if(localStorage.balance == 0){
                alert(`Aún tienes un saldo de $0, no puedes registrar un gasto.`)
                entrar()
            }else{
                let detalleGasto = prompt(`¿Detalle del gasto?`)
                if (detalleGasto == ''){
                    alert('No dejes el espacio en blanco.')
                    entrar()
                }else{
                    registroGasto(detalleGasto)
                }
            }
            break
        case "3":
            registroIngreso()
            break
        case "4":
            verDetalles()
            break
        case "5":
            alert(`Que tenga un lindo dia!`)

            console.log(JSON.parse(localStorage.arrayBalance))

            const recibo = JSON.parse(localStorage.arrayBalance)
            
            recibo.forEach((item, index) => {
                const div = document.createElement("div")
                div.className = `container__registros-item`
                div.id = `container__registros-item`
                div.innerHTML = `<p><span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${item.monto}</p>`
                divRegistros.appendChild(div)
              });

            //DOM
            tgeneral.innerHTML += ` ${localStorage.balance}`
            tgasto.innerHTML += ` ${localStorage.gastoMes}`
            tingreso.innerHTML += ` ${localStorage.ingresoMes}`
            break;
        default:
            alert('Operación invalida...')
            entrar()
    }
} */

console.log(JSON.parse(localStorage.arrayBalance))

const recibo = JSON.parse(localStorage.arrayBalance)

recibo.reverse()

recibo.forEach((item, index) => {
    const div = document.createElement("div")
    div.className = `container__registros-item`
    div.id = `container__registros-item`
    if(item.tipo === "Ingreso"){
        div.innerHTML = `<p><img src="./assets/img/arrowup.png" alt="" width=15px> <span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${item.monto}</p>`
    } else {
        div.innerHTML = `<p><img src="./assets/img/arrowdown.png" alt="" width=15px> <span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${item.monto}</p>`
    }
    divRegistros.appendChild(div)
});

//DOM
tgeneral.innerHTML = `Balance general: $${localStorage.balance}`
tgasto.innerHTML = `Gasto mensual: $${localStorage.gastoMes}`
tingreso.innerHTML = `Ingreso mensual: $${localStorage.ingresoMes}`

//BUTTONS
let btnGasto = document.querySelector('#container__buttons--gasto')
let btnIngreso = document.querySelector('#container__buttons--ingreso')


btnIngreso.addEventListener('click', () => {
    container.innerHTML= `
    <h2 class="tRegistroIngreso">Registro de Ingreso</h2>
    <form class="form" action="">
        <input id="inpDetalleIngreso" class="formInput" type="text" placeholder="Detalle" required>
        <input id="inpMontoIngreso" class="formInput" type="number" placeholder="Monto" required>
        <input type="submit" id="btnRegistroIngreso" class="btnRegistroIngreso" value="Registrar Ingreso">
        <button id="btnVolver" class="btnVolver">Volver</button>
    </form>
    `

    let btnRegistroIngreso = document.querySelector('#btnRegistroIngreso')
    let inpDetalle = document.querySelector('#inpDetalleIngreso')
    let inpMonto = document.querySelector('#inpMontoIngreso')
    
    let btnVolver = document.querySelector('#btnVolver')

    btnRegistroIngreso.addEventListener('click', (e) => {
        e.preventDefault();

        if (inpDetalle.value == "" || inpMonto.value == "") {
            alert("No dejes espacios en blanco")
        }else {
            console.log(inpDetalle.value)
            console.log(inpMonto.value)
            
            alert(`Ingreso registrado correctamente`)

            let balance = +inpMonto.value + Number(localStorage.balance)
            let ingresoMes = +inpMonto.value + Number(localStorage.ingresoMes)

            console.log(balance)
            console.log(ingresoMes)

            localStorage.setItem('balance', balance)
            localStorage.setItem('ingresoMes', ingresoMes)

            let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
            arrayBalance.push(new Ingreso(inpDetalle.value, inpMonto.value))

            localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));

            console.log(localStorage.arrayBalance)

            inpDetalle.value = ""
            inpMonto.value = ""
        }
    })
    
    btnVolver.addEventListener('click', () => {
        location.reload()
    })
})

btnGasto.addEventListener('click', () => {
    container.innerHTML= `
    <h2 class="tRegistroIngreso">Registro de Gasto</h2>
    <form class="form" action="">
        <input id="inpDetalleIngreso" class="formInput" type="text" placeholder="Detalle" required>
        <input id="inpMontoIngreso" class="formInput" type="number" placeholder="Monto" required>
        <input type="submit" id="btnRegistroIngreso" class="btnRegistroIngreso" value="Registrar Gasto">
        <button id="btnVolver" class="btnVolver">Volver</button>
    </form>
    `

    let btnRegistroIngreso = document.querySelector('#btnRegistroIngreso')
    let inpDetalle = document.querySelector('#inpDetalleIngreso')
    let inpMonto = document.querySelector('#inpMontoIngreso')
    
    let btnVolver = document.querySelector('#btnVolver')

    btnRegistroIngreso.addEventListener('click', (e) => {
        e.preventDefault();

        if (inpDetalle.value == "" || inpMonto.value == "") {
            alert("No dejes espacios en blanco")
        }else {
            if(+inpMonto.value > +localStorage.balance){
                alert(`El monto supera al balance general\nBalance: $${localStorage.balance}`)
                location.reload()
            }else {
                alert(`Gasto registrado correctamente`)

                let balance = Number(localStorage.balance) - Number(inpMonto.value)
                let gastoMes = +inpMonto.value + Number(localStorage.gastoMes)

                console.log(balance)
                console.log(gastoMes)

                localStorage.setItem('balance', balance)
                localStorage.setItem('gastoMes', gastoMes)

                let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
                arrayBalance.push(new Gasto(inpDetalle.value, inpMonto.value))

                localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));

                console.log(localStorage.arrayBalance)

                inpDetalle.value = ""
                inpMonto.value = ""
            }
        }
    })
    
    btnVolver.addEventListener('click', () => {
        location.reload()
    })
})

let btnReiniciar = document.querySelector('#btnReiniciar')

btnReiniciar.addEventListener('click', () =>{
    if(confirm('¿Estas seguro? Se reiniciaran todos los valores') == true){
        localStorage.clear()
        location.reload()
    }  
})














 