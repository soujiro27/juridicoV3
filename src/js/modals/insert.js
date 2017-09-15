const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')

module.exports=class InsertModals{

    confronta(){
        $.confirm({
            title:'Confronta Nota Informativa',
            content:'¿ Se incluye NOTA INFORMATIVA ? ',
            theme:'light',
            buttons:{
                confirm:{
                    text :'SI',
                    action:function(){
                        $('input#notaConfronta').val('SI')
                    }
                },
                somethingElse:{
                    text:'NO',
                    action:function(){
                        $('input#notaConfronta').val('NO')
                    }
                }
            }
        })
    }

    registerDuplicate(msg){
        $.alert({
            title:'Error',
            content:msg,
            theme:'light'
        })
    }
}