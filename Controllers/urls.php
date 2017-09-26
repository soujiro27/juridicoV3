<?php 
include_once 'juridico/catalogos/Modulos.php';

class urls{
    public function validaModulo($modulo){
      
        $modul=new Catalogos();
        $modulos= $modul->completos();
        foreach($modulos as $valor){
            if($valor==$modulo){ $salida = True; break; }else{ $salida =  False; }
        }
        return $salida;
    }
    public function isCatalogo($ruta){
        $modul = new Catalogos();
        $catalogos = $modul->catalogo();
        foreach($catalogos as $valor){
            if($valor==$ruta){ $salida = True; break; }else{ $salida =  False; }
        }
        return $salida;

    }

    public function isModulo($ruta){
        $modul = new Catalogos();
        $modulos = $modul->modulo();
        foreach($modulos as $valor){
            if($valor==$ruta){ $salida = True; break; }else{ $salida =  False; }
        }
        return $salida;
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

    public function urlsTablas($modulo){
      
       if($this->validaModulo($modulo)){
           return  $modulo=$this->addCat($modulo);
            
       }else{
           return False;
       }
    }

}

?>