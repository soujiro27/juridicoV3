const $=require('jquery')
const getter= require('./../models/get')
const get = new getter()

const table = require ('./../templates/table')


module.exports=class Tablas {
    constructor (ruta) {
        let res = get.getTable(ruta)
        res.then(json=>{
            template= new table();
            render=template.renderTabla(ruta,json)
            console.log(render)
            $('div#main-content').html(render)
    })
  }
}
