<?php 


include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';
include_once 'juridico/models/insert.php';

class Insert extends Consultas{
    
    public function insertCatalogo($modulo,$datos){
        if($this->validaDatos($datos)){
           $sql = $this->isExistRegister($modulo,$datos);
           if($sql){
               $sql = $this->insertQuery($modulo,$datos);
               $pdo = $this->buildArrayPdo($datos);
               //$insert = new Insert();

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
        //var_dump($res);

    }
}


?>