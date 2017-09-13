<?php 


include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';
include_once 'juridico/models/insert.php';
include_once 'juridico/models/update.php';

class UpdateController extends Consultas{
    
    public function updateCatalogo($modulo,$datos){
        if($this->validaDatos($datos)){
           $sql = $this->isExistRegister($modulo,$datos);
           if($sql){
               $where=$this->getDataWhereQuery($datos);
               $valuesQuery=$this->deleteLastRegisterPdo($datos);
               $sql=$this->updateQuery($modulo,$valuesQuery,$where);
               $pdo = $this->buildArrayPdo($datos);
               $update = new UpdateModel();
               $update->UpdatePdo($sql,$pdo);
            }else{
                $insert=array('Error' => 'Registro Duplicado');
                echo json_encode($insert);
            }
            
        }
    }

    public function validaDatos($datos){
        $cont=0;
        foreach($datos as $llave => $valor ){
           if(empty($valor)){
               return False;
           }
        }
        return True;
    }
    public function isExistRegister($modulo,$datos){
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

    public function getDataWhereQuery($campos){
       end($campos);
       $llave=key($campos);
       $valor=end($campos);
       return $datos=array($llave => $valor);
    }

    public function deleteLastRegisterPdo($datos){
        end($datos);
        $llave=key($datos);
        unset($datos[$llave]);
        return $datos;
    }
}


?>