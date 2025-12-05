////////////
// Imports
////////////

import Superviviente from "./personajes/Superviviente.js";
import Jugador from "./personajes/Superviviente.js";
import Zombie from "./personajes/Zombie.js";




////////////
// Variables
////////////


let habitacionesTotales = 0;
let habitacionJugador = 0;
let zombiesHabitacion = [];
let dificultad = "";
let Jugador = new Superviviente("Superviviente", 20, 4);







////////////
// Inicio
////////////



alert("Bienvenido a la Mansión Zombie!");
dificultad = prompt("Selecciona la dificultad: Fácil, Normal, Difícil").toLowerCase();

while (dificultad !== "fácil" && dificultad !== "normal" && dificultad !== "difícil") {
    dificultad = prompt("Dificultad no válida. Por favor, selecciona entre: Fácil, Normal, Difícil").toLowerCase();
}

iniciarJuego();
inicializarHabitacion();
menu();

function iniciarJuego() {
    if (dificultad === "facil") {
        habitacionesTotales = 5;
    } else if (dificultad === "dificil") {
        habitacionesTotales = 10;
    }
}

function inicializarHabitacion() {
    generarZombies(1);
    habitacionJugador += 1;
    Jugador.establecerBusquedas(3);
    if (habitacionJugador <= habitacionesTotales) {
        alert("Has entrado en la habitación " + habitacionJugador + " de " + habitacionesTotales);
        combatir();
    } else {
        alert("Has salido de la mansion");
    }
}

function menu() {
    let puedeSalir=false;
    if (habitacionJugador >= habitacionesTotales) { puedeSalir=true; }
    let opcion = prompt(`
        Selecciona una opción:
        \n 1) ${puedeSalir ? 'Salir de la mansion' : 'Avanzar de habitacion'}
        \n 2) Atacar
        \n 3) Buscar por la habitación
        \n 4) Curarse
    `);
    switch (opcion) {
        case '1':
            if (puedeSalir) {
                alert("Has salido de la mansion");
            } else inicializarHabitacion();
            break;
        case '2':
            if (zombiesHabitacion.length > 0) {
                atacar();
            } else alert("No hay zombies en la habitacion");
            break;
        case '3':
            buscarHabitacion();
            break;
        case '4':
            curarse();
            break;
    }
    while (opcion < 1 || opcion > 4) {menu();}
}


function buscarHabitacion() {
    if (zombiesHabitacion.length === 0 && Jugador.busquedas > 0) {
        let resultado = tirarDados(1, 100);
        Jugador.establecerBusquedas(Jugador.busquedas - 1);
        if (resultado <= 75) {
            let resultado2 = tirarDados(1, 100);
            if (resultado2 <= 40) {
                alert("Has hecho ruido pero no ha pasado nada");
            } else if (resultado2 > 40 && resultado2 <= 80) {
                alert("Has hecho ruido y ha aparecido un zombie");
                generarZombies(1);
            } else {
                alert("Has hecho ruido y han aparecido dos zombies");
                generarZombies(2);
            }
        } else if (resultado > 75 && resultado <= 90) {
            Jugador.añadirBotiquin();
        } else if (resultado > 90 && resultado <= 95) {
            Jugador.añadirProteccion();
        } else {
            Jugador.añadirArma();
        }
    } else {
        alert("Aun quedan zombies en la habitacion")
    }
}


function combatir() {
    if (zombiesHabitacion.length > 0) {
        alert("Comienza el combate contra " + zombiesHabitacion.length + " zombies");
    }
}

function atacar() {
    let message = "";
    if (zombiesHabitacion.length > 0) {
        let danioFinal = Jugador.ataque + Jugador.armas;

        zombiesHabitacion[0].salud -= danioFinal;
        message += "Has atacado al zombie y le has quitado " + danioFinal + " puntos de vida. Le quedan " + (zombiesHabitacion[0].salud > 0 ? zombiesHabitacion[0].salud : 0) + " puntos de vida.";
    }
    if (zombiesHabitacion.length > 0) {
        for (let i = 0; i < zombiesHabitacion.length; i++) {
            let ataqueZombie = tirarDados(0, zombiesHabitacion[i].ataque);
            Jugador.recibirDanio(ataqueZombie);
            message += "El zombie te ha atacado y te ha quitado " + ataqueZombie + " puntos de vida. Te quedan " + (Jugador.salud > 0 ? Jugador.salud : 0) + " puntos de vida.";
        }
    }
    comprobarSalud();
    alert(message);
}





////////////
// Utils
////////////


// Tirar los dados con el minimo y maximo pasado por parametro
function tirarDados(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
}

// Comprueba la salud de Jugador y zombies en la habitacion, los elimina si es necesario
function comprobarSalud() {
    if (Jugador.salud <= 0) {
        alert("GAME OVER. Has sido derrotado por los zombies.");
    }
    if (zombiesHabitacion.length > 0) {
        zombiesHabitacion.forEach(zombie => {
            if (zombie.salud <= 0) {
                zombiesHabitacion.splice(zombiesHabitacion.indexOf(zombie), 1);
            }
        });
    }
}

// Genera el numero de zombies pasado por parametro en la habitacion
function generarZombies(num) {
    for (let i = 0; i < num; i++) {
        let ataqueZombie = 2 + (habitacionJugador - 1);
        let saludZombie = 5 + (habitacionJugador - 1);
        zombiesHabitacion.push(new Zombie("Zombie", saludZombie, ataqueZombie));
    }
}

// Ejecuta el metodo usarBotiquin de Jugador si no hay zombies en la habitacion
function curarse() {
    if (zombiesHabitacion.length <= 0) { Jugador.usarBotiquin(); }
}
