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

/*----------------consultas con and, or = <> --------------------*/
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


/*------------------Genera Query de insert ------------------*/

    public function insertQuery($tabla,$datos){
        $campos=$this->buildFields($datos);
        $queryVal=$this->buildPdoValuesQueryInsert($datos);
        $sql='INSERT INTO sia_'.$tabla.'('.$campos.',usrAlta,fAlta) Values ('.$queryVal.',:usrAlta,getdate())';
        return $sql;
    }


/*----------- Genera Query de update ----------------*/

    public function updateQuery($tabla,$datos,$datosWhere){
        $campos=$this->buildValuesQueryUpdate($datos);
        $where=$this->buildFieldsWhere($datosWhere,'AND','=');
        $sql='UPDATE sia_'.$tabla.' SET '.$campos.', usrModificacion=:usrModificacion,fModificacion=getdate() WHERE '.$where;
        return $sql;
    }


    public function getAuditoriaById($id){
        $cuenta=$_SESSION["idCuentaActual"];
        $sql="SELECT a.idAuditoria auditoria,ta.nombre tipo, COALESCE(convert(varchar(20),a.clave),convert(varchar(20),a.idAuditoria)) claveAuditoria,
        dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, a.idArea, a.rubros, subDoc.nombre, v.idTurnado
        FROM sia_programas p
        INNER JOIN sia_auditorias a on p.idCuenta=a.idCuenta and p.idPrograma=a.idPrograma
        INNER JOIN sia_areas ar on a.idArea=ar.idArea
        left join sia_VolantesDocumentos vd on a.idAuditoria=vd.cveAuditoria
        left join sia_catSubTiposDocumentos subDoc on vd.idSubTipoDocumento=subDoc.idSubTipoDocumento
        left join sia_Volantes v on vd.idVolante=v.idVolante
        LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria= ta.idTipoAuditoria
        WHERE a.idCuenta='$cuenta' and a.idAuditoria='$id' GROUP BY 
        a.idAuditoria, a.clave,ta.nombre,a.idProceso,a.idEtapa,ar.nombre, a.idArea, a.rubros, subDoc.nombre, v.idTurnado";
        return $sql;
    }


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

    public function buildPdoValuesQueryInsert($campos){
        $cadena='';
        foreach ($campos as $key => $value) {
            $cadena=$cadena.':'.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }

    public function buildArrayPdo($datos){
        $arreglo=array();
        foreach ($datos as $key => $value) {
            $arreglo[':'.$key]=$value;
        }
        return $arreglo;
    }

    public function buildValuesQueryUpdate($campos){
        $cadena='';
        foreach ($campos as $key => $value) {
            $cadena=$cadena.$key.'=:'.$key.',';
        }
        $cadena=rtrim($cadena,',');
        return $cadena;
    }

 
}


?>