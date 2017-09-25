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

    getTableOrder(ruta,campos){
        let get= new Promise((resolve,reject)=>{
            $.get({
                url:'/tableOrder/'+ruta,
                data:campos,
                success:function(json){
                    resolve(JSON.parse(json))
                }
            })
        })

        return get
    }

    sendDataToInsert(ruta,datos){
        let insert=new Promise((resolve,reject)=>{
            $.post({
                url:'/insert/'+ruta,
                data:datos,
                success:function(json){
                    let res=JSON.parse(json)
                    resolve(res)
                }
            })
        })
        return insert
    }

    getRegister(ruta,datos){
        let register= new Promise((resolve,reject)=>{
            $.get({
                url:'/getRegister/'+ruta,
                data:datos,
                success:function(json){
                    let res=JSON.parse(json)
                    resolve(res)
                }
            })
        })
        return register
    }

    sendDataToUpdate(ruta,datos){
        let insert=new Promise((resolve,reject)=>{
            $.post({
                url:'/update/'+ruta,
                data:datos,
                success:function(json){
                    let res=JSON.parse(json)
                    resolve(res)
                }
            })
        })
        return insert
    }

    getAuditoriaById(id){
        let insert= new Promise((resolve,rejec)=>{
            $.get({
                url:'/auditorias/'+id,
                success:function(json){
                    let res=JSON.parse(json)
                    resolve(res)
                }
            })
        })
        return insert
    }
}