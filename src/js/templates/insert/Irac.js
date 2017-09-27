const obt=require('./../../models/get')
let get= new obt
module.exports=class{
    render(id,data){
        let header=this.headers(data)
        let body=this.body(data)
        let el=`
            <div class="IracObservacionesContent">
                <h2>Lista de Obervaciones IRAC</h2>
                <table class="table table-striped table-bordered table-hover" id="ObservacionesIrac">
                    <thead>${header}</thead>
                    <tbody>${body}</tbody>
                </table>
                <div class="buttonsIrac">
                    <button class="btn btn-primary">Agregar Obervacion</button>
                    <button class="btn btn-warning">General Cedula</button>
                    <button class="btn btn-danger">Cancelar</button>
                </div>
            </div>
        `
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
            body+=`<tr>`
            $.each(data[x],function(index,el){
                body+=`<td id="${index}">${el}</td>`
            })
            body+=`</tr>`
        }
        return body
    }
}