
<?php  require "vendor/autoload.php";

include_once 'juridico/rutas.php';
$rutas= new Rutas();

include_once $rutas->controllers('urls.php');
include_once $rutas->controllers('tablas.php');
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
    $orm = new Consultas();
    $campos = array ('idCaracter' => '3', 'siglas' => 'ACTIVO', 'nombre' => 'irac' );
    $result=$orm->getFieldsOrder($modulo,$campos,$campos);
    
    var_dump($result);

})



?>