<?php 

class Consultas{
    private $all = 'Select * from sia_';

    public function getAll($tabla){
        $sql=$this->all.$tabla;
        return $sql;
    }

    public function getFields($tabla, $campos){
        $sql = 'Select ';
        $fields=$this->buildFields($campos);
        $fields=$sql.$fields.' from sia_'.$tabla;
        return $fields;
    }

    public function getAllOrder($tabla,$campos){
        $sql=$this->getAll($tabla);
        $orders=$this->buildFields($campos);
        $sql=$sql.' order by '.$orders;
        return $sql;
    }

    public function getFieldsOrder($tabla,$campos,$order){
        $sql=$this->getFields($tabla,$campos);
        $orders=$this->buildFields($campos);
        $sql=$sql.' order by '.$orders;
        return $sql;
    }

    public function buildFields($campos){
        $cadena='';
        foreach($campos as $key => $valor){
            $cadena=$cadena.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }

 
}


?>