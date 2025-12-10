import Personaje from "./Personaje.js";

class Zombie extends Personaje {
    constructor(nombre, salud, ataque) {
        super(nombre, salud, ataque);
    }
}

export default Zombie;