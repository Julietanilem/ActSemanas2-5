const canvas = document.getElementById("estrella"); 
const ctx = canvas.getContext("2d"); 
const color = document.getElementById("color"); 
const lados = document.getElementById("lados");
const picudez = document.getElementById("picudez"); 
const relleno = document.getElementById("relleno");
var rellenar=0;
var canvaTam = 500; 


function dibujarEstrella(){

        
        var centroX = canvaTam/2; 
        var centroY = canvaTam/2; 
        var radioDentro = 203-picudez.value; 
        //console.log(picudez.value); 
        var radioFuera = canvaTam/2; 
        var lineas = lados.value*2; 
        var radianes= Math.PI * 2/lineas; 
        var direccion; 
        var anguloRot; 
        var x, y; 
        ctx.lineWidth = 2; 
        ctx.strokeStyle = color.value;
        ctx.fillStyle = color.value;
        var i;
        if(lados.value<31 && lados.value>3)
        {
                ctx.beginPath(); 
               
                moveTo(centroX, centroY);
                for( i = 0; i<= lineas; i++)
                {
                        anguloRot = i * radianes; 
                        // console.log(i%2)
                        if(i%2==0){ 
                                direccion = radioDentro; 
                        } else { 
                                direccion = radioFuera; 
                        }
                        
                        x = centroX + direccion * Math.cos(anguloRot); 
                        y=  centroY + direccion * Math.sin(anguloRot) ; 
                        // console.log(x+","+y);
                        ctx.lineTo(x, y); 
                }
        
              
                if(rellenar==1){
                
                        
                        ctx.fill();  
                }
                else if(rellenar==0){
                        ctx.stroke();    
                }
                ctx.closePath(); 
        
        }
        else{
                        alert("Ingresa un número de lados entre 4 y 30 inclusive");
                        lados.value=10;
                        dibujarEstrella();
                }
};

dibujarEstrella(); 


color.addEventListener("change", (evento)=>
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        dibujarEstrella(); 
});

lados.addEventListener("change", (eventos) =>
{
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarEstrella(); 
})

picudez.addEventListener("change", (eventos) =>
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarEstrella(); 
})
relleno.addEventListener("click", (eventos) =>
{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(rellenar==1)
        {
                rellenar=0;
        }
        else{
                rellenar=1;
        }
        
        dibujarEstrella(); 
})
