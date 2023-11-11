/*
* @youloge 要区分消息和通知
* 加载：有阻断
* 消息：有后置
* 通知：不阻断
*/
UE.registerUI('message', function(editor) {

    var editorui = baidu.editor.ui;
    var Message = editorui.Message;
    var holder;
    var _messageItems = [];
    var me = editor;

    me.setOpt('enableMessageShow', true);
    console.info('enableMessageShow',me.getOpt('enableMessageShow'))
    if (me.getOpt('enableMessageShow') === false) {
        return;
    }

    me.addListener('ready', function(){
        holder = document.getElementById(me.ui.id + '_message_holder');
        updateHolderPos();
        setTimeout(function(){
            updateHolderPos();
        }, 500);
    });

    me.addListener('showmessage', function(type, opt){
        console.info(type, opt)
        opt = utils.isString(opt) ? { 'content': opt } : opt;
        var message = new Message({
                'timeout': opt.timeout,
                'type': opt.type,
                'content': opt.content,
                'keepshow': opt.keepshow,
                'editor': me
            }),
            mid = opt.id || ('msg_' + (+new Date()).toString(36));
        message.render(holder);
        _messageItems[mid] = message;
        message.reset(opt);
        updateHolderPos();
        return mid;
    });

    me.addListener('updatemessage',function(type, id, opt){
        opt = utils.isString(opt) ? {
            'content': opt
        } : opt;
        var message = _messageItems[id];
        message.render(holder);
        message && message.reset(opt);
    });

    me.addListener('hidemessage',function(type, id){
        var message = _messageItems[id];
        message && message.hide();
    });

    function updateHolderPos(){
        if (!holder || !me.ui) return;
        var toolbarbox = me.ui.getDom('toolbarbox');
        if (toolbarbox) {
            holder.style.top = toolbarbox.offsetHeight + 3 + 'px';
        }
        holder.style.zIndex = Math.max(me.options.zIndex, me.iframe.style.zIndex) + 1;
    }

});
