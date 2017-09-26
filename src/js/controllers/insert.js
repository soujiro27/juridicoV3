const $=require('jquery')
const validate=require('validator')
const jqueryConfirm=require('./../modals/messages')
const models=require('./../models/get')
const table=require('./tablas')
const confirmInsert=require('./../modals/insert')

let confirm=new jqueryConfirm()
let model= new models()
let modalInsert= new confirmInsert()

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

    statusInsertRegister(json,ruta){
        let self=this
        $.each(json,function(index,el){
            if(index==='Error'){
                confirm.registerDuplicate(el)
            }else if(index==='Success'){
                /*if(ruta=='Volantes'){
                    

                }*/
                let drawTable= new table()
                //camdrawTable.renderTable(ruta)
            }
        })
    }

    statusQuery(json){
        let exit
        $.each(json,function(index,el){
            if(index==='Error'){
                 exit=false
            }else{
                exit= true
            }
        })
        return exit
    }

    btnCancelar(ruta){
        let self=this
        $('button#cancelar').click(function(event){
            event.preventDefault()
            location.href='/juridico/'+ruta
        })
    }
    

    onChangeDocumento(){
        let self=this
        $('select#idDocumento').change(function(){
            let id=$(this).val()
            model.getRegister('SubTiposDocumentos',{idTipoDocto:id,estatus:'ACTIVO'})
            .then(json=>{
               if(self.statusQuery(json)){
                   let opt=require('./../templates/insert/createOption')
                   let option= new opt()
                   let template=option.render(json)
                   $('select#subDocumento').html(template)
               }else{
                $('select#subDocumento').html('<option value=""> No hay Registros </option>')
               }
            })
        })
        
        
    }




    onchangeSubDocumento(){
        $('select#subDocumento').change(function(){
            let documento=$('select#idDocumento option:selected').val()
            let subDocumento=$(this).val();
            let nombre=model.getRegister('SubTiposDocumentos',{idSubTipoDocumento:subDocumento})
            .then(json=>{
                let name=json[0].nombre
               if(documento==='OFICIO' && name==='CONFRONTA'){
                   modalInsert.confronta()
               }
            })
        

        })
    }

    chooseAuditoria(){
        $('button#modalAuditoria').click(function(e){
            e.preventDefault()
            let template=require('./../templates/insert/Auditorias.html')
            modalInsert.auditoria(template)
           
        })
    }

    getLastRegister(ruta,datos){
        let last
        model.getLastRegister(ruta,datos)
        .then(json=>{
            last=json[0].volante
        })
        return last
    }

    getUserVentanilla(ruta){
        let user
        model.getRegister(ruta,{recepcion:'SI'}).
        then(json=>{
            let rp=json.rpe
            model.getRegister('usuarios',{idEmpleado:'rp'}).
            then(res=>{
                user=res.idUsuario
            })
        })
        return user
    }

    getUserDest(ruta){
        let idVolante=this.getLastRegister(ruta,{campo:'IdVolante',alias:'volante'})
        console.log(idVolante)
        model.getRegister('volantes',{idVolante:idVolante}).
        then(json=>{
            console.log(json)
        })
    }
    
    sendNotificacion(userDest,mensaje,auditoria,id){
		$.get({
			url:'/altanotifica/'+userDest+'|'+mensaje+'|'+id+'|'+auditoria+'|Volantes|idVolante'
		})
		//self.sendNotificacion(id,'Tienes un Nuevo Documento','0','0')
	}
    

    
}