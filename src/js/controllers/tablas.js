const $=require('jquery')
const page=require('page');
const getter= require('./../models/get')
const get = new getter()

const table = require ('./../templates/table')


module.exports=class Tablas {
    constructor (ruta) {
        let self=this
        let res = get.getTable(ruta)
        res.then(json=>{
            template= new table();
            render=template.renderTabla(ruta,json)
            $('div#main-content').html(render)
            self.getIdTr(ruta)
    })
  }

  getIdTr(ruta)
  {
    $('table.principal tbody tr').click(function(){
        let id=$(this).children().first().data('valor')
        let campo=$(this).children().first().attr('id')
        page.redirect('/juridico/'+ruta+'/update/'+campo+'/'+id)
        
    })
  }


}
