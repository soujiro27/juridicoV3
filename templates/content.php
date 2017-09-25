<?php

function btnAparece($nombre){

	if($nombre!='confrontasJuridico' && $nombre!='Ifa' && $nombre!='Irac'){
		$btn='<a href="/juridico/'.$nombre.'/Add" class="btn btn-primary btn-sm" data-formload="'.$nombre.'" id=agregar>Agregar '.$nombre.'</a>';
		return  $btn;
	}
}




$main='
<div class="row">
	<div class="col-md-9 col-md-offset-2">
		<div class="widget">
			<div class="widget-head">
				<div class="pull-left">Lista de '.$nombre.' registrados <i class="fa fa-search" aria-hidden="true" id="orderClick"></i></div>
				<div class="widget-icons pull-right">
					
              		'.btnAparece($nombre).'		
          		</div>
          		<div class="clearfix"></div>
			</div>
			<div id="panelOrdenamiento">
				<select name="order" id="orderField">
					<option value="0"> Escoga Campo </option>
				</select>
				<select name="typeOrder" id="typeOrder">
					<option value="0"> Ordenar </option>
					<option value="ASC"> Ascedente </option>
					<option value="DESC"> Descendente </option>
				</select>
				<button class="btn" id="btnOrder">Ordenar</button>
			</div>
			<div class="widget-content" id="main-content">
		</div>
	</div>
</div>';
echo $main;
// <button type="button" class="btn btn-primary btn-sm" data-formload="'.$nombre.'" id=agregar>Agregar '.$nombre.'</button>
?>
