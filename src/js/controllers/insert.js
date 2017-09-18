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

    statusInsertRegister(json){
        $.each(json,function(index,el){
            if(index==='Error'){
                confirm.registerDuplicate(el)
            }else if(index==='Success'){
                let drawTable= new table(ruta)
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

    
}