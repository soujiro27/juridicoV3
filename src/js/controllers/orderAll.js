const obtiene=require('./../models/get')
const tabla =  require ('./tablas.js')

let get = new obtiene()

module.exports=class order extends tabla{


    getDataTableOrder(ruta){
     
        let self=this
        $('i#orderClick').click(function(){
            $('div#panelOrdenamiento').slideDown('slow').css('display','flex')
            self.builFieldsOrder(ruta)
        })
    }

    builFieldsOrder(ruta){
           let headers=$('table th')
           let campos=[]
           for(let x in headers){
               if(headers[x].className!=undefined){
                   campos.push(headers[x].className)
                }
            }
            this.loadingSelectFields(ruta,campos)
           
    }

    loadingSelectFields(ruta,fields){
        let select=''
        for(let x in fields){
            select+=`<option value="${fields[x]}">${fields[x]}</option>`
        }
        $('select#orderField').html(select)
        this.btnOrder(ruta)
        this.btnCancel()
    }

    btnOrder(ruta){
        
        let self=this
        $('button#btnOrder').click(function(){
            let campo=$('select#orderField').val()
            let tipo=$('select#typeOrder').val()
            if(campo!=0 && tipo!=0){
                let data={campo:campo,tipo:tipo}
                get.getTableOrder(ruta,data)
                .then(json=>{
                    $('div#panelOrdenamiento').slideUp()
                    self.renderTable(ruta,json)
                })
                
            }
        })
    }


    btnCancel(){

        $('button#btnCancel').click(function(){
            $('div#panelOrdenamiento').slideUp()
        })
    }


}