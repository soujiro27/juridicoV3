const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')
const controllerUpdate=require('./../controllers/update')

const updateController=new controllerUpdate()

let getModel=new models()
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
                        let datos=$('form#'+ruta).serialize()+'&'+campo+'='+id


                    }
                }
            }
        })
    }
}