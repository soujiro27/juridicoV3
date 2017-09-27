<?php 



class CatTablas{
    private $Caracteres=array(
        'idCaracter' => 0,
        'siglas' => 0,
        'nombre' => 0,
        'estatus' => 0
    );

    private $Acciones=array(
        'idAccion'=>0,
        'nombre'=>0,
        'estatus'=>0

    );

    private $SubTiposDocumentos=array(
        'idSubTipoDocumento'=>0,
        'idTipoDocto'=>0,
        'nombre'=>0,
        'estatus'=>0
    );


    private $DoctosTextos="select cdt.idDocumentoTexto, 
    cdt.texto,
    std.idTipoDocto,std.nombre,cdt.estatus
    from sia_CatDoctosTextos cdt
    inner join sia_catSubTiposDocumentos std on cdt.idSubTipoDocumento=std.idSubTipoDocumento";
    
    
    private $volantes='select v.idVolante, v.folio, v.subfolio, v.numDocumento, v.idRemitente, v.idTurnado, v.fRecepcion,  v.extemporaneo, 
    a.clave,
    sub.nombre as documento,
    t.estadoProceso,
    v.estatus
    from sia_VolantesDocumentos vd
    inner join sia_Volantes v on vd.idVolante=v.idVolante
    inner join sia_turnosJuridico t on v.idVolante=t.idVolante
    inner join sia_auditorias a on vd.cveAuditoria=a.idAuditoria
    inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento';


    public function Caracteres(){
        return $this->Caracteres;
    }

    public function Acciones(){
        return $this->Acciones;
    }

    public function SubTiposDocumentos(){
        return $this->SubTiposDocumentos;
    }

    public function DoctosTexto(){
        return $this->DoctosTextos;
    }

    public function volantes(){
        return $this->volantes;
    }

   
    public function irac(){
        $irac="select v.idVolante,v.folio,v.numDocumento, v.fRecepcion, v.idRemitente, v.asunto, v.estatus, t.estadoProceso from sia_Volantes v
        inner join sia_VolantesDocumentos vd on v.idVolante=vd.idVolante
        inner join sia_catSubTiposDocumentos sub on vd.idSubTipoDocumento=sub.idSubTipoDocumento
        inner join sia_turnosJuridico t on v.idVolante=t.idVolante
        where sub.nombre='IRAC' and v.idTurnado=
        (select nombreCorto from sia_areas where idAreaSuperior='DGAJ' and idEmpleadoTitular=
        (select idEmpleado from sia_usuarios where idUsuario='".$_SESSION ['idUsuario']."'))";
        return $irac;
    }

}


?>