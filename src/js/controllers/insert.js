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
            if(ruta=='DocumentosSiglas'){
                let data=self.puestos(datos)
                datos=data
            }
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
                if(ruta=='Volantes'){
                    self.sendNotificacionInsert('Volantes')
                }
                else if(ruta=='ObservacionesDoctosJuridico' || ruta=='DocumentosSiglas'){
                    ruta=localStorage.getItem("ruta");
                }
                else if(ruta=='Documentos'){
                    self.sendNotificacionVentanilla()
                }
                else if(ruta=='DocumentosGral'){
                    //aqui va de ventanilla al usuario
                }
                let drawTable= new table()
                drawTable.getDataTable(ruta)
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


  

    sendNotificacionInsert(ruta){
        let self=this
        let lastIdVolante
        model.getLastRegister(ruta,{campo:'IdVolante',alias:'volante'})
        .then(json=>{
            lastIdVolante={idVolante:json["0"].volante}
            model.getDataNotification(lastIdVolante).
            then(json=>{
                let mensaje=`Tienes un Nuevo Documento: ${json["0"].nombre} con el Folio:  ${json["0"].folio}`
                this.sendNotificacion(json["0"].idUsuario,mensaje,json["0"].folio,0,ruta)
            })
            
        })
       
        
    }

    sendNotificacionVentanilla(){
        let self=this
        model.getRegister('PuestosJuridico',{recepcion:'SI'})
        .then(json=>{
            let idEmpleado=json["0"].rpe
            model.getRegister('usuarios',{idEmpleado:idEmpleado})
            .then(res=>{
                let mensaje='Tienes Un nuevo Documento Digitalizado'
                self.sendNotificacion(res["0"].idUsuario,mensaje,'0',0,'Documentos')
            })
        })
    }

   
    
    sendNotificacion(userDest,mensaje,id,auditoria,ruta){
		$.get({
            url:'/altanotifica/'+userDest+'|'+mensaje+'|'+id+'|'+auditoria+'|Volantes|idVolante'
		})
		
    }
    
    puestos(data){
        console.log(data)
        let firmas=''
        let datos=[]
        for(let x in data){
           if(data[x].name=='firma'){
               firmas+=`${data[x].value},`
            }else{
                datos.push({name:data[x].name,value:data[x].value})
            }
        }
        datos.push({name:'idPuestosJuridico',value:firmas})        
       return datos
    }
    

    uploadFile(){
		let self=this
		$('form#documentosJur').on('submit',function(e){
			e.preventDefault()
			 var formData = new FormData($(this)[0]);
			    $.ajax({
            url: '/juridico/insert/uploadFile',  
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
               // message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                //showMessage(message)        
            },
          
            success: function(json){
			  let data=JSON.parse(json)
              self.statusInsertRegister(data,'Documentos')
            },
         
            error: function(){
                alert('ocurrio un eror')
            }
        });
		})
	}


    
    
	checkNumeroDocumento(){
        let self=this
            $('input#numDocumento').keyup(function(){
                let valor=$(this).val();
                let idEmpleado=model.getRegister('usuarios',{idUsuario:nUsr})
                .then(empleado=>{
                    let area=empleado["0"].idArea
                    model.getRegister('Volantes',{numDocumento:valor,idTurnado:area})
                    .then(json=>{
                        let id=json["0"].idVolante
                        model.getRegister('turnosJuridico',{idVolante:id})
                        .then(res=>{
                            if(res["0"].estadoProceso=='CERRADO'){
                                let container=$('div.uploadContainer')
                                
                                container.html(`<h3>El Volante esta Cerrado No se pueden añadir Documentos</h3>`)
                                $('input[type=submit]').prop('disabled', true)
                            }else{
                                let container=$('div.uploadContainer')
                                let send=$('div.uploadInput')
                                if(json.Error=='Registro No Encontrado'){
                                    container.html(`<h3>${json.Error}</h3>`)
                                    send.hide()
                                }else{
                                    if(json["0"].anexoDoc==null){
                                        container.html(`<h3>No hay Documentos Asignados</h3>`)
                                        $('input[type=submit]').prop('disabled', false)
                                    }else{
                                        container.html(`<h3>Hay un Documento Asignado <a href="/juridico/files/${json["0"].anexoDoc}" target="_blank"> ${json["0"].anexoDoc}</a></h3>`)
                                        $('input[type=submit]').prop('disabled', false)
                                    }
                                }

                            }
                        })
                     
                    })
                })
                
                
    
            
            })
        }
    

        dataFileUpload(){
            var fileExtension = "";
            $('input[type=file]').change(function(){
               var file = $("#imagen")[0].files[0];
               var fileName = file.name;
               fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
               var fileSize = file.size;
               var fileType = file.type;
           });
       }


       uploadFileAll(){
		let self=this
		$('form#documentosJur').on('submit',function(e){
			e.preventDefault()
			 var formData = new FormData($(this)[0]);
			    $.ajax({
            url: '/juridico/insertAll/uploadFile',  
            type: 'POST',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend: function(){
               // message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                //showMessage(message)        
            },
          
            success: function(json){
			  let data=JSON.parse(json)
              self.statusInsertRegister(data,ruta)
            },
         
            error: function(){
                alert('ocurrio un eror')
            }
        });
		})
    }
    
    checkNumeroDocumentoAll(){
        let self=this
            $('input#numDocumento').keyup(function(){
                let valor=$(this).val();
                let idEmpleado=model.getRegister('usuarios',{idUsuario:nUsr})
                .then(empleado=>{
                    let area=empleado["0"].idArea
                    model.getRegister('Volantes',{numDocumento:valor})
                    .then(json=>{
                        let id=json["0"].idVolante
                        model.getRegister('turnosJuridico',{idVolante:id})
                        .then(res=>{
                            if(res["0"].estadoProceso=='CERRADO'){
                                let container=$('div.uploadContainer')
                                
                                container.html(`<h3>El Volante esta Cerrado No se pueden añadir Documentos</h3>`)
                                $('input[type=submit]').prop('disabled', true)
                            }else{
                                let container=$('div.uploadContainer')
                                let send=$('div.uploadInput')
                                if(json.Error=='Registro No Encontrado'){
                                    container.html(`<h3>${json.Error}</h3>`)
                                    send.hide()
                                }else{
                                    if(json["0"].anexoDoc==null){
                                        container.html(`<h3>No hay Documentos Asignados</h3>`)
                                        $('input[type=submit]').prop('disabled', false)
                                    }else{
                                        container.html(`<h3>Hay un Documento Asignado <a href="/juridico/files/${json["0"].anexoDoc}" target="_blank"> ${json["0"].anexoDoc}</a></h3>`)
                                        $('input[type=submit]').prop('disabled', false)
                                    }
                                }
                            }
                        })
                       
                    })
                })
                
                
    
            
            })
        }
    
}