// =============== HAMBURGUER MENU ===============
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


// =============== APP ===============
// =============== PLANTILLA OBJETOS ===============
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

// =============== VARIABLES LOCALSTORAGE ===============
localStorage.length === 0 && (
    localStorage.setItem('balance', 0),
    localStorage.setItem('gastoMes', 0),
    localStorage.setItem('ingresoMes', 0),
    localStorage.setItem('arrayBalance', "[]")
)

// =============== VARIABLES DOM ===============
const container = document.querySelector('#container')
const tgeneral = document.querySelector('#tgeneral')
const tgasto = document.querySelector('#tgasto')
const tingreso = document.querySelector('#tingreso')
const tregistro = document.querySelector('#tregistro')
const divRegistros = document.querySelector('#container__registros')

tgeneral.innerHTML = `Balance general: $${new Intl.NumberFormat('de-DE').format(+localStorage.balance)}`
tgasto.innerHTML = `Gasto mensual: $${new Intl.NumberFormat('de-DE').format(+localStorage.gastoMes)}`
tingreso.innerHTML = `Ingreso mensual: $${new Intl.NumberFormat('de-DE').format(+localStorage.ingresoMes)}`

// =============== BUTTONS ===============
const btnGasto = document.querySelector('#container__buttons--gasto')
const btnIngreso = document.querySelector('#container__buttons--ingreso')

// =============== MUESTREO REGISTROS ===============
console.log(JSON.parse(localStorage.arrayBalance))
const reciboArray = JSON.parse(localStorage.arrayBalance)
reciboArray.reverse() //Para ordenar de mas reciente a mas antiguo

reciboArray.forEach((item, index) => {
    const div = document.createElement("div")
    div.className = `container__registros-item`
    div.id = `container__registros-item`
    //Si es un ingreso se muestra una flecha hacía arriba, sino hacia abajo
    if(item.tipo === "Ingreso"){
        div.innerHTML = `<p><img src="./assets/img/arrowup.png" alt="" width=15px> <span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
    } else {
        div.innerHTML = `<p><img src="./assets/img/arrowdown.png" alt="" width=15px> <span class="container__registros-item--tipo">${item.tipo}:</span> ${item.fecha} - ${item.detalle} - $${new Intl.NumberFormat('de-DE').format(+item.monto)}</p>`
    }
    divRegistros.appendChild(div)
});

// =============== EVENTOS BOTONES ===============
// =============== CLICK BTN INGRESO ===============
btnIngreso.addEventListener('click', () => {
    container.classList.remove("container")
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
            let balance = +inpMonto.value + Number(localStorage.balance)
            let ingresoMes = +inpMonto.value + Number(localStorage.ingresoMes)

            localStorage.setItem('balance', balance)
            localStorage.setItem('ingresoMes', ingresoMes)

            let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
            arrayBalance.push(new Ingreso(inpDetalle.value, inpMonto.value))
            localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));
            console.log(localStorage.arrayBalance)

            Toastify({
                text: "Ingreso registrado correctamente!",
                duration: 3000,
                offset: {
                    x: 50, 
                    y: 60
                },
                className: "tostada"
            }).showToast();

            inpDetalle.value = ""
            inpMonto.value = ""
        }
    })
    btnVolver.addEventListener('click', () => {
        location.reload()
    })
})

// =============== CLICK BTN GASTO ===============
btnGasto.addEventListener('click', () => {
    container.classList.remove("container")
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
                let balance = Number(localStorage.balance) - Number(inpMonto.value)
                let gastoMes = +inpMonto.value + Number(localStorage.gastoMes)

                localStorage.setItem('balance', balance)
                localStorage.setItem('gastoMes', gastoMes)

                let arrayBalance = JSON.parse(localStorage.getItem('arrayBalance'))
                arrayBalance.push(new Gasto(inpDetalle.value, inpMonto.value))
                localStorage.setItem("arrayBalance", JSON.stringify(arrayBalance));
                console.log(localStorage.arrayBalance)

                Toastify({
                    text: "Gasto registrado correctamente!",
                    duration: 3000,
                    offset: {
                        x: 50, 
                        y: 60
                    },
                    className: "tostada"
                }).showToast();
            
                inpDetalle.value = ""
                inpMonto.value = ""
            }
        }
    })
    btnVolver.addEventListener('click', () => {
        location.reload()
    })
})

// =============== REINICIAR LOCALSTORAGE ===============
let btnReiniciar = document.querySelector('#btnReiniciar')

btnReiniciar.addEventListener('click', () =>{
    Swal.fire({
        title: '¿Estas seguro?',
        text: "Se reiniciaran todos los valores",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, reiniciar!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Datos borrados!',
            'Se han reiniciado los valores',
            'success',
          )
        localStorage.clear()
        setTimeout(()=> {
            location.reload()
        }, 1500)
        }
      })
})















 