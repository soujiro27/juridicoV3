module.exports=class Caracteres{


    render(data){
        let self=this
        let estatus=this.getEstatus(data)
        var el=`
        <form method="POST" class="form-inline" id="Caracteres">
            <div class="form-group siglas">
                <label for="siglas">Siglas</label>
                <input type="text" class="form-control" id="siglas" placeholder="siglas" required  name="siglas" title="Inserta un Caracter" value="${data[0].siglas}">
            </div>
            <div class="form-group nombre">
                <label for="nombre">Nombre</label>
                <input type="text" class="form-control" id="nombre" placeholder="Nombre" required pattern="[A-Za-z].{1,10}" name="nombre" title="Nombre Incorrecto o Caracteres maximos" value="${data[0].nombre}">
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
        if(data[0].estatus=='ACTIVO'){var opuesto='INACTIVO'}else{var opuesto='ACTIVO'}
        let estatus={
            default:data[0].estatus,
            opuesto:opuesto
        }
        return estatus
        
    }
}