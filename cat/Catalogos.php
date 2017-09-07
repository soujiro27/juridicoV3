<?php  


class Catalogos{
    private $modulos=[
        'Volantes',
        'Documentos'
    ];
    private $catalogos=[
        'Caracteres',
        'Acciones',
        'SubTiposDocumentos',
        'DoctosTextos'
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