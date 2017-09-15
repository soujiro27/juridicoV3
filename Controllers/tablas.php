<?php 

include_once 'juridico/catalogos/Tablas.php';
include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';

class Tablas{
   public function __construct($modulo){
       $catTablas= new CatTablas();
       if($modulo=='CatCaracteres')
       { $this->generateQueryOrm($modulo,$catTablas->Caracteres());}
       elseif($modulo=='CatAcciones')
       {$this->generateQueryOrm($modulo,$catTablas->Acciones());}
       elseif ($modulo=='CatSubTiposDocumentos') { 
        $this->generateQueryOrm($modulo,$catTablas->SubTiposDocumentos());
       }elseif ($modulo=='CatDoctosTextos') {
           $this->QuerySimple($catTablas->DoctosTexto());
       }
       elseif ($modulo=='Volantes') {
        $this->QuerySimple($catTablas->volantes());
       }
           
   }

   public function generateQueryOrm($modulo,$campos){
        $orm = new Consultas();
        $model = new Get();
        $sql=$orm->getFields($modulo,$campos);
        $res=$model->consultaSimple($sql);
        echo json_encode($res);
   }

   public function QuerySimple($sql){
        $model = new Get();   
        $res=$model->consultaSimple($sql);
        echo json_encode($res);
   }
}

?>