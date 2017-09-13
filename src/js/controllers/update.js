const $=require('jquery')
const model=require('./../models/get')
const jqueryConfirm=require('./../modals/messages')
const drawTable= require('./tablas')
const validate=require('validator')
const get = new model();
let confirm=new jqueryConfirm();

module.exports=class UpdateController{
    
    creaObjeto(ctx){
		let campo=ctx.params.campo
		let id=ctx.params.id
		let data={}
		data[campo]=id
		return data
    }

    getDataForm(ruta,campo,id){
        let self=this
        let datosArray=$('form#'+ruta).serializeArray()
        let valida=this.validaDatos(datosArray)
        if(valida){
            let datos=$('form#'+ruta).serialize()+'&'+campo+'='+id
            get.sendDataToUpdate(ruta,datos).then(json=>{
                self.statusInsertRegister(json)
                //let tabla= new drawTable(ruta)
            })
        }
    }

    validaDatos(datos){
        let cont=0
        datos.map(function(index,el){
            if(validate.isEmpty(index.value)){cont++;}
        })
        if(cont>0){
            confirm.empty()
            return false
        }else{
            return true
        }
    }

    statusInsertRegister(json){
        $.each(json,function(index,el){
            if(index==='Error'){
                confirm.registerDuplicate(el)
            }
        })
    }


    

}