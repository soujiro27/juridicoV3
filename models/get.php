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
        try{

            $query=$db->prepare($sql);
            $query->execute($pdo);
            $res=$query->fetchAll(PDO::FETCH_ASSOC);
            if(!empty($res)){
                return $res;
            }else{
                return False;
                
            }
        } catch(PDOException $e){
            $errores=$query->errorInfo();   
            $get=array('Error' => $errores);
            echo json_encode($get);
        }
    }

}


?>