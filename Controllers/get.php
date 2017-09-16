<?php 


include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';
include_once 'juridico/models/insert.php';

class GetController extends Consultas{
    
  
    public function getRegisterController($modulo,$datos){
        $get = new Get();
        $sql=$this->getAllWhere($modulo,$datos,'AND','=');
        $arrayPdo=$this->buildArrayPdo($datos);
        $res=$get->consultaWhere($sql,$arrayPdo);
        if(!$res){
            $get=array('Error' => 'Registro No Encontrado');
            echo json_encode($get);
        }else{
            echo json_encode($res);
        }
    }

    public function getRegisterControllerAuditoriaById($id){
        $get = new Get();
        
    }
}


?>