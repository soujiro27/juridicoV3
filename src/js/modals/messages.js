const $=require('jquery')
require('jquery-ui')
const confirm=require('jquery-confirm')

module.exports=class Messages{

    empty(){
        $.alert({
            title:'Error',
            content:'No puede haber datos Vacios',
            theme:'light'
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