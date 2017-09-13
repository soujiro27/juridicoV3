<?php 


class InsertModel{

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

    public function InsertPdo($sql,$pdo){
        $db=$this->conecta();
        $query=$db->prepare($sql);
        $pdo[':usrAlta']=$_SESSION ["idUsuario"];
        $dbQuery->execute($pdo);
        $errores=$dbQuery->errorInfo();     
        if(!empty($errores)){
            $insert=array('Error' => $errores);
            echo json_encode($insert);
        }
    }

}


?>