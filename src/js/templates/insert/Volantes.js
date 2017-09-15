module.exports=class{
    render(documentos){
        let el=`
        <form method="POST" class="form-inline" id="Volantes">
        
        <div class="headerVolante">
        
        <div class="form-group idDocumento">
            <label for="idDocumento">Tipo de Documento</label>
            <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
            <option value=""> Seleccione una Opción </option>
                ${ documentos.map(function(json){
                    return `<option value="${json.idTipoDocto}" >${json.nombre} </option>`
                }) }
           </select>
        </div>
        
        <div class="form-group subDocumento">
            <label for="subDocumento">Tipo de SubDocumento</label>
            <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
              <option value=""> Seleccione una Opción </option>
            </select>
            <input type="hidden" value="NO" name="notaConfronta" id="notaConfronta" />
        </div>

        
        
        <div class="form-group Promocion">
            <label for="subDocumento">Promocion de Accion</label>
            <select name="promocion" id="promocion" required="required" class="form-control">
             <option value=""> Seleccione una Opción </option>
              <option value="SI"> SI</option>
               <option value="NO"> NO </option>
            </select>
        </div>
        
        
        
        <div class="form-group cveAuditoria">
            <label for="cveAuditoria">Clave de Auditoria</label>
            <select name="cveAuditoria" id="cveAuditoria" required="required" class="form-control">
                <option value=""> Seleccione una Opción </option>
              
            </select>
        </div>
        
        <div class="form-group extemporaneo">
            <label for="extemporaneo">Extemporáneo</label>
            <select name="extemporaneo" id="extemporaneo" required="required" class="form-control">
                <option value=""> Seleccione una Opción </option>
                <option value="SI"> SI</option>
                <option value="NO"> NO </option>
            </select>
        </div>
        
        
        
        </div>
        </form>
        `
return el
    }
}