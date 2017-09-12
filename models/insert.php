<?php 


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

    public function insertSimple($sql){
        $db=$this->conecta();
        $query=$db->prepare($sql);
        
        $query->execute();
        return $query->fetchAll(PDO::FETCH_ASSOC);

    }

}


?>