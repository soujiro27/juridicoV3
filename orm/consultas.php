<?php 

class Consultas{
    private $all = 'Select * from sia_';


    /*--------Query General -------------------*/
    public function Query($sql){
        return $sql;
    }

    /*---------------consultas generales ------------------*/
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

    public function getAllOrder($tabla,$campos,$type){
        $sql=$this->getAll($tabla);
        $orders=$this->buildFields($campos);
        $sql=$sql.' order by '.$orders.' '.$type;
        return $sql;
    }

    public function getFieldsOrder($tabla,$campos,$order,$type){
        $sql=$this->getFields($tabla,$campos);
        $orders=$this->buildFields($campos);
        $sql=$sql.' order by '.$orders.' '.$type;
        return $sql;
    }

/*----------------consultas con where --------------------*/
    public function getAllWhere($tabla,$campos,$logico,$igualador){
        $sql=$this->all.$tabla.' Where ';
        $fields=$this->buildFieldsWhere($campos,$logico,$igualador);
        return $sql.$fields;

    }

    public function getFieldsWhere($tabla,$campos,$camposWhere,$logico,$igualador){
        $sql = 'Select ';
        $fields=$this->buildFields($campos);
        $sql=$sql.$fields.' from sia_'.$tabla. 'Where ';
        $fields=$this->buildFieldsWhere($camposWhere,$logico,$igualador);
        $sql=$sql.$fields;
        return $sql;
    }


    public function getFieldsOrderWhere($tabla,$campos,$camposWhere,$logico,$type,$igualador){
        $sql=$this->getFields($tabla,$campos);
        $orders=$this->buildFields($campos);
        $fields=$this->buildFieldsWhere($camposWhere,$logico,$igualador);
        $sql=$sql.' Where '.$fields;
        $sql=$sql.' order by '.$orders.' '.$type;
        return $sql;
    }


/*------------------consultas con <> ------------------*/






/*------------funciones para obtener los datos -------------------*/

    public function buildFields($campos){
        $cadena='';
        foreach($campos as $key => $valor){
            $cadena=$cadena.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }

    public function buildFieldsWhere($campos,$logico,$igualador){
        $cadena='';
        foreach($campos as $key => $valor){
            $cadena=$cadena.$key.$igualador.':'.$key.' '.$logico.' ';
        }
        $cadena=rtrim($cadena,' ');
        $cadena=rtrim($cadena,$logico);
        return $cadena;

    }

 
}


?>