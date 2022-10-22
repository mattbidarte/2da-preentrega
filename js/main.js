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
let tgeneral = document.querySelector('#tgeneral')
let tgasto = document.querySelector('#tgasto')
let tingreso = document.querySelector('#tingreso')
let tregistro = document.querySelector('#tregistro')
let divRegistros = document.querySelector('#container__registros')

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
function entrar() {
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
}