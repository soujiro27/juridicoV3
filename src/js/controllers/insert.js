const $=require('jquery')
const validate=require('validator')
const jqueryConfirm=require('./../modals/messages')
const models=require('./../models/get')
const table=require('./tablas')

let confirm=new jqueryConfirm();
let model= new models()
module.exports=class Insert{


    getDataForm(ruta,valida){
        let self=this
        $('form#'+ruta).submit(function(e){
            e.preventDefault()
            let datos=$(this).serializeArray()
            let validacion=self.validaDatosForm(datos,valida)
            if(validacion){
                model.sendDataToInsert(ruta,datos)
                .then(json=>{
                    self.statusInsertRegister(json,ruta)
                })
            }
        })
    }

    validaDatosForm(datos,valida){
        if(valida){
            let cont=0
            datos.map(function(index,el){
                if(validate.isEmpty(index.value)){cont++;}
            })
            if(cont>0){
                confirm.empty()
                return false
            }
        }else{
            return true
        }
    }

    statusInsertRegister(json){
        $.each(json,function(index,el){
            if(index==='Error'){
                confirm.registerDuplicate(el)
            }else if(index==='Success'){
                let drawTable= new table(ruta)
            }
        })
    }

    btnCancelar(ruta){
        let self=this
        $('button#cancelar').click(function(event){
            event.preventDefault()
            location.href='/juridico/'+ruta
        })
    }
    
}