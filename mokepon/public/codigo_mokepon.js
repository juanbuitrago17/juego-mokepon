const sectionSeleccionarAtaque = document.getElementById('seleccionar_ataque')
const sectionSeleccionarReiniciar = document.getElementById('reiniciar')
const botonMascota = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('reiniciar')

const sectionSeleccionarMascota = document.getElementById('seleccionar_mascota')
const spanMascotaJugador = document.getElementById('nombre_mascota_jugador')

const spanMascotaEnemigo = document.getElementById('nombre_mascota_enemigo')

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigos")

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokeponesEnemigos = []
let mokepones = []
let ataqueEnemigo = [] 
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya 
let mascotaJugador
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo 
let fuego  
let agua 
let tierra
let botones = [] 
let ataqueJugador = [] 
let indexAtaqueEnemigo
let indexAtaqueJugador
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image
mapaBackground.src = 'imagenes_mokepon/mapa.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 400

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 /800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos



class Mokepon {
    constructor(nombre,foto,vida, fotoMapa, id = null ){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho= 60
        this.alto= 60
        this.x = aleatoria(0,mapa.width - this.ancho)
        this.y = aleatoria(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidaX = 0
        this.velocidaY = 0

    }
    pintarMokepon(){lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
    )}
}

let hipodoge = new Mokepon('Hipodoge', 'imagenes_mokepon/hipodoge.png', 5,'imagenes_mokepon/cabezahipodoge.png')

let capipepo = new Mokepon('Capipepo', 'imagenes_mokepon/capipepo.png', 5, 'imagenes_mokepon/cabezacapipepo.png')

let ratigueya = new Mokepon('Ratigueya', 'imagenes_mokepon/ratigueya.png', 5, 'imagenes_mokepon/cabezaratigueya.png')


const HIPODOGE_ATAQUES = [
    {nombre: '💧', id: 'agua'},
    {nombre: '💧', id: 'agua'},
    {nombre: '💧', id: 'agua'},
    {nombre: '🔥', id: 'fuego'},
    {nombre: '🌱', id: 'tierra'},
]

const CAPIPEPO_ATAQUES = [
    {nombre: '🌱', id: 'tierra'},
    {nombre: '🌱', id: 'tierra'},
    {nombre: '🌱', id: 'tierra'},
    {nombre: '💧', id: 'agua'},
    {nombre: '🔥', id: 'fuego'},
]

const RATIGUEYA_ATAQUES = [
    {nombre: '🔥', id: 'fuego'},
    {nombre: '🔥', id: 'fuego'},
    {nombre: '🔥', id: 'fuego'},
    {nombre: '💧', id: 'agua'},
    {nombre: '🌱', id: 'tierra'},
]

hipodoge.ataques.push(...HIPODOGE_ATAQUES)
    
capipepo.ataques.push(...CAPIPEPO_ATAQUES)

ratigueya.ataques.push(...RATIGUEYA_ATAQUES)


mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display = 'none'
    sectionSeleccionarReiniciar.style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        contenedorTarjetas.innerHTML +=  opcionDeMokepones  

        inputHipodoge = document.getElementById('Hipodoge')
        inputCapipepo = document.getElementById('Capipepo')
        inputRatigueya = document.getElementById('Ratigueya')
    })

    botonMascota.addEventListener('click', seleccionarMascota)  

    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://192.168.0.27:8080/unirse")
    .then(function(res){
        
        if(res.ok){
            res.text()
                .then(function (respuesta){
                    console.log(respuesta)
                    jugadorId = respuesta
                })
        }
    })
}

