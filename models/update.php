<?php 


class UpdateModel{

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

    public function UpdatePdo($sql,$pdo){
        $db=$this->conecta();
        try{
            $dbQuery=$db->prepare($sql);
            $pdo[':usrModificacion']=$_SESSION ["idUsuario"];
            $dbQuery->execute($pdo);
        } catch(PDOException $e){
            $errores=$dbQuery->errorInfo();     
            $insert=array('Error' => $errores);
            echo json_encode($insert);
        }
    }

}


?>