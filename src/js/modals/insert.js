const $=require('jquery')
require('jquery-ui')
require('ckeditor')
const confirm=require('jquery-confirm')
const models=require('./../models/get')
const addIrac=require('./../templates/insert/addObervacionIrac')
const cedulaIrac=require('./../templates/insert/cedulaIrac')



let get=new models()
let template=new addIrac()
let iracCedula= new cedulaIrac()

module.exports=class InsertModals{

    confronta(){
        $.confirm({
            title:'Confronta Nota Informativa',
            content:'¿ Se incluye NOTA INFORMATIVA ? ',
            theme:'light',
            buttons:{
                confirm:{
                    text :'SI',
                    action:function(){
                        $('input#notaConfronta').val('SI')
                    },
                    btnClass:'btn-primary'
                },
                somethingElse:{
                    text:'NO',
                    action:function(){
                        $('input#notaConfronta').val('NO')
                    },
                    btnClass:'btn-danger'
                }
            }
        })
    }

    auditoria(template){
        let self=this
        let idAuditoria
        let clave
        let idArea
        $.confirm({
            title:'Seleccione Auditoria',
            content:template,
            theme:'light',
            onOpenBefore:function(){
                $('select#ctaPublica').change(function(){
                    let year=$(this).val()
                    $('span#year').text('/'+year)
                 })
                $('input#auditoria').keyup(function(){
                    let titulo=$('span#titulo').text()
                    let numero=$(this).val()
                    let year= $('span#year').text()
                    clave=titulo+numero+year
                    get.getRegister('auditorias',{clave:clave})
                    .then(response=>{
                        idAuditoria=response["0"].idAuditoria
                        idArea=response["0"].idArea
                        return idAuditoria
                    })
                    .then(idAuditoria=>{
                       get.getAuditoriaById(idAuditoria)
                       .then(json=>{
                            let template=require('./../templates/insert/datosAuditoria.html')
                            $('div#datosAuditoria').html(template)
                           let data=self.separaDatosAuditoria(json[0].rubros)
                            $('tr td#rubros').html(data)
                            $('tr td#sujeto').html(json[0].sujeto)
                            $('tr td#tipo').html(json[0].tipo)
                       })
                       .then(json=>{
                           let irac=get.getAreaVolantesAsignados(idAuditoria,'IRAC')
                           let confronta=get.getAreaVolantesAsignados(idAuditoria,'CONFRONTA')
                           let ifa = get.getAreaVolantesAsignados(idAuditoria,'IFA')
                           Promise.all([irac,confronta,ifa])
                           .then(json=>{
                               let campos=[]
                               for(let x in json){
                                   if(json[x].length>0){
                                       campos.push(json[x]["0"].idTurnado)
                                    }else{
                                        campos.push('NO ASIGNADO')
                                    }
                                }
                            console.log(campos)
                              let template=require('./../templates/insert/areasVolantes.html')
                              $('div#datosTurnado').html(template)
                              $('tr td#irac').html(campos[0])
                              $('tr td#confronta').html(campos[1])
                              $('tr td#ifa').html(campos[2])
                           })
                       })
                    })
                })
            },
            buttons:{
                confirm:{
                    text:'Seleccionar',
                    action:function(){
                        $('p#textoCveAuditoria').text(clave)
                        $('input#cveAuditoria').val(idAuditoria)
                        $('input#idRemitente').val(idArea)
                    }
                },
                cancel:{
                    text:'Cancelar'
                }
            }
        })
    }

    iracObservaciones(content,id,sub,cve,cedula){
        let self=this
        $.confirm({
            title:'Observaciones Irac',
            content:content,
            theme:'light',
            buttons:{
                confirm:{
                    text :'Agregar',
                    action:function(){
                        let el=template.render(id,sub,cve)
                        $('div#main-content').html(el)
                        self.btnCancelar('Irac')
                        let insertController=require('./../controllers/insert')
                        let insert= new insertController()
                        CKEDITOR.disableAutoInline = true;
                        let editor=CKEDITOR.inline('observacion');
                        editor.on('change',function(e){
                            $('textarea#observacion').text(editor.getData())
                        })
                        insert.getDataForm('ObservacionesDoctosJuridico')
                    },
                    btnClass:'btn-primary'
                },
                cancel:{
                    text:'Cancelar'
                },
                somethingElse:{
                    text:'General Cedula',
                    action:function(){
                       iracCedula.inicio(cedula,id,sub)
                    },
                    btnClass:'btn-danger'
                }
            }
        })
    }


    separaDatosAuditoria(datos){
        let arreglo=datos.split(',')
        let p=''
        for(let x in arreglo){
            p+=`<p>${arreglo[x]}</p>`
        }
        return p
    }

    btnCancelar(ruta){
       
        $('button#cancelar').click(function(event){
            event.preventDefault()
            location.href='/juridico/'+ruta
        })
    }
    
}