function seleccionarMascota(){
   
    if(inputHipodoge.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if(inputCapipepo.checked){
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if(inputRatigueya.checked){
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("selecciona alguna mascota")
        return
    } 

    sectionSeleccionarMascota.style.display = 'none'

    seleccionarMokepon(mascotaJugador)

    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()
}

function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.0.27:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i= 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }
    }
    
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){   
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id=${ataque.id} class="boton-ataque BAtaque">${ataque.nombre}</button>`
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    fuego = document.getElementById('fuego')
    agua =document.getElementById('agua')
    tierra = document.getElementById('tierra')
    botones = document.querySelectorAll(".BAtaque")

}

function secuenciaAtaque(){
    botones.forEach((boton) =>{
        boton.addEventListener('click', (e)=>{
            if(e.target.textContent == '🔥'){
                ataqueJugador.push('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#FF6AC2'
                boton.disabled = true
            }else if(e.target.textContent == '💧'){
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#FF6AC2'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#FF6AC2'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5){
                enviarAtaques()
            }
          
        })
    })
   
}

function enviarAtaques(){
    fetch(`http://192.168.0.27:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
    fetch(`http://192.168.0.27:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res){
            if(res.ok){
                res.json()
                    .then(function ({ataques}){
                        if (ataques.length == 5){
                            ataqueEnemigo = ataques
                            combate()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){

    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
}
     
function ataqueAleatorioEnemigo(){
   let ataqueAleatorio =  aleatoria(0,ataquesMokeponEnemigo.length -1)

   if(ataqueAleatorio == 0 || ataqueAleatorio == 1 ){
    ataqueEnemigo.push('FUEGO')
   } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
    ataqueEnemigo.push('AGUA')
   }else{
    ataqueEnemigo.push('TIERRA')
   }
   console.log(ataqueEnemigo)
   iniciarPelea()
   
}

function iniciarPelea() {
    if(ataqueJugador.length == 5){
        combate()
    }
}

function indexAmbosOponentes(jugador, enemigo){
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate(){
    clearInterval(intervalo)

    for (let index = 0; index < ataqueJugador.length; index++) {

        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexAmbosOponentes(index, index)
            crearMensaje("EMPATASTE 🤝")
        }else if(ataqueJugador[index] == 'FUEGO' && ataqueEnemigo[index] == 'TIERRA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if (ataqueJugador[index] == 'AGUA' && ataqueEnemigo[index] == 'FUEGO' ){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index]== 'TIERRA' && ataqueEnemigo[index] == 'AGUA'){
            indexAmbosOponentes(index, index)
            crearMensaje("GANASTE 🎉")
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE 😥") 
            victoriasEnemigo ++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }
}

    revisarVidas()

}

function revisarVidas(){
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("ES UN EMPATE 🤝🤝🤝")
    }else if(victoriasJugador > victoriasEnemigo){
       crearMensajeFinal("FELICITACIONES!!! GANASTE 🎉🎉🎉")
    }else{
        crearMensajeFinal(" UPSSS!!! PERDISTE 😥😥😥") 
    }
}

function crearMensaje(resultado) {
    
    let nuevoAtaqueDelJugador = document.createElement('p')
    let nuevoAtaqueDelEnemigo = document.createElement('p')

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
} 

function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal
    sectionSeleccionarReiniciar.style.display = 'block'
}

function reiniciarJuego(){
    location.reload()
}

function aleatoria(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min )
}

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidaX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidaY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
    
}

function enviarPosicion(x,y){
    fetch(`http://192.168.0.27:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function({enemigos}){
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre == "Hipodoge"){
                            mokeponEnemigo = new Mokepon('Hipodoge', 'imagenes_mokepon/hipodoge.png', 5,'imagenes_mokepon/cabezahipodoge.png', enemigo.id)
                        }else if(mokeponNombre == "Capipepo"){
                            mokeponEnemigo = new Mokepon('Capipepo', 'imagenes_mokepon/capipepo.png', 5, 'imagenes_mokepon/cabezacapipepo.png', enemigo.id)
                        } else if(mokeponNombre == "Ratigueya"){
                            mokeponEnemigo = new Mokepon('Ratigueya', 'imagenes_mokepon/ratigueya.png', 5, 'imagenes_mokepon/cabezaratigueya.png', enemigo.id)
                        }

                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        
                        return mokeponEnemigo 
                    })
                })
        }
    })

}

function moverDerecha(){
    mascotaJugadorObjeto.velocidaX =  5
    
}

function moverIzquierda(){
    mascotaJugadorObjeto.velocidaX = - 5
    
}

function moverAbajo(){
    mascotaJugadorObjeto.velocidaY = + 5

}

function moverArriba(){
    mascotaJugadorObjeto.velocidaY =- 5
    
}

function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidaX = 0
    mascotaJugadorObjeto.velocidaY = 0
}

function sePresionoUnaTecla(event){
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()
            break;
        case 'ArrowDown':
            moverAbajo()
            break;
        case 'ArrowLeft':
            moverIzquierda()
            break;
        case 'ArrowRight':
            moverDerecha()
            break;
        default:  
            break;
    }

}

function iniciarMapa(){

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i= 0; i < mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            return  mokepones[i]
        }
    }
}

function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    
    if(
        abajoMascota < arribaEnemigo  ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return 
    }

    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
}

window.addEventListener('load', iniciarJuego)