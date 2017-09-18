<?php  


class Catalogos{
    private $modulos=[
        'Volantes',
        'Documentos',
        'tiposDocumentos',
        'areas',
        'auditorias'
    ];
    private $catalogos=[
        'Caracteres',
        'Acciones',
        'SubTiposDocumentos',
        'DoctosTextos'
    ];

    private $changeName=[
        'prueba de cambio de nombre'
    ];


    public function catalogo(){
        return $this->catalogos;
    }
    public function modulo(){
        return $this->modulos;
    }
    public function completos(){
        $juridico=array_merge($this->catalogos,$this->modulos);
        return $juridico;
    }
}



?>