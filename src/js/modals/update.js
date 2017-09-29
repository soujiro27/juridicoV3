const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')
const controllerUpdate=require('./../controllers/update')
const addIracObvs=require('./../templates/insert/observacionesIrac')
const updateIracObvs=require('./../templates/update/observacionesIrac')
const constrollerInsert=require('./../controllers/insert.js')
const model=require('./../models/get')
const iracCedula=require('./../templates/insert/cedulaIrac')


const updateController=new controllerUpdate()
const addirac=new addIracObvs()
const updateIrac= new updateIracObvs()
const insertController= new constrollerInsert()
const get= new model()
const cedulaIrac=new iracCedula()

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
                             //console.log(json)
                            let el= cedulaIrac.inicio(json[0],idVolante,json[1],json[2])
                            $('div#main-content').html(el)
                            $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
                            insertController.getDataForm('DocumentosSiglas')
                        })

                     })
                         
                    },
                    btnClass:'btn-warning'
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
}