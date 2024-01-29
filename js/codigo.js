  //1 es piedra, 2 es papel, 3 es tijera
function aleatoria(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min )
}
function eleccion(jugada){
    let resultado = ""
    if(jugada==1){
        resultado = "PIEDRA 🥌"
    } else if(jugada == 2){
       resultado = "PAPEL 📃"
    }else if (jugada == 3){
        resultado = " TIJERA ✂"
    }else{
        resultado = "MAL ELEGIDO"
    }
    return resultado
}

let jugador = 0
let pc = 0
let triunfos = 0
let perdidas = 0

while (triunfos < 3 && perdidas <3){

    pc = aleatoria(1,3)
    jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera")
    
    alert("pc elige: " + eleccion(pc))
    alert("tu elegiste: "+ eleccion(jugador))
    
    //combate
    if(pc==jugador){
        alert("EMPATE")
    }else if(jugador == 1 && pc == 3){
        alert("GANASTE")
        triunfos = triunfos + 1 
    }else if (jugador == 2 && pc == 1){
        alert("GANASTE")
        triunfos = triunfos + 1 
    }else if(jugador == 3 && pc == 2){
        alert("GANASTE")
        triunfos = triunfos + 1 
    }
    else{
        alert("PERDISTE")
        perdidas = perdidas + 1 
    }
}
alert("Ganaste " + triunfos + " veces. Perdistes " + perdidas + " veces.")


