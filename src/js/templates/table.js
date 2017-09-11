const $=require('jquery')
module.exports = class tabla{
    renderTabla(ruta,data){
       return this.createTable(ruta,data)
    }

    headers(data){
        let th=''
        $.each(data[0], function(index, el){
            th+=`<th id="${index}" class="${index}" data-order="${index}">${index}</th>`
        })
        return th
    }

    body(data){
        let tr=''
        for(let x in data){
            tr+=`<tr>`;
            $.each(data[x],function(index,el){
                tr+= `<td id="${index}"  data-valor="${el}"> ${el} </td>`;
           })
           tr+=`</tr>`
        }
        return tr;
    }

    createTable(ruta,data){
        let el =`<table class="table table-striped table-bordered table-hover principal" id="${ruta}">`
        el+=`<thead>${this.headers(data)}</thead>`
        el+=`<tbody>${this.body(data)}</tbody>`
        el+=`</table>`
       
        return el
    }

}