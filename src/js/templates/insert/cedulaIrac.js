module.exports=class cedulaIrac{
    inicio(data,id,sub){
       if(data.Error=='Registro No Encontrado'){
            this.nuevo(id,sub)
       }else{

       }
    }

    nuevo(id,sub){
        let el=`<div class="contentIrac" id="contentIrac" >
        <form method="POST" class="form-inline" id="DocumentosSiglas">
        
        
        <div class="form-group siglas">
            <label for="siglas">Siglas</label>
            <input type="text"  id="siglas" name="siglas" required class="form-control"   >
            <input type="hidden"  name="idSubTipoDocumento"  value="${sub}"  >
            <input type="hidden"  name="idVolante" value="${id}"  >
        </div>
        
        <div class="form-group firmas">
        <label for="firmas">Personal que Firma</label>
        ${empleados.map(function(json){
            
             return yo `<label><input name="firma" type="checkbox" value="${json.idPuestoJuridico}">${json.paterno} ${json.materno} ${json.nombre} </label>`
             
         })}
        
        </div>
        
        
        <div class="form-group fecha">
            <label for="fecha">Fecha Documento</label>
            <input type="text" id="fOficio" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
        </div>
        
        
        <div class="form-group send">
            <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
            <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
        </div>
        
        
        </form>
        </div>
        `
    }


}