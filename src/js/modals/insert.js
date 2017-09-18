const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')
const models=require('./../models/get')

let get=new models()


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

    separaDatosAuditoria(datos){
        let arreglo=datos.split(',')
        let p=''
        for(let x in arreglo){
            p+=`<p>${arreglo[x]}</p>`
        }
        return p
    }
    
}