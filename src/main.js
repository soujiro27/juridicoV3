require('babelify-es6-polyfill')
require('./main.scss')
require('./js/rutas/add')
require('./js/rutas/update')
const $=require('jquery')
const page=require('page')
const menu = require('./js/menu/menu')
const table=require('./js/controllers/tablas')
const order = require('./js/controllers/orderAll')

if(ruta=='foliosVolantes'){

}else{
    let $tables= new table()
    $tables.getDataTable(ruta)
    let $order = new order()
    $order.getDataTableOrder(ruta)
}




menu()
page()
