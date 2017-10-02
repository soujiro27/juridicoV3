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
        try{
            $dbQuery=$db->prepare($sql);
            $pdo[':usrAlta']=$_SESSION ["idUsuario"];
            $dbQuery->execute($pdo);
            $insert=array('Success' => 'Success');
            echo json_encode($insert);
            //$errores=$dbQuery->errorInfo();     
            //$insert=array('Error' => $errores);
            //echo json_encode($insert);
        } catch(PDOException $e){
            $errores=$dbQuery->errorInfo();     
            $insert=array('Error' => $errores);
            echo json_encode($insert);
        }
    }

    public function InsertPdoTrueFalse($sql,$pdo){
        $db=$this->conecta();
        try{
            $dbQuery=$db->prepare($sql);
            $pdo[':usrAlta']=$_SESSION ["idUsuario"];
            $dbQuery->execute($pdo);
           return True;
        } catch(PDOException $e){
            $errores=$dbQuery->errorInfo();     
           return False;
        }
    }

}


?>