<?php
  require "config.php";
  $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema );
if(!$con)
{
  echo "No se conecto la BD";
}
else{
  if(isset($_GET['q']))
  {
    
    $query = $_GET['q'];
    
    $query2='%'.$query.'%';

    $sql="SELECT pok_id, pok_name FROM pokemon WHERE pok_name LIKE '$query2'";

    $res = mysqli_query($con, $sql);
    $resultados=[];
    while($row=mysqli_fetch_assoc($res))
    {
      $resultados[] = $row;
    }

    echo json_encode($resultados);
  }else if(isset($_GET['id']))
  {
    $query = $_GET['id'];
    $sql="SELECT pok_imagen from pokemon";
    $res = mysqli_query($con,$sql);
    if($res == false)
    {
        $sql="ALTER TABLE pokemon ADD pok_imagen varchar(100)";
        $res = mysqli_query($con,$sql);
    }
    $sql="SELECT pok_id, pok_name, pok_height, pok_weight, pok_base_experience, type_name, pok_imagen
    FROM pokemon NATURAL JOIN pokemon_types NATURAL JOIN types WHERE pok_id='$query' AND slot=1";
    $res = mysqli_query($con, $sql);
    $row = mysqli_fetch_assoc($res);
      
      $datos = array("id"=>$row['pok_id'], "nombre"=>$row['pok_name'], 
                      "altura"=>$row['pok_height'], "peso"=>$row['pok_weight'],
                      "tipo"=>$row['type_name'], "ruta"=>$row['pok_imagen']);

      $respuesta = array("ok"=>true, "datos"=>$datos, "imagen"=>$datos["ruta"]);

      echo json_encode($respuesta);

  
  
  }
}