window.CKEDITOR_BASEPATH = 'node_modules/ckeditor/'
const page =require('page')
const $=require('jquery')
require('ckeditor')
const insertController=require('./../controllers/insert')
const getter= require('./../models/get')

let insert= new insertController()
let get = new getter()

page('/juridico/Caracteres/add',function(ctx,next){
    const template=require('./../templates/insert/caracteres.html')
    $('div#main-content').slideUp('fast')
    setTimeout(function(){
        $('div#main-content').html(template).slideDown('slow')
        let datosForm=insert.getDataForm(ruta,false)
        insert.btnCancelar(ruta)
    },300)
    

})


page('/juridico/Acciones/add',function(ctx,next){


    const template=require('./../templates/insert/Acciones.html')
    $('div#main-content').slideUp('fast')
    setTimeout(function(){
        $('div#main-content').html(template).slideDown('slow')
        let datosForm=insert.getDataForm(ruta,false)
        insert.btnCancelar(ruta)
    },300)
    

})



page('/juridico/SubTiposDocumentos/add',function(ctx,next){
    get.getRegister('tiposDocumentos',{tipo:'JURIDICO'})
    .then(json=>{
        const template=require('./../templates/insert/SubTiposDocumentos')
        let temp=new template()
        let html=temp.render(json)
        $('div#main-content').slideUp('fast')
        setTimeout(function(){
            $('div#main-content').html(html).slideDown('slow')
            let datosForm=insert.getDataForm(ruta,false)
            insert.btnCancelar(ruta)
        },300)
    })

})


page('/juridico/DoctosTextos/add',function(ctx,next){
    let documentos=get.getRegister('tiposDocumentos',{tipo:'JURIDICO'})
    let subDocumentos=get.getRegister('SubTiposDocumentos',{estatus:'ACTIVO'})
    Promise.all([documentos,subDocumentos])
    .then(json=>{
        const template=require('./../templates/insert/DoctosTextos')
        let temp=new template()
        let html=temp.render(json[0],json[1])
        $('div#main-content').slideUp('fast')
        setTimeout(function(){
            $('div#main-content').html(html).slideDown('slow')
            CKEDITOR.disableAutoInline = false;
            if(CKEDITOR.replace('texto')){
                let datosForm=insert.getDataForm(ruta,false)

            }
            insert.btnCancelar(ruta)
        },300)
    })

})


page('/juridico/Volantes/add',function(ctx,next){
    //let caracteres=get.getRegister('Caracteres',{estatus:'ACTIVO'})
    //let turnado=get.getRegister('areas',{adAreaSuperior:'DGAJ'})
    //let acccion= get.getRegister('Acciones',{estatus:'ACTIVO'})
    get.getRegister('tiposDocumentos',{tipo:'JURIDICO'})
    .then(json=>{
        const template=require('./../templates/insert/Volantes')
        let temp=new template()
        let html=temp.render(json)
        $('div#main-content').html(html)
        insert.onChangeDocumento()
        insert.onchangeSubDocumento()
        //let datosForm=insert.getDataForm(ruta,false)
        insert.btnCancelar(ruta)
    })

})