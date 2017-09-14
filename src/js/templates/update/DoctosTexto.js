module.exports=class DoctosTextos{
    
        render(documento,SubTiposDocumentos,datos){
            let estatus=this.getEstatus(datos)
            let select=this.cargaComboDocumento(documento,datos)
            let sub=this.cargaComboSubDocumento(SubTiposDocumentos,datos) 
            var el=`
            <form method="POST" class="form-inline" id="DoctosTextos">
                <div class="form-group idDocumento">
                    <label for="idDocumento">Tipo de Documento</label>
                    <input type="hidden" id="tipo"  name="tipo"  value="JURIDICO"  />
                    <input type="hidden" id="nombre"  name="nombre"  value="TEXTO-JURIDICO"  />
                    <select name="idTipoDocto" id="idDocumento" required="required" class="form-control">
                        <option value=""> Seleccione una Opción </option>
                        ${select}
                    </select>
                </div>
         
                <div class="form-group subDocumento">
                    <label for="subDocumento">Tipo de SubDocumento</label>
                    <select name="idSubTipoDocumento" id="subDocumento" required="required" class="form-control" >
                        <option value=""> Seleccione una Opción </option>
                            ${sub}
                    </select>
                </div>
                <div class="form-group texto">
                    <label for="texto">Texto</label>
                    <textarea class="form-control" rows="3" name="texto" required placeholder="texto" id="updateTexto">${datos[0].texto}</textarea>
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

        cargaComboDocumento(combo,data)
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

        
        cargaComboSubDocumento(combo,data)
        {
            let opt=''
            combo.map(function(json){
    
                if(data[0].idSubTipoDocumento==json.idSubTipoDocumento){
                    opt+=`<option value="${json.idSubTipoDocumento}" selected >${json.nombre}</option>`     
                }
                else{
                    opt+=`<option value="${json.idSubTipoDocumento}" >${json.nombre}</option>`
                }
                
            }) 
           return opt
        }
    
    
    }