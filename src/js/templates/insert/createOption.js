module.exports=class Option{
    render(data){
        let el=`
        <option value=""> Seleccione una Opción </option>
        ${data.map(function(json){
            return `<option value="${json.idSubTipoDocumento}" >${json.nombre} </option>`
        })}
        `
        return el
    }
}