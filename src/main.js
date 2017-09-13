require('./main.scss')
require('./js/rutas/add')
require('./js/rutas/update')
const $=require('jquery')
const page=require('page')
const menu = require('./js/menu/menu')
const table=require('./js/controllers/tablas')


$tables= new table(ruta)

menu()


page()
