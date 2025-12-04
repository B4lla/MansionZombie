let zombies = 0;
let rondas = 0;
let dificultad = "";
let habitacionJugador = 0;



alert("Bienvenido a la Mansión Zombie!");
dificultad = prompt("Selecciona la dificultad: Fácil, Normal, Difícil").toLowerCase();

while (dificultad !== "fácil" && dificultad !== "normal" && dificultad !== "difícil") {
    dificultad = prompt("Dificultad no válida. Por favor, selecciona entre: Fácil, Normal, Difícil").toLowerCase();
}



function iniciarJuego() {
    if (dificultad === "facil") {
        zombies = 5;
    } else if (dificultad === "dificil") {
        zombies = 10;
    }
}