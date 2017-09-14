module.exports=class SubTiposDocumentos{
    render(combo,data){
    let self=this
    let estatus=this.getEstatus(data)
    let select=this.cargaComboSelected(combo,data) 
    var el=`
    <form method="POST" class="form-inline" id="SubTiposDocumentos">
        <div class="form-group idDocumento">
            <label for="idDocumento">Tipo de Documento</label>
            <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
                <option value=""> Seleccione una Opción </option>
                ${select}
            </select>
        </div>
        <div class="form-group nombre">
            <label for="nombre">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="Nombre" required pattern="[A-Za-z].{1,49}" name="nombre" title="Nombre Incorrecto o Caracteres maximos" value="${data[0].nombre}" >
        </div>
 
        <div class="form-group estatus">
            <label for="estatus">Estatus</label>
            <select id="estatus" name="estatus" class="form-control">
                <option value="${estatus.default}">${estatus.default}</option>
                <option value="${estatus.opuesto}">${estatus.opuesto}</option>
            </select>
        </div>
    </form>`
    return el
    }
        
    getEstatus(data){
        let sts=data[0].estatus
        sts=sts.trim()
        if(sts=='ACTIVO'){var opuesto='INACTIVO'}else{var opuesto='ACTIVO'}
        let estatus={
            default:sts,
            opuesto:opuesto
        }
        return estatus
        
    }

    cargaComboSelected(combo,data)
    {
        let opt=''
        combo.map(function(json){

            if(data[0].idTipoDocto==json.idTipoDocto){
                opt+=`<option value="${json.idTipoDocto}" selected >${json.nombre}</option>`     
            }
            else{
                opt+=`<option value="${json.idTipoDocto}" >${json.nombre}</option>`
            }
            
        }) 
       return opt
    }
}