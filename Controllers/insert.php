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
        $this->separaDatosVolantesDocumentos($datos);
       if($this->validaAuditoria($datos)){
            if($this->validaFolio($datos)){
                $send=$this->separaDatosVolante($datos);
                $sql = $this->insertQuery($modulo,$send);
                $pdo = $this->buildArrayPdo($send);
                $insert =  new InsertModel();
                if($insert->InsertPdoTrueFalse($sql,$pdo)){
                    $send=$this->separaDatosVolantesDocumentos($datos);
                    $sql = $this->insertQuery('VolantesDocumentos',$send);
                    $pdo = $this->buildArrayPdo($send);
                    //notificacion
                    $insert->InsertPdo($sql,$pdo);
                }
            }
        }
        
    }

    public function validaAuditoria($datos){
        $get = new GetController();
        $send=array('idSubTipoDocumento'=>$datos['idSubTipoDocumento'], 'cveAuditoria'=>$datos['cveAuditoria'] );
        $res=$get->getRegisterControllerPhp('VolantesDocumentos',$send);
        if($res){return True;}else{
            $get=array('Error' => 'La Auditoria ya se encuentras asignada a un Documento');
            echo json_encode($get);
        }
    }

    public function validaFolio($datos){
        $get = new GetController();
        $send=array('folio'=>$datos['folio'],'subFolio'=>$datos['subFolio'] );
        $res=$get->getRegisterControllerPhp('Volantes',$send);
        if($res){return True;}else{
            $get=array('Error' => 'El Numero de Folio Y SubFolio ya se encuentra Asignado');
            echo json_encode($get);
        }
    }
    public function separaDatosVolante($datos){
        $send=array(
            'idTipoDocto' => $datos['idTipoDocto'],
            'numDocumento' => $datos['numDocumento'],
            'fDocumento' => $datos['fDocumento'],
            'anexos' => $datos['anexos'],
            'fRecepcion' => $datos['fRecepcion'],
            'hRecepcion' => $datos['hRecepcion'],
            'idRemitente' => $datos['idRemitente'],
            'destinatario' => $datos['destinatario'],
            'asunto' => $datos['asunto'],
            'idCaracter' => $datos['idCaracter'],
            'idTurnado' => $datos['idTurnado'],
            'idAccion' => $datos['idAccion'],
            'folio' => $datos['folio'],
            'subFolio' => $datos['subFolio'],
            'extemporaneo' => $datos['extemporaneo']

        );
        return $send;
    }

    public function separaDatosVolantesDocumentos($datos){
        $get = new Get();
        $sqlLastRegister=$this->getLastRegister('Volantes','idVolante','idVolante');
        $idVolante=$get->consultaSimple($sqlLastRegister);
        $idVolante=$idVolante[0]['idVolante'];
       $send=array(
            'idVolante' => $idVolante,
            'promocion' => $datos['promocion'],
            'cveAuditoria' => $datos['cveAuditoria'],
            'idSubTipoDocumento' => $datos['idSubTipoDocumento'],
            'notaConfronta' => $datos['notaConfronta']
        );
        return $send;
    }

    public function isFileExist($modulo,$numDoc){
        $get = new Get();
        $user=array('idUsuario' => $_SESSION ['idUsuario']);
        $sql=$this->getAllWhere('usuarios',$user,'AND','=');
        $arrayPdo=$this->buildArrayPdo($user);
        $res=$get->consultaWhere($sql,$arrayPdo);
        $idArea=$res[0]["idArea"];
        $data=array('numDocumento'=>$numDoc, 'idTurnado'=>$idArea);
        $sql=$this->getAllWhere('Volantes',$data,'AND','=');
        $arrayPdo=$this->buildArrayPdo($data);
        $res=$get->consultaWhere($sql,$arrayPdo);
        if(!$res){
            //no hay registro
            return False;
        }else{
            if($res[0]["anexoDoc"]==NULL){
                return $res[0]["idVolante"];
            }else{
                //echo "no es null";
                return $res[0]["idVolante"];
            }
            
        }
    }

    public function isFileExistAll($modulo,$numDoc){
        $get = new Get();
        $data=array('numDocumento'=>$numDoc);
        $sql=$this->getAllWhere('Volantes',$data,'AND','=');
        $arrayPdo=$this->buildArrayPdo($data);
        $res=$get->consultaWhere($sql,$arrayPdo);
        if(!$res){
            //no hay registro
            return False;
        }else{
            if($res[0]["anexoDoc"]==NULL){
                return $res[0]["idVolante"];
            }else{
                //echo "no es null";
                return $res[0]["idVolante"];
            }
            
        }
    }

}


?>