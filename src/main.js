require('./main.scss')
require('./js/rutas/add')
const $=require('jquery')
const page=require('page')
const menu = require('./js/menu/menu')
const table=require('./js/controllers/tablas')

$tables= new table(ruta)

menu()


page()
