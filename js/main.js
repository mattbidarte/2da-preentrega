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

// Variables en localStorage
let balanceArray = []

localStorage.balance = localStorage.balance || "0"
localStorage.gastoMes = localStorage.gastoMes || "0"
localStorage.ingresoMes = localStorage.ingresoMes || "0"
localStorage.arrayBalance = localStorage.arrayBalance || ""


//DOM
let tgeneral = document.querySelector('#tgeneral')
let tgasto = document.querySelector('#tgasto')
let tingreso = document.querySelector('#tingreso')
let tregistro = document.querySelector('#tregistro')

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
    alert(`El total registrado es de: $${localStorage.balance}`)
    entrar()
}

function registroGasto(detalleGasto){
    let montoGasto = parseFloat(prompt(`¿Cual es el monto?`))

    if(montoGasto <= localStorage.balance){
        alert(`Gasto registrado correctamente\nSe gastó $${montoGasto} en ${detalleGasto}.`)
        
        balanceArray.push(new Gasto(detalleGasto, montoGasto))
        localStorage.gastoMes = montoGasto + Number(localStorage.gastoMes)
        localStorage.balance = Number(localStorage.balance) - montoGasto
        console.log(balanceArray)
        
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
        
        localStorage.ingresoMes = montoIngreso + Number(localStorage.ingresoMes)
        localStorage.balance = montoIngreso + Number(localStorage.balance)

        balanceArray.push(new Ingreso(detalleIngreso, montoIngreso))
        localStorage.arrayBalance += JSON.stringify(balanceArray)

        console.log(balanceArray)

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