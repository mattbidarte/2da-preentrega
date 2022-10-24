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

// GENERAR VARIABLES EN LOCALSTORAGE
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


tgeneral.innerHTML = `Balance general: $${new Intl.NumberFormat('de-DE').format(+localStorage.balance)}`
tgasto.innerHTML = `Gasto mensual: $${new Intl.NumberFormat('de-DE').format(+localStorage.gastoMes)}`
tingreso.innerHTML = `Ingreso mensual: $${new Intl.NumberFormat('de-DE').format(+localStorage.ingresoMes)}`

//BUTTONS
const btnGasto = document.querySelector('#container__buttons--gasto')
const btnIngreso = document.querySelector('#container__buttons--ingreso')

// MUESTREO DE REGISTROS
console.log(JSON.parse(localStorage.arrayBalance))

const reciboArray = JSON.parse(localStorage.arrayBalance)
reciboArray.reverse()

reciboArray.forEach((item, index) => {
    const div = document.createElement("div")
    div.className = `container__registros-item`
    div.id = `container__registros-item`
    if(item.tipo === "Ingreso"){
        div.innerHTML = `<p><img src="./assets/img/arrowup.png" alt="" width=15px> <span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
    } else {
        div.innerHTML = `<p><img src="./assets/img/arrowdown.png" alt="" width=15px> <span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
    }
    divRegistros.appendChild(div)
});

// EVENTO CLICK BOTON INGRESO
btnIngreso.addEventListener('click', () => {
    container.innerHTML= `
    <h2 class="tRegistroIngreso">Registro de Ingreso</h2>
    <form class="form" action="">
        <input id="inpDetalleIngreso" class="formInput" type="text" placeholder="Detalle" autocomplete="off" required>
        <input id="inpMontoIngreso" class="formInput" type="number" placeholder="Monto" autocomplete="off" required>
        <input type="submit" id="btnRegistroIngreso" class="btnRegistroIngreso" value="Registrar Ingreso">
        <button id="btnVolver" class="btnVolver">Volver</button>
    </form>
    `
    const btnRegistroIngreso = document.querySelector('#btnRegistroIngreso')
    const inpDetalle = document.querySelector('#inpDetalleIngreso')
    const inpMonto = document.querySelector('#inpMontoIngreso')
    const btnVolver = document.querySelector('#btnVolver')

    btnRegistroIngreso.addEventListener('click', (e) => {
        e.preventDefault();

        if (inpDetalle.value == "" || inpMonto.value == "") {
            alert("No dejes espacios en blanco")
        }else {
            alert(`Ingreso registrado correctamente.`)

            let balance = +inpMonto.value + Number(localStorage.balance)
            let ingresoMes = +inpMonto.value + Number(localStorage.ingresoMes)

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

// EVENTO CLICK BOTON GASTO
btnGasto.addEventListener('click', () => {
    container.innerHTML= `
    <h2 class="tRegistroIngreso">Registro de Gasto</h2>
    <form class="form" action="">
        <input id="inpDetalleIngreso" class="formInput" type="text" placeholder="Detalle" autocomplete="off" required>
        <input id="inpMontoIngreso" class="formInput" type="number" placeholder="Monto" autocomplete="off" required>
        <input type="submit" id="btnRegistroIngreso" class="btnRegistroIngreso" value="Registrar Gasto">
        <button id="btnVolver" class="btnVolver">Volver</button>
    </form>
    `
    const btnRegistroIngreso = document.querySelector('#btnRegistroIngreso')
    const inpDetalle = document.querySelector('#inpDetalleIngreso')
    const inpMonto = document.querySelector('#inpMontoIngreso')
    const btnVolver = document.querySelector('#btnVolver')

    btnRegistroIngreso.addEventListener('click', (e) => {
        e.preventDefault();

        if (inpDetalle.value == "" || inpMonto.value == "") {
            alert("No dejes espacios en blanco")
        }else {
            if(+inpMonto.value > +localStorage.balance){
                alert(`El monto supera al balance general\nBalance: $${localStorage.balance}`)
                location.reload()
            }else {
                alert(`Gasto registrado correctamente.`)

                let balance = Number(localStorage.balance) - Number(inpMonto.value)
                let gastoMes = +inpMonto.value + Number(localStorage.gastoMes)

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

// REINICIAR LOCALSTORAGE
let btnReiniciar = document.querySelector('#btnReiniciar')

btnReiniciar.addEventListener('click', () =>{
    if(confirm('¿Estas seguro? Se reiniciaran todos los valores') == true){
        localStorage.clear()
        location.reload()
    }  
})














 