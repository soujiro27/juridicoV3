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

}


?>