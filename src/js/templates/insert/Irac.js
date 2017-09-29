const obt=require('./../../models/get')
let get= new obt
module.exports=class{
    incio(id,data){
      
        if(data.Error=='Registro No Encontrado'){
            let empty=this.vacio()
            return empty
        }else{
            let template=this.render(id,data)
            return template
        }
    }
    render(id,data){
        let header=this.headers(data)
        let body=this.body(data)
        let el=`
                <table class="table table-striped table-bordered table-hover" id="ObservacionesIrac">
                    <thead>${header}</thead>
                    <tbody>${body}</tbody>
                </table> `
        return el
        
    }
    headers(data){
        let headers=`<tr>`
            $.each(data[0],function(index,el){
                headers+=`<th id="${index}">${index}</th>`
            })
              headers+=`</tr>`
        return headers
    }

    body(data){
        let body=''
        for(let x in data){
            body+=`<tr data-id="${data[x].idObservacionDoctoJuridico}">`
            $.each(data[x],function(index,el){
                body+=`<td id="${index}">${el}</td>`
            })
            body+=`</tr>`
        }
        return body
    }

    vacio(){
        let el=`  <table class="table table-striped table-bordered table-hover" id="ObservacionesIrac">
        <thead><tr><th>No hay Obervaciones</th></thead></table>`
        return el
    }
}