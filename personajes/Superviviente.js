import Personaje from "./Personaje.js";

class Superviviente extends Personaje {
    constructor(nombre, salud, ataque) {
        super(nombre, salud, ataque);
        this.botiquines = 0;
        this.protecciones = 0;
        this.armas = 0;
        this.busquedas = 3;
    }

    // Añade un botiquin al inventario
    añadirBotiquin() { this.botiquines = 1; }

    // Usa un botiquin para curarse
    usarBotiquin() {
        if (this.botiquines > 0) {
            this.salud += 4;
            if (this.salud > this.saludMax) {
                this.salud = this.saludMax;
            }
            this.botiquines -= 1;
            alert("Te has curado, ahora tienes: " + this.salud);
        } else {
            alert("No tienes botiquines disponibles");
        }
    } 

    añadirProteccion() { this.protecciones += 1; }
    añadirArma() { this.armas += 1; }
    establecerBusquedas(num) { this.busquedas = num; }

    // Recibe daño segun las protecciones
    recibirDanio(danio) {
        let danioFinal = danio - this.protecciones;
        if (danioFinal < 0) {
            danioFinal = 0;
        }
        this.salud -= danioFinal;
    }
}

export default Superviviente;