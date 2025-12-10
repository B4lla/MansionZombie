////////////
// Imports
////////////

import Superviviente from "./personajes/Superviviente.js";
import Zombie from "./personajes/Zombie.js";



////////////
// Variables
////////////


let habitacionesTotales = 0;                                    // Total de habitaciones segun la dificultad
let habitacionJugador = 0;                                      // Habitacion actual del jugador
let zombiesHabitacion = [];                                     // Zombies en la habitacion actual
let dificultad = "";                                            // Dificultad seleccionada
let Jugador = new Superviviente("Superviviente", 20, 4);        // Jugador principal
let juegoTerminado = false;                                     // Estado del juego




////////////
// Inicio
////////////



alert("Bienvenido a la Mansión Zombie!");
dificultad = prompt("Selecciona la dificultad: Fácil o Difícil").toLowerCase();

while (dificultad !== "facil" && dificultad !== "dificil") {
    dificultad = prompt("Dificultad no válida. Por favor, selecciona: facil o dificil").toLowerCase();
}

iniciarJuego();
inicializarHabitacion();

function iniciarJuego() {
    if (dificultad === "facil") {
        habitacionesTotales = 5;
    } else if (dificultad === "dificil") {
        habitacionesTotales = 10;
    }
}

// Inicializa una nueva habitacion, genera zombies y muestra el menu
function inicializarHabitacion() {
    generarZombies(1);
    habitacionJugador += 1;
    Jugador.establecerBusquedas(3);
    if (habitacionJugador <= habitacionesTotales) {
        alert("Has entrado en la habitación " + habitacionJugador + " de " + habitacionesTotales);
    } else {
        alert("Has salido de la mansion. ¡VICTORIA!");
        juegoTerminado = true;
    }
    if (!juegoTerminado) {
        menu();
    }
}

// Menu principal del juego
function menu() {
    let puedeSalir=false;
    
    if (juegoTerminado) return;
    if (habitacionJugador >= habitacionesTotales) { puedeSalir=true; }

    // Opciones del menu, muestra curarse si hay botiquines y no hay zombies
    let opcionesMenu = `
        Selecciona una opción:
        \n 1) ${puedeSalir ? 'Salir de la mansion' : 'Avanzar de habitacion'}
        \n 2) Atacar
        \n 3) Buscar por la habitación (${Jugador.busquedas} intentos restantes)
    `;

    if (Jugador.botiquines > 0 && zombiesHabitacion.length === 0) {
        opcionesMenu += `\n 4) Curarse`;
    }

    let opcion = prompt(opcionesMenu);
    
    // Opcion seleccionada
    switch (opcion) {
        case '1':
            if (puedeSalir) {
                alert("Has salido de la mansion. ¡VICTORIA!");
                juegoTerminado = true;
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

    if (opcion < '1' || opcion > '4') {
        menu();
        return;
    }
    if (!juegoTerminado) { menu(); }
}


// Buscar en la habitacion, genera alerts segun los dados
function buscarHabitacion() {
    if (zombiesHabitacion.length === 0 && Jugador.busquedas > 0) {
        let resultado = tirarDados(1, 100);
        Jugador.establecerBusquedas(Jugador.busquedas - 1);

        if (resultado <= 75) {
            let resultado2 = tirarDados(1, 100);
            if (resultado2 <= 40) {
                // resultado2 <= 40
                alert("Has hecho ruido pero no ha pasado nada");
            } else if (resultado2 > 40 && resultado2 <= 80) {
                // 40 < resultado2 <= 80
                alert("Has hecho ruido y ha aparecido un zombie");
                generarZombies(1);
            } else {
                // resultado2 > 80
                alert("Has hecho ruido y han aparecido dos zombies");
                generarZombies(2);
            }
        } else if (resultado > 75 && resultado <= 90) {
            // Añadir botiquin > 75 y <= 90
            Jugador.añadirBotiquin();
            alert("Has encontrado un botiquín!");
        } else if (resultado > 90 && resultado <= 95) {
            // Añadir proteccion > 90 y <= 95
            Jugador.añadirProteccion();
            alert("Has encontrado una protección!");
        } else {
            // Añadir arma <= 95
            Jugador.añadirArma();
            alert("Has encontrado un arma!");
        }
    } else if (Jugador.busquedas <= 0) {
        alert("No te quedan intentos de busqueda");
    } else {
        alert("Aun quedan zombies en la habitacion")
    }
}

// Ataca al primer zombie de la habitacion y recibe su ataque si sigue vivo
function atacar() {
    let message = "";
    if (zombiesHabitacion.length > 0) {
        let dadoAtaque = tirarDados(1, Jugador.ataque); 
        let danioFinal = dadoAtaque + Jugador.armas; 
        zombiesHabitacion[0].salud -= danioFinal;
        message += "Has atacado al zombie y le has quitado " + danioFinal + " puntos de vida. Le quedan " + (zombiesHabitacion[0].salud > 0 ? zombiesHabitacion[0].salud : 0) + " puntos de vida.\n";
        
        // Zombie ataca si sigue vivo
        if (zombiesHabitacion[0].salud > 0) {
            let ataqueZombie = tirarDados(0, zombiesHabitacion[0].ataque);
            Jugador.recibirDanio(ataqueZombie);
            message += "El zombie te ha atacado y te ha quitado " + ataqueZombie + " puntos de vida. Te quedan " + (Jugador.salud > 0 ? Jugador.salud : 0) + " puntos de vida.";
        } else {
            message += "Has eliminado al zombie!";
            zombiesHabitacion.shift(); 
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
        juegoTerminado = true;
        return;
    }
}

// Genera el numero de zombies pasado por parametro en la habitacion
function generarZombies(num) {
    for (let i = 0; i < num; i++) {
        let base = 2 + (habitacionJugador - 1);
        let randomBonus = Math.floor(Math.random() * 2); // 0 o 1
        let ataqueZombie = base + randomBonus;
        let saludZombie = base + randomBonus;
        zombiesHabitacion.push(new Zombie("Zombie", saludZombie, ataqueZombie));
    }
}

// Ejecuta el metodo usarBotiquin de Jugador si no hay zombies en la habitacion
function curarse() {
    if (zombiesHabitacion.length <= 0) {
        Jugador.usarBotiquin();
    } else {
        alert("No puedes curarte con zombies en la habitacion");
    }
}
