const page =require('page')
const $=require('jquery')
const controller=require('./../controllers/update')
const model=require('./../models/get')
const modals=require('./../modals/update')

const updateController= new controller()
const get = new model()
const modal= new modals()

page('/juridico/Caracteres/update/:campo/:id',function(ctx,next){
   let data=updateController.creaObjeto(ctx)
   get.getRegister(ruta,data).then(json=>{
       const getTemplate=require('./../templates/update/Caracteres')
       let template=new getTemplate()
       template=template.render(json)
      modal.modalCatalogo(ruta,template,ctx.params.campo,ctx.params.id)
      
   })
})


page('/juridico/Acciones/update/:campo/:id',function(ctx,next){
    let data=updateController.creaObjeto(ctx)
    get.getRegister(ruta,data).then(json=>{
        const getTemplate=require('./../templates/update/Acciones')
        let template=new getTemplate()
        template=template.render(json)
       modal.modalCatalogo(ruta,template,ctx.params.campo,ctx.params.id)
       
    })
 })


 
page('/juridico/SubTiposDocumentos/update/:campo/:id',function(ctx,next){
    let data=updateController.creaObjeto(ctx)
    let combo=get.getRegister('tiposDocumentos',{tipo:'JURIDICO'})
    let datos=get.getRegister(ruta,data)
    Promise.all([combo,datos])
    .then(json=>{
        const getTemplate=require('./../templates/update/SubTiposDocumentos')
        let template=new getTemplate()
        template=template.render(json[0],json[1])
        modal.modalCatalogo(ruta,template,ctx.params.campo,ctx.params.id)
       
    })
 })


 page('/juridico/DoctosTextos/update/:campo/:id',function(ctx,next){
    let data=updateController.creaObjeto(ctx)
    let documentos=get.getRegister('tiposDocumentos',{tipo:'JURIDICO'})
    let subDocumentos=get.getRegister('SubTiposDocumentos',{estatus:'ACTIVO'})
    let datos=get.getRegister(ruta,data)
    Promise.all([documentos,subDocumentos,datos])
    .then(json=>{
        const getTemplate=require('./../templates/update/DoctosTexto')
        let template=new getTemplate()
        template=template.render(json[0],json[1],json[2])
        modal.modalCatalogoCkeEditor(ruta,template,ctx.params.campo,ctx.params.id)
       
    })
 })


 page('/juridico/Volantes/update/:campo/:id',function(ctx,next){
    let data=updateController.creaObjeto(ctx)
    let volante=get.getRegister(ruta,data)
    let caracter=get.getRegister('catCaracteres',{estatus:'ACTIVO'})
	let turnado=get.getRegister('areas',{idAreaSuperior:'DGAJ'})
	let accion=get.getRegister('catAcciones',{estatus:'ACTIVO'})
    Promise.all([volante,caracter,turnado,accion])
    .then(json=>{
        const getTemplate=require('./../templates/update/Volantes')
        let template=new getTemplate()
        template=template.render(json[0],json[1],json[2],json[3])
        modal.modalCatalogoCkeEditor(ruta,template,ctx.params.campo,ctx.params.id)
       
    })
 })