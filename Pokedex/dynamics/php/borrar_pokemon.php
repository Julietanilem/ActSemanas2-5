<?php
require "config.php";
$res=true;
$con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema );
$id = $_POST['id'];
$peticion="DELETE FROM pokemon_evolution WHERE evol_id IN 
(SELECT evol_id FROM pokemon_evolution INNER JOIN
pokemon_evolution_matchup ON pokemon_evolution.evolved_species_id = 
pokemon_evolution_matchup.pok_id where pok_id=$id)";
mysqli_query($con, $peticion);
$tablasConectadas=["base_stats" ,"pokemon_evolution_matchup" ,
"pokemon_abilities", "pokemon_types",
"pokemon_moves", "pokemon"];
foreach($tablasConectadas as $tabla)
{
    $sql="DELETE FROM $tabla WHERE pok_id= $id";
    $res= mysqli_query($con, $sql);
}
if($res==true)
{
    $respuesta = array("ok"=>true);
} 
else{
    mysqli_error($con);
    $respuesta = array ("ok" => false);
}

 echo json_encode($respuesta);

  ?>