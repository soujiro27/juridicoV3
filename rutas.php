<?php require "vendor/autoload.php";
use \Donut\Path as p;

class Rutas{
    public function controllers($controller){
        $path = p\join("juridico", "Controllers",$controller);
        return $path;
    }
}


?>