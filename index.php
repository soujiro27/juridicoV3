
<?php  require "vendor/autoload.php";

include_once 'juridico/rutas.php';
$rutas= new Rutas();

include_once $rutas->controllers('urls.php');
include_once $rutas->controllers('tablas.php');
include_once $rutas->controllers('tablasORder.php');
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

$app->get('/tableOrder/:modulo',function($modulo) use ($app){
    $url= new urls();
    $modulo=$url->urlsTablas($modulo);
    $controller = new TablasOrder($modulo,$app->request->get());
});


/*------------------------ Carga los modulos de insercion --------------*/

$app->post('/insert/:modulo',function($modulo) use ($app){
    $controller = new Insert();
    $url= new urls();
    $modulo=$url->urlsTablas($modulo);
    $controller->selectInsert($modulo,$app->request->post());
});

/*--------------obtiene un registro -------------------*/

$app->get('/getRegister/:modulo',function($modulo) use ($app){
    $url= new urls();
    $controller= new GetController();
    $modulo=$url->urlsTablas($modulo);
    $controller->getRegisterController($modulo,$app->request->get());


});


$app->get('/getLastRegister/:modulo',function($modulo) use ($app){
    $url= new urls();
    $controller= new GetController();
    $modulo=$url->urlsTablas($modulo);
    $controller->getMaxQuery($modulo,$app->request->get());
});

$app->get('/getDataNotification',function() use ($app){
    $controller= new GetController();
    $controller->getNotificationData($app->request->get());


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
        $controller= new GetController();
        $controller->getRegisterControllerAuditoriaById($id);
});


/*---- obtiene las areas a las que se les asigno irac confronta ifa -------- */
$app->get('/getAreaVolante/',function() use ($app){
    $controller= new GetController();
    $controller->getAreasVolantes($app->request->get());
});


/*----------------upload de archivos -----------------------*/

$app->post('/juridico/insert/uploadFile',function() use ($app){
 
    $controller = new Insert();
    $numDoc=$app->request->post();
    $numDoc=$numDoc['numDocumento'];
   
    $res=$controller->isFileExist('Volantes',$numDoc);
        $file=$_FILES['anexoDoc']['name'];
		$nombre=str_replace('/','-',$numDoc);
        $file=explode('.',$file);
        $nameComplete=$nombre.'.'.$file[1];
		if ($file && move_uploaded_file($_FILES['anexoDoc']['tmp_name'],"./juridico/files/".$nombre.'.'.$file[1])){
            $controllerUpdate= new UpdateController();
            $datos=array('anexoDoc'=>$nameComplete,'idVolante'=>$res);
         
            $controllerUpdate->updateFile('Volantes',$datos);
        }
  
});

$app->post('/juridico/insertAll/uploadFile',function() use ($app){
    
       $controller = new Insert();
       $numDoc=$app->request->post();
       $numDoc=$numDoc['numDocumento'];
      
       $res=$controller->isFileExistAll('Volantes',$numDoc);
           $file=$_FILES['anexoDoc']['name'];
           $nombre=str_replace('/','-',$numDoc);
           $file=explode('.',$file);
           $nameComplete=$nombre.'.'.$file[1];
           if ($file && move_uploaded_file($_FILES['anexoDoc']['tmp_name'],"./juridico/files/".$nombre.'.'.$file[1])){
               $controllerUpdate= new UpdateController();
               $datos=array('anexoDoc'=>$nameComplete,'idVolante'=>$res);
            
               $controllerUpdate->updateFile('Volantes',$datos);
           }
     
   });



?>