
<?php  require "vendor/autoload.php";

include_once 'juridico/rutas.php';
$rutas= new Rutas();

include_once $rutas->controllers('urls.php');
include_once $rutas->controllers('tablas.php');
include_once $rutas->controllers('insert.php');
include_once $rutas->controllers('get.php');
include_once $rutas->controllers('update.php');
include_once $rutas->Orm('consultas.php');



/*---------------Hace el render de la pagina principal -------------------*/
$app->get('/juridico/:modulo',function($modulo) use ($app){
    $url= new urls();
    if($url->validaModulo($modulo)){
       $app->render('./juridico/templates/main.php',array('nombre' => $modulo));
    }else{
        $app->redirect('/dashboard');
    }
});


/*---------------carga la tabla principal -------------------------*/
$app->get('/table/:modulo',function($modulo) use ($app){
    $url= new urls();
    $modulo=$url->urlsTablas($modulo);
    $controller = new Tablas($modulo);
});


/*------------------------ Carga los modulos de insercion --------------*/

$app->post('/insert/:modulo',function($modulo) use ($app){
    $controller = new Insert();
    $url= new urls();
    $modulo=$url->urlsTablas($modulo);
    $controller->insertCatalogo($modulo,$app->request->post());
});

/*--------------obtiene un registro -------------------*/

$app->get('/getRegister/:modulo',function($modulo) use ($app){
    $url= new urls();
    $controller= new GetController();
    $modulo=$url->urlsTablas($modulo);
    $controller->getRegisterController($modulo,$app->request->get());


});


/*---------------------carga los modulos del update ----------------------*/
$app->post('/update/:modulo',function($modulo) use ($app){
  $controller= new UpdateController();
  $url= new urls();
  $modulo=$url->urlsTablas($modulo);
  $controller->updateCatalogo($modulo,$app->request->post());

});


/*-------------------obitene una auditoria por id -------------------------*/

$app->get('/auditorias/:id',function($id) use ($app){
        //something goes here 
});


?>