window.addEventListener("load", () => {
  const btnAgregar = document.getElementById("btn-agregar");
  const divAgregar = document.getElementById("contenedor-agregar");
  const btnEnviar = document.getElementById("btn-enviar");
  const buscador = document.getElementById("buscador");
  const divDatos = document.getElementById("contenedor-mostrar");
  const divActualizar = document.getElementById("contenedor-actualizar");
  const divResultados = document.getElementById("contenedor-resultados");
  const formNuevo = document.getElementById("form-nuevo");
  const formActualizacion = document.createElement("form");
  var id=0;
  var pokemon=0;
  var donde; 
  var alturaNueva;
  var tipoNuevo;
  var pesoNuevo;
  var imagenNueva;
  var altura;
  var tipoPok;
  var imagen;
  var peso;
  function tipos(donde){
    fetch("./dynamics/php/tipos.php")
    .then((response) => {
      return response.json();
    })
    .then((datosJSON) => {
      // console.log(datosJSON);
      let selectTipos = document.getElementById(donde);
      for (tipo of datosJSON) {
        selectTipos.innerHTML += "<option value='" + tipo.id + "'>" + tipo.nombre + "</option>";
      }
    });

  }
  tipos("select-tipos");
  buscador.addEventListener("keyup", (evento) => {
    resultados(evento);
  });

  function resultados(evento) {

    let termino = buscador.value;
    divResultados.innerHTML = "";
    divAgregar.style.display = "none";
    if (termino.length >= 3) {
      fetch("dynamics/php/pokemon.php?q=" + termino)
        .then((response) => {
          return response.json();
        })
        .then((datosJSON) => {

          for (pokemon of datosJSON) {
        
               let div = document.createElement("div");
              div.innerHTML = pokemon.pok_name;
              div.dataset.id = pokemon.pok_id;
              div.classList.add("Coincidencia");
              divResultados.appendChild(div);
              divDatos.style.display = "none";
          
          }
          if (datosJSON.length == 0) {
            let div = document.createElement("div");
            div.innerHTML = "No se encontraron resultados.";;

            divResultados.appendChild(div);
            divDatos.style.display = "none";
          }

        });

    }


  }
  btnAgregar.addEventListener("click", (evento) => {

    divAgregar.style.display = "block";
    divResultados.innerHTML = "";
    divDatos.innerHTML = "";
    divActualizar.innerHTML = "";

  });

  btnEnviar.addEventListener("click", (evento) => {

    divAgregar.style.display = "none";

    evento.preventDefault();

    let datosForm = new FormData(formNuevo);
    divDatos.style.display = "none";


    fetch("dynamics/php/crear_pokemon.php", {
      method: "POST",
      body: datosForm,
    }).then((response) => {
      return response.json();
    }).then((datosJSON) => {
      if (datosJSON.ok == true) {
        alert("Se ha creado tu pokemon ");
        divAgregar.children[0].children[1].children[1].value="";
        divAgregar.children[0].children[2].children[1].value="";
        divAgregar.children[0].children[3].children[1].value="";
        divAgregar.children[0].children[4].children[1].value="";
        divAgregar.children[0].children[6].children[1].value="";
      }
      else {
        alert(datosJSON.texto);
      }
    })

  });
  

  buscador.addEventListener("click", (evento) => {
    resultados(evento);
  });

  divResultados.addEventListener("click", (evento) => {
    divResultados.innerHTML = "";
    divDatos.innerHTML = "";
    divAgregar.style.display = "none";
    if (evento.target.classList.contains("Coincidencia")) {
      id = evento.target.dataset.id;
      fetch("dynamics/php/pokemon.php?id=" + id)
        .then((response) => {
          return response.json();
        }).then((datosJSON) => {
          // console.log(datosJSON);
          if (datosJSON.ok == true) {
            pokemon=datosJSON.datos.nombre;
            altura=datosJSON.datos.altura;
            peso= datosJSON.datos.peso;
            tipoPok= datosJSON.datos.tipo;
            imagen= datosJSON.datos.ruta;
            divDatos.innerHTML += "<div class='dato'><h3>Nombre</h3>" + datosJSON.datos.nombre + "</div>";
            divDatos.innerHTML += "<div class='dato'><h3>Altura</h3>" + datosJSON.datos.altura + "</div>";
            divDatos.innerHTML += "<div class='dato'><h3>Peso</h3>" + datosJSON.datos.peso + "</div>";
            divDatos.innerHTML += "<div class='dato'><h3>Tipo</h3>" + datosJSON.datos.tipo + "</div>";
            if (datosJSON.datos.ruta != null && datosJSON.datos.ruta != undefined) { 
              divDatos.innerHTML += "<div class='dato'><h3>Imagen</h3><img src='" + datosJSON.datos.ruta +"' alt='Aun no hay imagen, puedes subir una al actualizar :)' height='100vh'> </div>";
            }else{
              divDatos.innerHTML += "<div class='dato'><h3>Imagen</h3>Aun no hay imagen</div>";
            }
            divDatos.innerHTML += "<button data-id='" + id + "' id='btn-eliminar'>Eliminar pokemon</button>";
            divDatos.innerHTML += "<button data-id='" + id + "' id='btn-actualizar'>Actualizar pokemon</button>"
            divDatos.style.display = "flex";

          }

        })
    }
  });

  divDatos.addEventListener("click", (evento => {
    divAgregar.style.display = "none";
    if (evento.target.id == "btn-eliminar") {
      let datosForm = new FormData();
      datosForm.append("id", evento.target.dataset.id);
      fetch("./dynamics/php/borrar_pokemon.php", {
        method: "POST",
        body: datosForm,
      }).then((response) => {
        return response.json();
      }).then((datosJSON) => {
        if (datosJSON.ok == true) {
          divDatos.innerHTML = "";
          divResultados.innerHTML = "";
          alert("se elimino el pokemon")

        }
        else {
          alert("No se pudo eliminar")
        }
      })
    }
    if (evento.target.id == "btn-actualizar") {
      divActualizar.appendChild(formActualizacion);
            divDatos.style.display="none";
           divActualizar.style.display="block";
            formActualizacion.innerHTML = "<div class='actualizar'><h3>Nombre</h3>" + pokemon + "</div>";
            formActualizacion.innerHTML += "<div class='actualizar' data-alturay'" + altura + "'><h3>Altura</h3><input type='number' id='alturaNueva' name='alturaNueva'></inpu></div>";
            formActualizacion.innerHTML  += "<div class='actualizar' data-peso='" + peso + "'><h3>Peso</h3><input type='number' id='pesoNuevo' name='pesoNuevo'></inpu></div>";
            formActualizacion.innerHTML += "<div class='actualizar' data-tipo='" + tipoPok + "'><h3>Tipo</h3><select id='select-tipos2' name='select-tipos2'></select</div>";
            formActualizacion.innerHTML  += "<div class='actualizar'><h3>Imagen</h3><input type='file' id='imagenNueva' name='imagenNueva'></inpu></div>";
           
            tipos('select-tipos2');
            formActualizacion.innerHTML += "<button data-id='" + id + "' id='btn-enviarAct'>Listo</button>"

            alturaNueva= document.getElementById("alturaNueva");
            alturaNueva.value=altura;
            pesoNuevo= document.getElementById("pesoNuevo");
            pesoNuevo.value=peso;
            tipoNuevo= document.getElementById("select-tipos2");
            tipoNuevo.value=tipoPok;
            imagenNueva= document.getElementById("imagenNueva");
            divActualizar.style.display = "flex";
    }

  }));
  divActualizar.addEventListener("click", (evento)=>
  {
    
    if(evento.target.id =='btn-enviarAct')
    { 
      divActualizar.style.display="none";
      evento.preventDefault();
      let datosForm = new FormData(formActualizacion);
      datosForm.append("id", id);
      datosForm.append("alturaV", altura);
      datosForm.append("pesoV", peso);
      datosForm.append("tipoV", tipoPok);
      datosForm.append("imagenV", imagen);
      datosForm.append("nombre", pokemon);
      fetch("./dynamics/php/actualizar_pokemon.php", {
        method: "POST",
        body: datosForm,
      }).then((response) => {
        return response.json();
      }).then((datosJSON) => {
        if (datosJSON.ok == true) {
         
          divResultados.innerHTML = "";
          buscador.value="";
          alert("Pokemon actualizado");

        }
        else{
          alert(datosJSON.texto);
        }
      })
    }
  })
  
});