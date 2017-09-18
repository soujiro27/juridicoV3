<?php 


include_once 'juridico/orm/consultas.php';
include_once 'juridico/models/get.php';
include_once 'juridico/models/insert.php';
include_once 'juridico/controllers/get.php';

class Insert extends Consultas{
    

    public function selectInsert($modulo,$datos){
        if($modulo=='Volantes'){$this->insertVolantes($modulo,$datos);}
        else{$this->insertCatalogo($modulo,$datos);}
    }


    public function insertCatalogo($modulo,$datos){
        if($this->validaDatos($datos)){
           $sql = $this->isExistRegister($modulo,$datos);
           if($sql){
               $sql = $this->insertQuery($modulo,$datos);
               $pdo = $this->buildArrayPdo($datos);
               $insert =  new InsertModel();
               $insert->InsertPdo($sql,$pdo);
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

    public function insertVolantes($modulo,$datos){
        $get = new GetController();
        if($get->getRegisterControllerPhp($modulo,$datos)){

        }else{
            $get=array('Error' => 'Registro No Encontrado');
            echo json_encode($get);
        }
    }
}


?>