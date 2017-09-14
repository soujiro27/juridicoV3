const page =require('page')
const $=require('jquery')
const insertController=require('./../controllers/insert')

let insert= new insertController();

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
    const template=require('./../templates/insert/Acciones.html')
    $('div#main-content').slideUp('fast')
    setTimeout(function(){
        $('div#main-content').html(template).slideDown('slow')
        let datosForm=insert.getDataForm(ruta,false)
        insert.btnCancelar(ruta)
    },300)
    

})