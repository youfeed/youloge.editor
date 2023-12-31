/*
* 触发草稿保存 article
* 即上传草稿到服务器
*/
UE.registerUI('autosave', function(editor) {
    var timer = null,uid = null;
    editor.on('afterautosave',function(){
        clearTimeout(timer);

        timer = setTimeout(function(){
            if(uid){
                editor.trigger('hidemessage',uid);
            }
            uid = editor.trigger('showmessage',{
                content : editor.getLang('autosave.success'),
                timeout : 2000
            });

        },2000)
    })

});
