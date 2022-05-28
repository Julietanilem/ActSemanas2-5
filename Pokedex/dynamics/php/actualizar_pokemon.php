<?php
    require "config.php";
    $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema );
    if(!$con)
    {
        echo "No se pudo conectar con la base";
    }
    else{

        $alturaNueva = (isset ( $_POST ['alturaNueva']) && $_POST ['alturaNueva']!='')?$_POST['alturaNueva']: false;
        $pesoNuevo = (isset ( $_POST ['pesoNuevo']) && $_POST ['pesoNuevo']!='')?$_POST['pesoNuevo']: false;
        $select = (isset ( $_POST ['select-tipos2']) && $_POST ['select-tipos2']!='')?$_POST['select-tipos2']: false;
        $id = (isset ( $_POST ['id']) && $_POST ['id']!='')?$_POST['id']: false;
        $alturaV = (isset ( $_POST ['alturaV']) && $_POST ['alturaV']!='')?$_POST['alturaV']: false;
        $pesoV = (isset ( $_POST ['pesoV']) && $_POST ['pesoV']!='')?$_POST['pesoV']: false;
        $tipoV = (isset ( $_POST ['tipoV']) && $_POST ['tipoV']!='')?$_POST['tipoV']: false;  
        $imagenV = (isset($_POST["imagenV"]) && $_POST["imagenV"] != "") ? $_POST["imagenV"] : false;
        $imagenNueva = (isset($_POST["imagenNueva"]) && $_POST["imagenNueva"] != "") ? $_POST["imagenNueva"] : false;
        $nombre = (isset($_POST["nombre"]) && $_POST["nombre"] != "") ? $_POST["nombre"] : false;
        $seguir=1;
        if(!$alturaNueva)
        {
            $alturaNueva=$alturaV;
        }
        if(!$pesoNuevo)
        {
            $pesoNuevo=$pesoV;
        }
        if($_FILES['imagenNueva']['name'] == "")
        {
            if($imagenV!=null)
            {
                 $ruta=$imagenV;
            }
            else{
                $ruta=null;
            }
           
        }
        else{
            if(isset($_FILES['imagenNueva']) && $_FILES['imagenNueva']['name'] != "")
            { 
                $name=$_FILES['imagenNueva']['name'];
                $ext=pathinfo($name, PATHINFO_EXTENSION);
                $ext=strtolower($ext);
                if($ext=="png" || $ext=="jpg" || $ext=="jpeg" || $ext=="gif" || $ext=="svg")
                {
                    $arch=$_FILES['imagenNueva']['tmp_name'];
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
                    $respuesta = array ("ok" =>false,  "texto" => "El fomato del archivo no es valido");
                    $ruta=$imagenV;
                    $seguir=0;
                }
            }
        }
        if(is_numeric($alturaNueva) && $alturaNueva>=0 &&  is_numeric($pesoNuevo) && $pesoNuevo>=0 && $seguir==1  )
        {
         
            $sql = "UPDATE pokemon SET pok_height=$alturaNueva, pok_weight=$pesoNuevo, pok_imagen='$ruta' WHERE pok_id=$id";
            $res1 = mysqli_query($con,$sql);
            $sql = "UPDATE  pokemon_types SET type_id=$select WHERE pok_id=$id ";
            $res2 = mysqli_query($con,$sql);
            if($res1 == false || $res2 == false)
            {
                $respuesta = array ("ok" =>false, "texto" => "No se pudo actualizar");
            }
            else{
                $respuesta = array ("ok" =>true,  "texto" => "Pokemon actuzalizado");
            }
        }
        else{
            $respuesta = array ("ok" =>false,   "texto" => "Recuerda que la altura y el peso deben ser valores númericos positivos");
        }
        echo  json_encode($respuesta);
        
    }
?>