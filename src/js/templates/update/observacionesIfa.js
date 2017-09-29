module.exports=class updateObsvIfa{
    render(data){
        let el=`<div class="contentIrac" id="contentIrac" >
        <form method="POST" class="form-inline" id="ObservacionesDoctosJuridico">
    
    
    
    <div class="form-group pagina">
        <label for="pagina">Hoja</label>
        <input type="number"  id="pagina" name="pagina" required class="form-control"  value="${data.pagina}" >
        <input type="hidden"  id="parrafo" name="parrafo" required class="form-control"  value="${data.parrafo}"  >
    </div>
    

    
    <div class="form-group observacion">
        <label for="observacion">Observacion</label>
        <textarea class="form-control" rows="3" name="observacion"  id="observacion" >${data.observacion}</textarea>
        <input type="hidden"  name="cveAuditoria" value="${data.idObservacionDoctoJuridico}"  >
    </div>
     
    
    
    </form>
    </div>`
    return el
    }

}