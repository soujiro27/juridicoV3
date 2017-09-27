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
        $sql=$this->getAuditoriaById($id);
        $res=$get->consultaSimple($sql);
        if(!$res){
            $get=array('Error' => 'Registro No Encontrado');
            echo json_encode($get);
        }else{
            echo json_encode($res);
        }
    }

    public function getRegisterControllerPhp($modulo,$datos){
        $get = new Get();
        $sql=$this->getAllWhere($modulo,$datos,'AND','=');
        $arrayPdo=$this->buildArrayPdo($datos);
        $res=$get->consultaWhere($sql,$arrayPdo);
        if(!$res){
           return True;
        }else{
            return False;
        }
    }

    public function getAreasVolantes($datos){
        $get = new Get();
        $idAuditoria=$datos['cveAuditoria'];
        $tipo=$datos['nombre'];
        $sql=$this->getAreasVolantesAsignados($idAuditoria,$tipo);
        $res=$get->consultaSimple($sql);
        echo json_encode($res);
   }

   public function getMaxQuery($ruta,$datos){
       //var_dump($datos);
       $get = new Get();
       $sql=$this->getLastRegister($ruta,$datos['campo'],$datos['alias']);
       $res=$get->consultaSimple($sql);
       echo json_encode($res);
   }

   public function getNotificationData($data){
       $idVolante=$data['idVolante'];
       $sql=$this->notification($idVolante);
       $get = new Get();
       $res=$get->consultaSimple($sql);
       echo json_encode($res);
   }
}


?>