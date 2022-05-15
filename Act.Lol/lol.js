class Campeones{
    constructor(vida, ataque, mana, nombre, habilidades, esFuerteContra1, esFuerteContra2, tipo){
        this.vida= vida;
        this.ataque = ataque;
        this.mana = mana ;
        this.nombre = nombre;
        this.habilidades =habilidades;
        this.esFuerteContra1 = esFuerteContra1;
        this.esFuerteContra2 = esFuerteContra2; 
        this.tipo = tipo;
        this.extra=false;
        this.extraValor=0;
    };
   
    presentarse(){
        console.log("Hola soy el "+this.tipo+" "+this.nombre+" mis habilidades son: "+this.habilidades+", mi vida es: "+this.vida+", mi ataque es "+this.ataque+", mi mana es: "+this.mana+" .Soy fuerte cotra "+this.esFuerteContra1+" y "+this.esFuerteContra2);
        if(this.extra != false)
        {
            console.log("Mi extra es que mi "+this.extra+" es de "+this.extraValor)
        }
    };
    comparar(enemigo){
        if(enemigo.tipo ==this.esFuerteContra1 || enemigo.tipo==this.esFuerteContra2){
           
            console.log("Tienes todas las de ganar");
        }
        else if(this.tipo ==enemigo.esFuerteContra1 ||this.tipo==enemigo.esFuerteContra2){
            console.log("Tienes todas las de perder unu");
        }
        else
        {
            console.log("No hay ventaja de tipo entre "+this.tipo+" y "+enemigo.tipo);
            if(enemigo.vida-this.ataque>this.vida-enemigo.ataque)
            {
                console.log("Pero las estaditicas dicen que él puede ganar");
            }else if(enemigo.vida-this.ataque<this.vida-enemigo.ataque){
                console.log("Pero las estaditicas dicen que tú puedes ganar");
            }else if(enemigo.vida-this.ataque==this.vida-enemigo.ataque){
                console.log("Y solo la suerte definira");
            }
        }
    };
};

class Mago extends Campeones{
    constructor(vida, ataque, mana, nombre, habilidades,distancia, esFuerteContra1='tirador', esFuerteContra2='luchador', tipo='mago'){
        super ( vida, ataque, mana, nombre, habilidades,esFuerteContra1, esFuerteContra2, tipo);
        this.distancia=distancia;
        this.mana =this.mana+(this.mana*0.24);
        this.extra='distancia';
        this.extraValor=distancia;
    };
  
};


class Tanque extends Campeones{
    constructor(vida, ataque, mana, nombre, habilidades, armadura, esFuerteContra1='mago', esFuerteContra2='asesino', tipo='tanque'){
        super ( vida, ataque, mana, nombre, habilidades, esFuerteContra1, esFuerteContra2, tipo);
        this.armadura=armadura;
        this.vida =this.vida+(this.vida*0.24);
        this.extra='armadura';
        this.extraValor=armadura;
    };
  
};

class Luchador extends Campeones{
    constructor(vida, ataque, mana, nombre, habilidades, esFuerteContra1='asesino', esFuerteContra2='tanque', tipo='luchador'){
        super ( vida, ataque, mana, nombre, habilidades, esFuerteContra1, esFuerteContra2, tipo);
        this.vida =this.vida+(this.vida*0.15);
        this.ataque =this.ataque+(this.ataque*0.15);
        this.extra=false;
        this.extraValor=false;
    };
  
};
class Tirador extends Campeones{
    constructor(vida, ataque, mana, nombre, habilidades, distancia, esFuerteContra1='tanque', esFuerteContra2='luchador',tipo='tirador'){
        super ( vida, ataque, mana, nombre, habilidades,esFuerteContra1, esFuerteContra2, tipo);
        this.distancia=distancia;
        this.ataque =this.ataque+(this.ataque*0.24);
        this.extra='distancia';
        this.extraValor=distancia;
    };
  
};

class Asesino extends Campeones{
    constructor(vida, ataque, mana, nombre, habilidades, movilidad, esFuerteContra1='mago', esFuerteContra2='tirador', tipo='asesino'){
        super ( vida, ataque, mana, nombre, habilidades, esFuerteContra1, esFuerteContra2, tipo);
        this.vida =this.vida-(this.vida*0.05);
        this.ataque =this.ataque+(this.ataque*0.30);
        this.extra='movilidad';
        this.extraValor=movilidad;
    };
  
};


//Instancias
const petra= new Mago (12, 112, 44, 'Petra', ['saltar', 'correr'],213);
const blub = new Tanque (123, 23, 243, 'Blub', ['volar', 'aniquilar'],14);
const lucha = new Luchador (187, 4, 23, 'Lucha', ['resitencia', 'apoyo']);
const Verd = new Tirador (21, 123, 121, 'Verd', ['municiones', 'refuerzo']);
const Andy = new Asesino (78, 547, 234, 'Andy', ['agresividad', 'agilidad'],98);
const Roco = new Asesino (19, 38, 18, 'Roco', ['suerte', 'temido'],543);