module.exports=class addIracObservaciones{
    render(idVolante,sub,cve){
        let el=`

        <div class="contentIrac" id="contentIrac" >
        <form method="POST" class="form-inline" id="ObservacionesDoctosJuridico">
    
    
    
    <div class="form-group pagina">
        <label for="pagina">Hoja</label>
        <input type="text"  id="pagina" name="pagina" required class="form-control"   >
        <input type="hidden"  name="idVolante" value="${idVolante}"  >
        <input type="hidden"  name="idSubTipoDocumento" value="${sub}" >
        <input type="hidden"  name="cveAuditoria" value="${cve}"  >
    </div>
    
    
    <div class="form-group parrafo">
    <label for="parrafo">Parrafo</label>
    <input type="text"  id="parrafo" name="parrafo" required class="form-control"   >
    </div>
    
    <div class="form-group observacion">
        <label for="observacion">Observacion</label>
        <textarea class="form-control" rows="3" name="observacion"  id="observacion" ></textarea>
    </div>
    
    
    
    
    
    
    <div class="form-group send">
        <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
        <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
    </div>
    
    
    </form>
    </div>`;

    return el
    }

}