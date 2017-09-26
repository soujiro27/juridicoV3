const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')
const controllerUpdate=require('./../controllers/update')

const updateController=new controllerUpdate()


module.exports=class UpdateModals{

    modalCatalogo(ruta,template,campo,id){
        let self=this
        $.confirm({
            title:'Actualizar Registro',
            theme:'material',
            content:template,
            buttons:{
                formSubmit:{
                    text:'Actualizar',
                    btnClass:'btn-blue',
                    action:function(e){
                       updateController.getDataForm(ruta,campo,id)


                    }
                },
                cancel:{
                    text:'Cancelar',
                    btnClass:'btn-danger',
                }
            }
        })
    }

    modalCatalogoCkeEditor(ruta,template,campo,id){
        let self=this
        $.confirm({
            title:'Actualizar Registro',
            theme:'material',
            content:template,
            onOpenBefore:function(){
                try{
                    CKEDITOR.disableAutoInline = true;
                    let editor=CKEDITOR.inline('updateTexto');
                    editor.on('change',function(e){
                        $('textarea#updateTexto').text(editor.getData())
                    })
                }catch(err){
                    console.log(err)
                }
            },
            buttons:{
                formSubmit:{
                    text:'Actualizar',
                    btnClass:'btn-blue',
                    action:function(e){
                       updateController.getDataForm(ruta,campo,id)


                    }
                },
                cancel:{
                    text:'Cancelar'
                }
            }
        })
    }


    modalPrint(ruta,template,campo,id){
        let self=this
        let titulo = 'Actualizar '+ruta
        $.confirm({
            title:titulo,
            theme:'material',
            content:template,
            onOpenBefore:function(){
                /*try{
                    CKEDITOR.disableAutoInline = true;
                    let editor=CKEDITOR.inline('updateTexto');
                    editor.on('change',function(e){
                        $('textarea#updateTexto').text(editor.getData())
                    })
                }catch(err){
                    console.log(err)
                }*/
            },
            buttons:{
                formSubmit:{
                    text:'Actualizar',
                    btnClass:'btn-blue',
                    action:function(e){
                       updateController.getDataForm(ruta,campo,id)


                    }
                },
                cancel:{
                    text:'Cancelar'
                },
                print:{
                    text:'Imprimir',
                    btnClass:'btn-warning',
                    action:function(e){
                        window.open('/juridico/reportes/Volantes.php'+'?param1='+id)
                    }
                }
            }
        })
    }
}