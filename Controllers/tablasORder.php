<?php 

include_once 'juridico/catalogos/Tablas.php';
include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';

class TablasOrder{
   public function __construct($modulo,$campos){
     $campo=$campos['campo'];
     $tipo=$campos['tipo'];
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
      $sql=$this->andOrderAndTypeSql($catTablas->volantes(),$campo,$tipo);
      $this->QuerySimple($sql);
     }
     elseif ($modulo=='Irac') {
      $sql=$this->andOrderAndTypeSql($catTablas->irac(),$campo,$tipo);
      $this->QuerySimple($sql);
  }
  elseif ($modulo=='confrontasJuridico') {
    $sql=$this->andOrderAndTypeSql($catTablas->confronta(),$campo,$tipo);
    $this->QuerySimple($sql);
   }
   elseif ($modulo=='Ifa') {
       $sql=$this->andOrderAndTypeSql($catTablas->Ifa(),$campo,$tipo);
       $this->QuerySimple($sql);
   }
   elseif ($modulo=='Documentos') {
    $sql=$this->andOrderAndTypeSql($catTablas->documentos(),$campo,$tipo);
    $this->QuerySimple($sql);
    }
    elseif ($modulo=='DocumentosGral') {
    $sql=$this->andOrderAndTypeSql($catTablas->documentosGral(),$campo,$tipo);
    $this->QuerySimple($sql);
    }
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

   public function andOrderAndTypeSql($sql,$campo,$tipo){
      $sql=$sql." ORDER BY '$campo' ".$tipo;
      return $sql;
   }
}

?>