<?php 
include_once 'juridico/cat/Catalogos.php';

class urls{
    public function validaModulo($modulo){
        $modul=new Catalogos();
        $modulos= $modul->completos();
        foreach($modulos as $valor){ 
            if($valor==$modulo){ return True; }else{ return False; }
        }
    }
    public function isCatalogo($ruta){
        $modul = new Catalogos();
        $catalogos = $modul->catalogo();
        foreach($catalogos as $valor){
            if($valor==$ruta){return True;}else{return False;}
        }

    }

    public function isModulo($ruta){
        $modul = new Catalogos();
        $modulos = $modul->modulo();
        foreach($modulos as $valor){
            if($valor==$ruta){return True;}else{return False;}
        }
    }

    public function CambioNombre($ruta){
        if($ruta=='Prueba'){
            $ruta='Prueba';
            return $ruta;
        }else{
            return $ruta;
        }
    }

    public function addCat($ruta){
        if($this->isCatalogo($ruta)){
            $tabla='Cat'.$ruta;
        }else{
            $tabla=$ruta;
        }
        return $tabla;
    }

}

?>