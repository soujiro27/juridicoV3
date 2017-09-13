const page =require('page')
const $=require('jquery')
const controller=require('./../controllers/update')
const model=require('./../models/get')
const modals=require('./../modals/update')

const updateController= new controller()
const get = new model()
const modal= new modals()
page('/juridico/:ruta/update/:campo/:id',function(ctx,next){
   let data=updateController.creaObjeto(ctx)
   get.getRegister(ctx.params.ruta,data).then(json=>{
       const getTemplate=require('./../templates/update/Caracteres')
       let template=new getTemplate()
       template=template.render(json)
      modal.modalCatalogo(ctx.params.ruta,template,ctx.params.campo,ctx.params.id)
      
   })
})