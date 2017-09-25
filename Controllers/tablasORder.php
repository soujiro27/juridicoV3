<?php 

include_once 'juridico/catalogos/Tablas.php';
include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';

class TablasOrder{
   public function __construct($modulo,$campos){
     $campo=$campos['campo'];
     $tipo=$campos['tipo'];
     $sql = $this->generateQueryOrm($modulo,$campo,$tipo);
           
   }

   public function generateQueryOrm($modulo,$campo,$tipo){
        $orm = new Consultas();
        $model = new Get();
        $sql=$orm->getAllOrder($modulo,$campo,$tipo);
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