const $=require('jquery')
const page=require('page');
const getter= require('./../models/get')
const get = new getter()

const table = require ('./../templates/table')


module.exports=class Tablas {
    getDataTable (ruta) {
        let self=this
        let res = get.getTable(ruta)
        res.then(json=>{
            template= new table();
            self.renderTable(ruta,json)
    })
  }


  renderTable(ruta,json){
    render=template.renderTabla(ruta,json)
    $('div#main-content').html(render)
    this.getIdTr(ruta)
    $('a#agregar').show()
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
