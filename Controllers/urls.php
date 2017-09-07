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
}

?>