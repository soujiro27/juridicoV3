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

    public function Caracteres(){
        return $this->Caracteres;
    }

    public function Acciones(){
        return $this->Acciones;
    }

    public function SubTiposDocumentos(){
        return $this->SubTiposDocumentos;
    }


}


?>