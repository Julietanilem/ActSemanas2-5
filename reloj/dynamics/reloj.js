const boton= document.getElementById("inicio");
const guardar= document.getElementById("guardar");
const parar= document.getElementById("parar");
const canvas = document.getElementById("circulo"); 
const ctx = canvas.getContext("2d"); 
const modal = document.getElementById("exampleModal");
const inHoras = document.getElementById("horas");
const inMinutos = document.getElementById("minutos");
const inSec = document.getElementById("segundos");
const tempo = document.getElementById("tempo");
const alarma = new Audio ("../media/audio/alarma.mp3");
var horas = inHoras.value;
var minutos = inMinutos.value;
var segundos = inSec.value;
var milisec;
var segImp;
var minImp;
var horImp;
var milisecCuenta = 0;
var segtemp;

ctx.beginPath();
ctx.strokeStyle = "#A3B8E3";
ctx.lineWidth=16;
ctx.arc(250,250,200, 0, Math.PI*2);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.fillStyle = "#BFE1F9";
ctx.lineWidth=16;
ctx.arc(250,250,180, 0, Math.PI*2);
ctx.fill();
ctx.closePath();

if(horas==""){
    horas=0;

}
if(minutos=="")
{
    minutos=0;
}
if(segundos=="")
{
    segundos=0;
}
function asigTiempo(){
    segundos=inSec.value;
    
    if(segundos>59)
    {
        segundos=59;
    }
    else if(segundos<0)
    {
        segundos=0;
    }
    if(segundos=="")
    {
       segundos=0;
    }
    horas=inHoras.value;
    if(horas=="")
    {
        horas=0;
    }
    minutos=inMinutos.value;
    
    if(minutos>59)
    {
        minutos=59;
    }
    else if(minutos<0)
    {
        minutos=0;
    }
    if(minutos=="")
    {
        minutos=0;
    }
}
function milisegundos(){
    horasSec=horas*3600*1000;
    minutosSec=minutos*60000;
    segundosSec=segundos*1000;
    var total=horasSec+minutosSec+segundosSec;
    return total ;
};
function imprimible(hora, min, sec){
    if(min<10)
    {
        
        if(sec<10)
        {
            tempo.innerHTML=hora+":0"+min+":0"+sec;
        }
        else{
            tempo.innerHTML=hora+":0"+min+":"+sec;
        }
    }
    else if(sec<10)
    {
        tempo.innerHTML=hora+":"+min+":0"+sec;
    }
    else{
        tempo.innerHTML=hora+":"+min+":"+sec;
    }
}
function temporizador (milisec){
    
    segImp=segundos;
    minImp=minutos;
    horImp=horas;
    var acabado;
    imprimible(horImp, minImp, segImp);
    
    milisecCuenta=0;
  
       segtemp= setInterval(()=>
        {
            milisecCuenta+=1000;
            
            segImp--;
           
            if(segImp<0)
            {
                segImp=59;
                minImp--;
                if(minImp<0)
                {
                    minImp=59;
                    horImp--;
                }
            }

            imprimible(horImp, minImp, segImp);
            
            if(milisecCuenta>=milisec)
            {
                clearInterval(segtemp);
                tempo.innerHTML="00:00:00";
                acabado=true;
                alarma.volume=0.05;
                alarma.play();
                alarma.muted=false;

            }

        }, 1000) 



        if(acabado==true)
        {
            //alarma
            acabado=false;
        }

};

inHoras.addEventListener("change", ()=>{
   asigTiempo();


});
inMinutos.addEventListener("change", ()=>{
  asigTiempo();
  
});
inSec.addEventListener("change", ()=>{
    asigTiempo();
  
});
boton.addEventListener("click", ()=>{
    clearInterval(segtemp);
    
    milisec=milisegundos();
    if(milisec>0)
    {    
        temporizador(milisec);
    }
   

});
guardar.addEventListener("click", ()=>{
    asigTiempo();
    
    clearInterval(segtemp);
    imprimible(horas,minutos , segundos);

    alarma.pause();

});
parar.addEventListener("click", ()=>{
 
    clearInterval(segtemp);
    var frag=tempo.innerHTML.split(":");
    horas=parseInt(frag[0], 10);
    minutos=parseInt(frag[1], 10);
    segundos=parseInt(frag[2], 10);

    console.log(frag);
    alarma.muted=true;
});