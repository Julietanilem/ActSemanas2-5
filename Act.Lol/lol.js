class Campeones{
    constructor(vida, ataque, mana, nombre,...habilidades){
        this.vida= vida;
        this.ataque = ataque;
        this.mana = mana ;
        this.nombre = nombre;
        this.habilidades =habilidades;
        this.esFuerteContra1 = 'tanque';
        this.esFuerteContra2 = 'tirador'; 
        this.tipo = 'campeon' ;
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
    constructor(vida, ataque, mana, nombre,distancia, ...habilidades){
        super ( vida, ataque, mana, nombre, habilidades);
        this.distancia=distancia;
        this.mana =this.mana+(this.mana*0.24);
        this.extra='distancia';
        this.extraValor=distancia;
        this.esFuerteContra1='tirador';
        this.esFuerteContra2='luchador';
        this.tipo='mago';
    };
  
};
class Tanque extends Campeones{
    constructor(vida, ataque, mana, nombre, armadura, ...habilidades){
        super ( vida, ataque, mana, nombre, habilidades);
        this.armadura=armadura;
        this.vida =this.vida+(this.vida*0.24);
        this.extra='armadura';
        this.extraValor=armadura;
        this.esFuerteContra1='mago';
        this.esFuerteContra2='asesino';
        this.tipo='tanque'
    };
  
};

class Luchador extends Campeones{
    constructor(vida, ataque, mana, nombre, ...habilidades){
        super ( vida, ataque, mana, nombre, habilidades);
        this.vida =this.vida+(this.vida*0.15);
        this.ataque =this.ataque+(this.ataque*0.15);
        this.extra=false;
        this.extraValor=false;
        this.esFuerteContra1='asesino';
        this.esFuerteContra2='tanque';
        this.tipo='luchador';
    };
  
};
class Tirador extends Campeones{
    constructor(vida, ataque, mana, nombre, distancia, ...habilidades){
        super ( vida, ataque, mana, nombre, habilidades)
        this.distancia=distancia;
        this.ataque =this.ataque+(this.ataque*0.24);
        this.extra='distancia';
        this.extraValor=distancia;
        this.esFuerteContra1='tanque';
        this.esFuerteContra2='luchador'; 
        this.tipo='tirador';


    };
  
};

class Asesino extends Campeones{
    constructor(vida, ataque, mana, nombre, movilidad, ...habilidades ){
        super ( vida, ataque, mana, nombre, habilidades);
        this.vida =this.vida-(this.vida*0.05);
        this.ataque =this.ataque+(this.ataque*0.30);
        this.extra='movilidad';
        this.extraValor=movilidad;
        this.esFuerteContra1='mago';
        this.esFuerteContra2='tirador';;
        this.tipo='asesino';
    };
  
};


//Instancias
const petra= new Mago (12, 112, 44, 'Petra', 213, 'saltar', 'correr',);
const blub = new Tanque (123, 23, 243, 'Blub',14, 'volar', 'aniquilar');
const lucha = new Luchador (187, 4, 23, 'Lucha', 'resitencia', 'apoyo');
const Verd = new Tirador (21, 123, 121, 'Verd', 'municiones', 'refuerzo');
const Andy = new Asesino (78, 547, 234, 'Andy',98, 'agresividad', 'agilidad');
const Roco = new Asesino (19, 38, 18, 'Roco', 567, 'suerte', 'temido', 'bueno con las armas');