const $=require('jquery')
const model=require('./../models/get')
const jqueryConfirm=require('./../modals/messages')
const table=require('./tablas')
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
                self.statusInsertRegister(json,ruta,id)
                
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

    statusInsertRegister(json,ruta,id){
        let self=this
        $.each(json,function(index,el){
            if(index==='Error'){
                confirm.registerDuplicate(el)
            }else if(index==='Success'){
                if(ruta=='Volantes'){
                    self.sendNotificacionUpdate(ruta,id)
                }
                let drawTable= new table()
                drawTable.getDataTable(ruta)
            }
        })
    }


    sendNotificacionUpdate(ruta,id){
        let self=this
        let lastIdVolante
        lastIdVolante={idVolante:id}
        get.getDataNotification(lastIdVolante).
        then(json=>{
            let mensaje=`Tienes un Nuevo Documento: ${json["0"].nombre} con el Folio:  ${json["0"].folio}`
            this.sendNotificacion(json["0"].idUsuario,mensaje,json["0"].folio,0,ruta)
        })
            
    
       
        
    }

   
    
    sendNotificacion(userDest,mensaje,id,auditoria,ruta){
		$.get({
            url:'/altanotifica/'+userDest+'|'+mensaje+'|'+id+'|'+auditoria+'|Volantes|idVolante'
		})
		
	}

    

}