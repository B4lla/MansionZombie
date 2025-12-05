class Jugador extends Personaje {
    constructor(nombre, salud, ataque) {
        super(nombre, salud, ataque);
        this.botiquines = 0;
        this.protecciones = 0;
    }

    añadirBotiquin() { 
        if (this.botiquines < 1) {this.botiquines += 1;}
    }

    usarBotiquin() {
        if (this.botiquines > 0) {
            this.salud += 4;
            if (this.salud > this.saludMax) {
                this.salud = this.saludMax;
            }
            this.botiquines -= 1;
        }
    }

    añadirProteccion() {
        if (this.protecciones < 1) {this.protecciones += 1;}
    }
}


export default Jugador;
