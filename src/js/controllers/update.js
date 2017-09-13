const $=require('jquery')

module.exports=class UpdateController{
    
    creaObjeto(ctx){
		let campo=ctx.params.campo
		let id=ctx.params.id
		let data={}
		data[campo]=id
		return data
    }
    
    
}