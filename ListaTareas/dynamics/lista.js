const boton = document.getElementById("crear");
const input = document.getElementById("tareaInput");
const materia = document.getElementById("materia");
const lista = document.getElementById("lista");
const form = document.getElementById("form");
const div = document.getElementById("tareas");
var marcadas = document.createElement("span");
var input1 = document.createElement("input");
let auxiliar = document.createElement("span");
let cadena=" tareas acabadas de ";
input1.innerHTML="<input class='texto' id='otra' name='otra' type='text' placeholder='Escribe tu materia' />";
auxiliar.innerHTML="<label for='otra'>Materia:</label>"
let contMat = materia.value;
let otra=0;
let child=0;
let totales=0;
let acabadas=0;
let index=0;
materia.addEventListener("change", (evento)=>
{

    contMat = materia.value;
    if(contMat=="Otra"){   
        form.appendChild(auxiliar);
        form.appendChild(input1);
        otra=1;
        child=1;
    }
    else{
        if(child==1)
        {
            form.removeChild(auxiliar); 
           form.removeChild(input1); 
           child=0;
        }
        otra=0;
    }
});
boton.addEventListener("click", (evento)=>{
    var tarea = input.value;
    if(tarea != "")
    {
        if(otra != 1)
        {
            
            lista.innerHTML += "<div id='"+index+"' class='tarea'>"+"<div id='ariba'><span class='boton' id='SelectMateria'><strong>"+contMat+"</strong></span>"+'<button class="boton" id="subir">Subir</button>'+'<button class="boton" id="bajar">Bajar</button></div>'+'<br><br><div id="izquierda">'+tarea+'</div><div id="derecha"><button class="boton"id="completar">Completado</button><br><button class="boton" id="borrar">Borrar</button>'+'</div></div>';
            totales++;
            index++;
        } 
        else
        {
            contMat=input1.value;
            if(contMat== "Matemáticas" || contMat== "matemáticas"|| contMat== "Literatura" || contMat== "literatura"|| contMat== "Química" || contMat== "química"|| contMat== "Biología" || contMat== "biología")
            {
               alert("Esa materia ya existía")
            }
            else if(contMat == "")
            {
                alert("Selecciona una materia")
            }
            else{
                
                lista.innerHTML += "<div id='"+index+"' class='tarea'>"+"<div id='ariba'><span class='boton' id='SelectMateria'><strong>"+contMat+"</strong></span>"+'<button class="boton" id="subir">Subir</button>'+'<button class="boton" id="bajar">Bajar</button></div>'+'<br><br><div id="izquierda">'+tarea+'</div><div id="derecha"><button class="boton"id="completar">Completado</button><br><button class="boton" id="borrar">Borrar</button>'+'</div></div>';
                totales++;
                index++;
            }
        
        }
    
        if(acabadas==1)
        {
            cadena=" tarea acabada de "
        }
        else{
            cadena=" tareas acabadas de "
        }
        marcadas.innerHTML=acabadas+cadena+totales;
    }
    else{
        alert("No escribiste una tarea");
    }
    
});
lista.addEventListener("click" , (evento)=>{

    if(evento.target.className== "boton")
    {
        if(evento.target.id=="subir"){
            
            var elIDSube= evento.target.parentElement.parentElement.id;
     
            if(elIDSube>0)
            {
                var IDBaja= elIDSube-1;
             
                var matArriba=lista.children[elIDSube].children[0].children[0].innerHTML;
                var matAbajo=lista.children[IDBaja].children[0].children[0].innerHTML;

                lista.children[elIDSube].children[0].children[0].innerHTML=matAbajo;
                lista.children[IDBaja].children[0].children[0].innerHTML=matArriba;

                var tarArriba= lista.children[elIDSube].children[3].innerHTML;
                var tarAbajo= lista.children[IDBaja].children[3].innerHTML;

                lista.children[elIDSube].children[3].innerHTML=tarAbajo;
                lista.children[IDBaja].children[3].innerHTML=tarArriba;

                var compleArriba = lista.children[elIDSube].children[4].children[0].innerHTML;
                var compleAbajo =  lista.children[IDBaja].children[4].children[0].innerHTML;

                lista.children[elIDSube].children[4].children[0].innerHTML = compleAbajo ;
                lista.children[IDBaja].children[4].children[0].innerHTML = compleArriba;


                
                if( lista.children[elIDSube].children[4].children[0].innerHTML == "Completado"){
                    lista.children[elIDSube].setAttribute("style", "background-color:antiquewhite; color:brown"); 
                }
                else{
                    lista.children[elIDSube].setAttribute("style", "background-color:#f06c96; color:#800b0077");
                }
                if(lista.children[IDBaja].children[4].children[0].innerHTML == "Completado"){
            
                    lista.children[IDBaja].setAttribute("style", "background-color:antiquewhite; color:brown");
                }
                else{
                    lista.children[IDBaja].setAttribute("style", "background-color:#f06c96; color:#800b0077");
                }
                
            }
            
        }
        if(evento.target.id=="bajar"){

            var IDBaja= evento.target.parentElement.parentElement.id;
     
            if(IDBaja<totales-1)
            {
                var elIDSube= IDBaja;
                var elIDSube= IDBaja++;
                parseInt(elIDSube, 10)
    
               var matArriba=lista.children[IDBaja].children[0].children[0].innerHTML;
               var matAbajo=lista.children[elIDSube].children[0].children[0].innerHTML;
               

                lista.children[elIDSube].children[0].children[0].innerHTML=matArriba;
                lista.children[IDBaja].children[0].children[0].innerHTML=matAbajo;

                var tarArriba= lista.children[IDBaja].children[3].innerHTML;
                var tarAbajo= lista.children[elIDSube].children[3].innerHTML;

                lista.children[elIDSube].children[3].innerHTML=tarArriba;
                lista.children[IDBaja].children[3].innerHTML=tarAbajo;

                var compleArriba = lista.children[IDBaja].children[4].children[0].innerHTML;
                var compleAbajo =  lista.children[elIDSube].children[4].children[0].innerHTML;

                lista.children[elIDSube].children[4].children[0].innerHTML = compleArriba ;
                lista.children[IDBaja].children[4].children[0].innerHTML = compleAbajo;
            
                if( lista.children[elIDSube].children[4].children[0].innerHTML == "Completado"){
                    lista.children[elIDSube].setAttribute("style", "background-color:antiquewhite; color:brown"); 
                }
                else{
                    lista.children[elIDSube].setAttribute("style", "background-color:#f06c96; color:#800b0077");
                }
                if(lista.children[IDBaja].children[4].children[0].innerHTML == "Completado"){
            
                    lista.children[IDBaja].setAttribute("style", "background-color:antiquewhite; color:brown");
                }
                else{
                    lista.children[IDBaja].setAttribute("style", "background-color:#f06c96; color:#800b0077");
                }
            
            }
           
         }



        if(evento.target.id=="borrar"){
            
            if(evento.target.parentElement.children[0].innerHTML=="No completado")
            {
                acabadas--;
            }
            esteid=evento.target.parentElement.parentElement.id;
         
            let i=totales-1;
           
            while(i>esteid)
            {
               
                var nuevoid=lista.children[i].id;
                nuevoid--;
                lista.children[i].id=nuevoid;
            
                i--; 
            }
                
   
            evento.target.parentElement.parentElement.remove();
            totales--;
                index--;
        }
        if(evento.target.id=="completar"){
           
             
             if(evento.target.innerHTML=="Completado")
            {
                acabadas++;
                evento.target.parentElement.parentElement.setAttribute("style", "background-color:#f06c96; color:#800b0077");
                evento.target.innerHTML= "No completado";
            }
            else{
                acabadas--;
                evento.target.parentElement.parentElement.setAttribute("style", "background-color:antiquewhite; color:brown");
                evento.target.innerHTML = "Completado";
            }
        }
        


    }
    if(acabadas==1)
    {
        cadena=" tarea acabada de "
    }
    else{
        cadena=" tareas acabadas de "
    }
    marcadas.innerHTML=acabadas+cadena+totales;
    
});
if(acabadas==1)
{
    cadena=" tarea acabada de "
}
else{
    cadena=" tareas acabadas de "
}
marcadas.innerHTML=acabadas+cadena+totales;
div.appendChild(marcadas);