<?php
    require "config.php";
    $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema );
    $nombre = (isset ( $_POST ['nombre']) && $_POST ['nombre']!='')?$_POST['nombre']: false;
    $peticion = "SELECT * FROM pokemon WHERE pok_name='$nombre'";
    $res = mysqli_query($con,$peticion);
    $datos = mysqli_fetch_assoc($res);
    $ruta=NULL;
    $seguir=1;
    if($datos==NULL)
    {
        $altura = (isset ( $_POST ['altura']) && $_POST ['altura']!='')?$_POST['altura']: false;
  
        if(is_numeric($altura) && $altura>=0)
        {
            
            $peso = (isset ( $_POST ['peso']) && $_POST ['peso']!='')?$_POST['peso']: false;
            
             if(is_numeric($peso) && $peso>=0)
            {
                $exp_base = (isset ( $_POST ['exp_base']) && $_POST ['exp_base']!='')?$_POST['exp_base']: false;
                if(is_numeric($exp_base))
                {
                    $exp_base+=0;
                    $esNum=true;
                }
                else{
                    $esNum=false;
                }
                if($esNum && $exp_base>=0 && gettype($exp_base)=="integer")
                {
                    $tipo = (isset ( $_POST ['tipo']) && $_POST ['tipo']!='')?$_POST['tipo']: false;
            
                   
                    if(isset($_FILES['imagen']) && $_FILES['imagen']['name'] != "")
                    { 
                        $name=$_FILES['imagen']['name'];
                        
                        $ext=pathinfo($name, PATHINFO_EXTENSION);
                        $ext=strtolower($ext);
                        if($ext=="png" || $ext=="jpg" || $ext=="jpeg" || $ext=="gif" || $ext=="svg")
                        {
                            $arch=$_FILES['imagen']['tmp_name'];
                            $ruta= "./statics/img/$nombre.$ext";
                            rename($arch,  "../../statics/img/$nombre.$ext");
                            $sql="SELECT pok_imagen from pokemon";
                            $res = mysqli_query($con,$sql);
                            if($res == false)
                            {
                                $sql="ALTER TABLE pokemon ADD pok_imagen varchar(100)";
                                $res = mysqli_query($con,$sql);
                            }
                        }
                        else{
                            $respuesta = array ("ok" =>false,   "texto" => "El fomato del archivo no es valido");
                            $ruta=Null;
                            $seguir=0;
                        }
                    }
                    if($seguir==1)
                    {
                        $sql = "INSERT INTO pokemon VALUES (NULL, '$nombre', $altura, $peso, $exp_base, '$ruta')";
                        $res2 = mysqli_query($con,$sql);
                        
                        if($res2 == false)
                        {
                            mysqli_error($con);
                            $respuesta = array ("ok" =>false, "texto" => "No se pudo ingesar");
                        }
                        else{
                            $id = mysqli_insert_id($con);
                            $sql="INSERT INTO pokemon_types VALUES ($id, $tipo, 1)";
                            mysqli_query($con,$sql);
                            $respuesta = array ("ok" =>true, "id"=>$id,  "texto" => "Pokemon insertado");
                        }
                    }
                    
                }
                else{
                    $respuesta = array ("ok" =>false,   "texto" => "La experiencia debe ser un entero");
                }
               
            }
            else{
                $respuesta = array ("ok" =>false,   "texto" => "El peso debe ser un número positivo");
            }
        }
        else{
            $respuesta = array ("ok" =>false,   "texto" => "La altura debe ser un numero positivo");
        }
        
        
    }
    else{
        $respuesta = array ("ok" =>false,   "texto" => "Tu pokemon '".$nombre."' ya existe");
       
    }
    echo  json_encode($respuesta);

?>