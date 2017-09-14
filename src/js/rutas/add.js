const page =require('page')
const $=require('jquery')
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