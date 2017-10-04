const page =require('page')
const $=require('jquery')
const controller=require('./../controllers/update')
const model=require('./../models/get')
const modals=require('./../modals/update')
const modalInsert=require('./../modals/insert')
const ins=require('./../controllers/insert')


const updateController= new controller()
const get = new model()
const modal= new modals()
const insertModal=new modalInsert()
const insert=new ins()

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
    let idVolante=ctx.params.id
    let data=updateController.creaObjeto(ctx)
    let volante=get.getRegister(ruta,data)
    let caracter=get.getRegister('Caracteres',{estatus:'ACTIVO'})
	let turnado=get.getRegister('areas',{idAreaSuperior:'DGAJ'})
    let accion=get.getRegister('Acciones',{estatus:'ACTIVO'})
    let estatus=get.getRegister('turnosJuridico',{idVolante:idVolante})
    Promise.all([volante,caracter,turnado,accion,estatus])
    .then(json=>{
      
        const getTemplate=require('./../templates/update/Volantes')
        let template=new getTemplate()
        template=template.render(json[0],json[1],json[2],json[3])
        modal.modalPrint(ruta,template,ctx.params.campo,ctx.params.id,json[4])
        
    })
 })


 page('/juridico/Irac/update/:campo/:id',function(ctx,next){
    let idVolante=ctx.params.id
    let observaciones=get.getRegister('ObservacionesDoctosJuridico',{idVolante:idVolante})
    let volantesDoc=get.getRegister('VolantesDocumentos',{idVolante:idVolante})
    let estatus=get.getRegister('turnosJuridico',{idVolante:idVolante})
    Promise.all([observaciones,volantesDoc,estatus])
    .then(json=>{
        
        const getMainTemplate=require('./../templates/insert/Irac')
        let template= new getMainTemplate()
        let el=template.incio(idVolante,json[0])
        modal.iracObservaciones(el,idVolante,json[1]["0"].cveAuditoria,json[1]["0"].idSubTipoDocumento,json[2])
    })
   
})


page('/juridico/confrontasJuridico/update/:campo/:id',function(ctx,next){
    let idVolante=ctx.params.id
   let confronta=get.getRegister('ConfrontasJuridico',{idVolante:idVolante})
   let estatus=get.getRegister('turnosJuridico',{idVolante:idVolante})
   Promise.all([confronta,estatus])
   .then(res=>{
       if(res["0"].Error=='Registro No Encontrado'){
        get.getRegister('VolantesDocumentos',{idVolante:idVolante})
        .then(json=>{
            let sub=json["0"].idSubTipoDocumento
            get.getRegister('SubTiposDocumentos',{idSubTipoDocumento:sub})
            .then(resolve=>{
                let tipo=resolve["0"].idTipoDocto
                let nota=json["0"].notaConfronta
                const conf=require('./../templates/insert/confronta')
                const confronta=new conf()
                let template=confronta.render(idVolante)
                $('div#main-content').html(template)
                $('input.fechaInput').datepicker({ dateFormat: "yy-mm-dd" });
                if(tipo=='OFICIO' && nota=='NO'){
                    $('div.notaInformativa').remove()
                }else if(tipo=='NOTA'){ $('div.notaInformativa').remove()}

                insert.btnCancelar('confrontasJuridico')
                insert.getDataForm('confrontasJuridico',false)
            })
        })
       }
       else{
           
        const conf=require('./../templates/update/confronta')
        const confronta=new conf()
        let template=confronta.render(res[0])
        modal.confronta('confrontasJuridico',template,'idConfrontaJuridico',res[0][0].idConfrontaJuridico,res[0][0].notaInformativa,idVolante,res[1])
       }
   }) 

    
})



page('/juridico/Ifa/update/:campo/:id',function(ctx,next){
    let idVolante=ctx.params.id
    let observaciones=get.getRegister('ObservacionesDoctosJuridico',{idVolante:idVolante})
    let volantesDoc=get.getRegister('VolantesDocumentos',{idVolante:idVolante})
    let estatus=get.getRegister('turnosJuridico',{idVolante:idVolante})
    Promise.all([observaciones,volantesDoc,estatus])
    .then(json=>{
        
        const getMainTemplate=require('./../templates/insert/Irac')
        let template= new getMainTemplate()
        let el=template.incio(idVolante,json[0])
        modal.ifaObservaciones(el,idVolante,json[1]["0"].cveAuditoria,json[1]["0"].idSubTipoDocumento,json[2])
    })
   
})


page('/juridico/Documentos/update/:campo/:id',function(ctx,next){
    let idVolante=ctx.params.id
    get.getRegister('Volantes',{idVolante:idVolante})
    .then(json=>{
        let doc=json["0"].anexoDoc
		window.open("/juridico/files/"+doc)
    })
})


page('/juridico/DocumentosGral/update/:campo/:id',function(ctx,next){
    let idVolante=ctx.params.id
    get.getRegister('Volantes',{idVolante:idVolante})
    .then(json=>{
        let doc=json["0"].anexoDoc
		window.open("/juridico/files/"+doc)
    })
})