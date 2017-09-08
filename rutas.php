<?php require "vendor/autoload.php";
use \Donut\Path as p;

class Rutas{
    public function controllers($controller){
        $path = p\join("juridico", "Controllers",$controller);
        return $path;
    }
    public function Orm($consulta){
        $path = p\join("juridico", "orm",$consulta);
        return $path;
    }
}


?>