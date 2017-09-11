const $=require('jquery')
module.exports=class Get {

    getTable(ruta) {
        let get= new Promise((resolve,reject)=>{
            $.get({
                url:'/table/'+ruta,
                success:function(json){
                    resolve(JSON.parse(json))
                }
            })
        })
        return get
    }
}