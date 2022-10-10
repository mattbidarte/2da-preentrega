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
let balance = 0
let gastoMes = 0
let ingresoMes = 0
let balanceArray = []

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

    if(montoGasto <= balance){
        alert(`Gasto registrado correctamente\nSe gastó $${montoGasto} en ${detalleGasto}.`)
        
        balanceArray.push(new Gasto(detalleGasto, montoGasto))
        gastoMes += montoGasto
        balance -= montoGasto
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
        
        balanceArray.push(new Ingreso(detalleIngreso, montoIngreso))
        ingresoMes += montoIngreso
        balance += montoIngreso
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
    let op = prompt(`¿Que operación deseas hacer?\n\n1: Ver saldo total\n2: Registrar gasto\n3: Registrar ingreso\n4: Ver detalles\n5: Salir`)
    
    switch(op){
        case "1":
            verTotal()
            break
        case "2":
            if(balance == 0){
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
            break;
        default:
            alert('Operación invalida...')
            entrar()
    }
}