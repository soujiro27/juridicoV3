const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')
const controllerUpdate=require('./../controllers/update')
const addIracObvs=require('./../templates/insert/observacionesIrac')
const addIfaObvs=require('./../templates/insert/observacionesIfa')
const updateIracObvs=require('./../templates/update/observacionesIrac')
const updateIfaObvs=require('./../templates/update/observacionesIfa')
const constrollerInsert=require('./../controllers/insert.js')
const model=require('./../models/get')
const iracCedula=require('./../templates/insert/cedulaIrac')
const ifaCedula=require('./../templates/insert/cedulaIfa')



const updateController=new controllerUpdate()
const addirac=new addIracObvs()
const addifa=new addIfaObvs()
const updateIrac= new updateIracObvs()
const updateIfa= new updateIfaObvs()
const insertController= new constrollerInsert()
const get= new model()
const cedulaIrac=new iracCedula()
const cedulaIfa=new ifaCedula()

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
            },
            
        })
    }

    iracObservaciones(template,idVolante,cveAuditoria,idSubDoc){
        let self=this
        let complete=$.confirm({
            title:'Obervaciones Irac',
            content:template,
            theme:'light',
            buttons:{
                confirm:{
                    text :'Agregar Observacion',
                    action:function(){
                        let el=addirac.render(idVolante,cveAuditoria,idSubDoc)
                        $('div#main-content').html(el)
                        insertController.btnCancelar(ruta)
                        CKEDITOR.disableAutoInline = true;
                        let editor=CKEDITOR.inline('observacion');
                        editor.on('change',function(e){
                            $('textarea#observacion').text(editor.getData())
                        })
                        insertController.getDataForm('ObservacionesDoctosJuridico')
                    },
                    btnClass:'btn-primary'
                },
                cancel:{
                    text:'Cancelar',
                    btnClass:'btn-danger',

                },
                somethingElse:{
                    text:'Generar Cedula',
                    btnClass:'btn-warning',
                    action:function(){
                     get.getRegister('Volantes',{idVolante:idVolante})
                     .then(json=>{
                         let area=json[0].idTurnado
                         let docSiglas=get.getRegister('DocumentosSiglas',{idVolante:idVolante})
                         let subTipo=get.getRegister('VolantesDocumentos',{idVolante:idVolante})
                         let puestos=get.getRegister('PuestosJuridico',{idArea:area,titular:'NO'})
                         Promise.all([docSiglas,subTipo,puestos])
                         .then(json=>{
                           
                            let el= cedulaIrac.inicio(json[0],idVolante,json[1],json[2])
                            $('div#main-content').html(el)
                            $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
                            if(json[0].Error=='Registro No Encontrado'){
                               
                                insertController.getDataForm('DocumentosSiglas')
                            }else{
                                
                                updateController.getDataFormSiglas('DocumentosSiglas',false,'idDocumentoSiglas',json["0"]["0"].idDocumentoSiglas)
                            }
                            insertController.btnCancelar('Irac')
                        })

                     })
                         
                    },
                    btnClass:'btn-warning'
                },
                print:{
                    text:'Imprimir Cedula',
                    btnClass:'btn-warning',
                    action:function(){
                        get.getRegister('DocumentosSiglas',{idVolante:idVolante})
                        .then(json=>{
                            if(json.Error=='Registro No Encontrado'){
                               self.msgError('Genere La Cedula Primero')
                            }else{
                                window.open('/juridico/reportes/IRAC.php'+'?param1='+idVolante)
                            }
                        })
                    }
                }
            },
            onContentReady:function(){
                
                $('table#ObservacionesIrac tbody tr').click(function(){
                    let id=$(this).data('id')
                    get.getRegister('ObservacionesDoctosJuridico',{idObservacionDoctoJuridico:id})
                    .then(json=>{
                        let el=updateIrac.render(json[0])
                        self.updateiracObservaciones(el,id)
                        complete.close()
                        insertController.btnCancelar(ruta)
                    })

                })
            }
        })
    }

    updateiracObservaciones(template,id){
        $.confirm({
            title:'Actualizar Registro',
            theme:'material',
            content:template,
            buttons:{
                formSubmit:{
                    text:'Actualizar',
                    btnClass:'btn-blue',
                    action:function(e){
                        updateController.getDataForm('ObservacionesDoctosJuridico','idObservacionDoctoJuridico',id)
                    }
                },
                cancel:{
                    text:'Cancelar',
                    btnClass:'btn-danger',
                }
            },
            onContentReady:function(){
                CKEDITOR.disableAutoInline = true;
                let editor=CKEDITOR.inline('observacion');
                editor.on('change',function(e){
                    $('textarea#observacion').text(editor.getData())
                })
            },
            draggable: true
        })
    }


    msgError(msg){
        $.alert({
            title:'Error',
            content:msg,
            theme:'light'
        })
    }

    confronta(ruta,template,campo,id,nota,idVolante){
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
                },
                print:{
                    text:'Imprimir Cedula',
                    btnClass:'btn-warning',
                    action:function(){
                        window.open('/juridico/reportes/Confronta.php'+'?param1='+idVolante)
                    }
                }
            },
            onOpenBefore:function(){
                $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
                if(nota===null){
                    $('div.notaInformativa').remove()
                }
            }
        })
    }

    ifaObservaciones(template,idVolante,cveAuditoria,idSubDoc){
        let self=this
        let complete=$.confirm({
            title:'Obervaciones Ifa',
            content:template,
            theme:'light',
            buttons:{
                confirm:{
                    text :'Agregar Observacion',
                    action:function(){
                        let el=addifa.render(idVolante,cveAuditoria,idSubDoc)
                        $('div#main-content').html(el)
                        insertController.btnCancelar(ruta)
                        CKEDITOR.disableAutoInline = true;
                        let editor=CKEDITOR.inline('observacion');
                        editor.on('change',function(e){
                            $('textarea#observacion').text(editor.getData())
                        })
                        insertController.getDataForm('ObservacionesDoctosJuridico')
                    },
                    btnClass:'btn-primary'
                },
                cancel:{
                    text:'Cancelar',
                    btnClass:'btn-danger',

                },
                somethingElse:{
                    text:'Generar Cedula',
                    btnClass:'btn-warning',
                    action:function(){
                     get.getRegister('Volantes',{idVolante:idVolante})
                     .then(json=>{
                         let area=json[0].idTurnado
                         let docSiglas=get.getRegister('DocumentosSiglas',{idVolante:idVolante})
                         let subTipo=get.getRegister('VolantesDocumentos',{idVolante:idVolante})
                         let puestos=get.getRegister('PuestosJuridico',{idArea:area,titular:'NO'})
                         Promise.all([docSiglas,subTipo,puestos])
                         .then(json=>{
                           
                            let el= cedulaIfa.inicio(json[0],idVolante,json[1],json[2])
                            $('div#main-content').html(el)
                            $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
                            $('button#addPromoAccion').click(function(){
                               self.textosPromocion()
                            })
                            if(json[0].Error=='Registro No Encontrado'){
                               
                                insertController.getDataForm('DocumentosSiglas')
                            }else{
                                let idDocumentoTexto=json["0"]["0"].idDocumentoTexto
                                get.getRegister('DoctosTextos',{idDocumentoTexto:idDocumentoTexto})
                                .then(res=>{
                                    $('textarea#textoIfa').text(res["0"].texto)
                                    updateController.getDataFormSiglas('DocumentosSiglas',false,'idDocumentoSiglas',json["0"]["0"].idDocumentoSiglas)

                                })
                            }
                            insertController.btnCancelar('Ifa')
                        })

                     })
                         
                    },
                    btnClass:'btn-warning'
                },
                print:{
                    text:'Imprimir Cedula',
                    btnClass:'btn-warning',
                    action:function(){
                        get.getRegister('DocumentosSiglas',{idVolante:idVolante})
                        .then(json=>{
                            if(json.Error=='Registro No Encontrado'){
                               self.msgError('Genere La Cedula Primero')
                            }else{
                                window.open('/juridico/reportes/IRAC.php'+'?param1='+idVolante)
                            }
                        })
                    }
                }
            },
            onContentReady:function(){
                
                $('table#ObservacionesIrac tbody tr').click(function(){
                    let id=$(this).data('id')
                    get.getRegister('ObservacionesDoctosJuridico',{idObservacionDoctoJuridico:id})
                    .then(json=>{
                        let el=updateIfa.render(json[0])
                        self.updateIfaObservaciones(el,id)
                        complete.close()
                        insertController.btnCancelar(ruta)
                    })

                })
            }
        })
    }


    updateIfaObservaciones(template,id){
        $.confirm({
            title:'Actualizar Registro',
            theme:'material',
            content:template,
            buttons:{
                formSubmit:{
                    text:'Actualizar',
                    btnClass:'btn-blue',
                    action:function(e){
                        updateController.getDataForm('ObservacionesDoctosJuridico','idObservacionDoctoJuridico',id)
                    }
                },
                cancel:{
                    text:'Cancelar',
                    btnClass:'btn-danger',
                }
            },
            onContentReady:function(){
                CKEDITOR.disableAutoInline = true;
                let editor=CKEDITOR.inline('observacion');
                editor.on('change',function(e){
                    $('textarea#observacion').text(editor.getData())
                })
            },
            draggable: true
        })
    }

    textosPromocion(){
       
            const template=require('./../templates/insert/textoPromocion.html')
           
            $.confirm({
                title:'Actualizar Registro',
                theme:'material',
                content:template,
                buttons:{
                    formSubmit:{
                        text:'Aceptar',
                        btnClass:'btn-blue',
                    },
                    cancel:{
                        text:'Cancelar',
                        btnClass:'btn-danger',
                    }
                },
                onOpenBefore:function(){
                    let body=''
                    get.getRegister('DoctosTextos',{idTipoDocto:'OFICIO',tipo:'JURIDICO'})
                    .then(json=>{
                        for(let x in json){
                            body+=`<tr data-id="${json[x].idDocumentoTexto}"><td>${json[x].texto}</td></tr> `
                        }
                        $('table.DoctosTextos tbody').html(body)
                        $('table.DoctosTextos tbody tr').click(function(){
                            let id = $(this).data('id')
                            let texto=$(this).children().text()
                            $('input#idDocumentoTexto').val(id)
                            $('textarea#textoIfa').text(texto)
                        })  
                    })
                }
            })
    
    }
}