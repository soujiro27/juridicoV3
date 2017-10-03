const $=require('jquery')
module.exports=class cedulaIrac{
    inicio(data,idVolante,subtipo,puestos){
        
        if(data.Error=='Registro No Encontrado'){
            let sub=subtipo["0"].idSubTipoDocumento
            let check=this.generaCheckPuestos(puestos)
            let template=this.nuevaCedula(idVolante,sub,check)
            return template
        }else{
                let check=this.checkUpdate(data,puestos)
                let template=this.updateCedula(data,check)
                return template
        }
    }

    nuevaCedula(idVolante,sub,check){
        let el=`<div class="contentIrac" id="DocumentosSiglas" >
        <form method="POST" class="form-inline" id="DocumentosSiglas">
        
        
        <div class="form-group siglas">
            <label for="siglas">Siglas</label>
            <input type="text"  id="siglas" name="siglas" required class="form-control"   >
            <input type="hidden"  name="idSubTipoDocumento" id="idSubTipoDocumento" value="${sub}"  >
            <input type="hidden"  name="idVolante" value="${idVolante}"  >
        </div>
        
        <div class="form-group firmas">
        <label for="firmas">Personal que Firma</label>
            ${check}
        </div>
        
        
        <div class="form-group fecha">
            <label for="fecha">Fecha Documento</label>
            <input type="text" id="fOficio" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))">
        </div>
        
            
        <div class="form-group numFolio">
        <label for="numFolio">Numero Folio</label>
        <input type="text"  id="numFolio" name="numFolio" required class="form-control"   >
    </div>

        <div class="form-group send">
            <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
            <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
        </div>
        
        
        </form>
        </div>`
        return el
    }

    updateCedula(data,check){
        let el=`<div class="contentIrac" id="DocumentosSiglas" >
        <form method="POST" class="form-inline" id="DocumentosSiglas">
        
        
        <div class="form-group siglas">
            <label for="siglas">Siglas</label>
            <input type="text"  id="siglas" name="siglas" required class="form-control" value="${data["0"].siglas}"  >
           
        </div>
        
        <div class="form-group firmas">
        <label for="firmas">Personal que Firma</label>
            ${check}
        </div>
        
        
        <div class="form-group fecha">
            <label for="fecha">Fecha Documento</label>
            <input type="text" id="fOficio" name="fOficio" required class="form-control fechaInput" pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" value="${data["0"].fOficio}">
        </div>
        
            
        <div class="form-group numFolio">
        <label for="numFolio">Numero de Documento </label>
        <input type="text"  id="numFolio" name="numFolio" required class="form-control"  value="${data["0"].numFolio}" >
        
    </div>

        <div class="form-group send">
            <input type="submit" class="btn btn-primary btn-sm" value="Guardar">
            <button class="btn btn-default btn-sm" id="cancelar">Cancelar</button>
        </div>
        
        
        </form>
        </div>`
        //<input type="hidden"  name="idDocumentoSiglas" id="idDocumentoSiglas" value="${data["0"].idDocumentoSiglas}"  >
        
        return el
    }

    generaCheckPuestos(puestos){
        //console.log(puestos)
        let check=''
       for(let x in puestos){
        check+=`
        <label><input name="firma" type="checkbox" value="${puestos[x].idPuestoJuridico}">${puestos[x].paterno} ${puestos[x].materno} ${puestos[x].nombre}</label>`
       }
       return check
    }

    checkUpdate(data,puestos){
        let puestosJuridico=data["0"].idPuestosJuridico
        let res= puestosJuridico.split(',')
        let arreglo=res.pop()
        let check=''
        /*for(let x in puestos){
         check+=`
         <label><input name="firma" type="checkbox" value="${puestos[x].idPuestoJuridico}">${puestos[x].paterno} ${puestos[x].materno} ${puestos[x].nombre}</label>`
        }*/

        for(let x in puestos){
            for(let z in res){
                console.log(`comparo ${puestos[x].idPuestoJuridico} con => ${res[z]}`)  
                if(puestos[x].idPuestoJuridico==res[z]){
                    check+=`<label><input name="firma" type="checkbox" value="${puestos[x].idPuestoJuridico}" checked >${puestos[x].paterno} ${puestos[x].materno} ${puestos[x].nombre}</label>`
                    let test=res.shift()
                    break
                }
                else{
                    check+=`<label><input name="firma" type="checkbox" value="${puestos[x].idPuestoJuridico}"  >${puestos[x].paterno} ${puestos[x].materno} ${puestos[x].nombre}</label>`                    
                }
        }
        
    }
    return check
    }
}