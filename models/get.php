<?php 

include_once 'juridico/orm/consultas.php';

class Get{

    public function conecta(){
        try{
            require 'src/conexion.php';
            $db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
            return $db;
        }catch (PDOException $e) {
            print "ERROR: " . $e->getMessage();
            die();
        }
    }

    public function consultaSimple($sql){
        $db=$this->conecta();
        $query=$db->prepare($sql);
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);

    }
    
    public function consultaWhere($sql,$pdo){
        $db=$this->conecta();
        $query=$db->prepare($sql);
        $query->execute($pdo);
        $res=$query->fetchAll(PDO::FETCH_ASSOC);
        $errores=$query->errorInfo();   
        if(!empty($res)){
            return $res;
        }elseif(empty()){
            $insert=array('Error' => $errores);
            return $insert;
            
        }
    }

}


?>