/**
 * @description
 * 简单上传:点击按钮,直接选择文件上传
 * @youloge 自行组装表单 简化代码
 * @expire 根据有效期 加载上传URL
 */
UE.plugin.register('simpleupload', function (){
    var me = this,isLoaded = false,containerBtn;
    // 
    function initUploadBtn(){
        /* 加载上传URL */
        if (!me.getOpt('IMGURL')) {
            let genRequest = me.genRequest('material','inserted',{},true);
            fetch(...genRequest).then(r=>r.json()).then(({err,msg,data})=>{
                console.info(me.ui);
                err == 200 ? me.setOpt('IMGURL',data) : me.ui.fireEvent('showmessage',{
                    content : msg,
                    timeout : 2000
                });
                // ;
            }).catch(err=>{
                console.info(err);
                me.fireEvent('showmessage',{
                    content : `图片素材接口网络错误`,
                    timeout : 2000
                });
            })
            editor.execCommand('message','sss')
        }
        var label = document.createElement('label');label.setAttribute('for', 'simpleFile');
        var input = document.createElement('input');input.id = "simpleFile";input.setAttribute('type', 'file');input.setAttribute('accept', 'image/*');
        label.style.cssText = `position:absolute;top:0;left:0;width: 100%; height: 100%; bottom: 0; right: 0; z-index: 1;`;
        input.style.cssText = `display:none;`;
        // loadingclass
        input.onchange = function(e){
            let [file] = e.target.files;
            console.error(file);
            let loadingId = `loading_${Math.random().toString(36)}`;
            let src = URL.createObjectURL(file)
            me.focus();
            me.execCommand('inserthtml', `<img class="loadingclas loading" id="${loadingId}" src="${src}" style="max-width:100%;">`);
            // 上传图片
            let body = new FormData();
            body.append('file', file);
            console.error(me.document.getElementById(loadingId));
            fetch(me.getOpt('IMGURL'),{method:'post',body:body}).then(r=>r.json()).then(({err,msg,data})=>{
                let loader = me.document.getElementById(loadingId);
                loader.setAttribute('src', data.src);
                loader.removeAttribute('id');
                loader.removeAttribute('class');
                loader.setAttribute('_src', data.src);
                loader.setAttribute('data-uuid', data.uuid);
                loader.setAttribute('data-width', data.w);
                loader.setAttribute('data-height', data.h);
                loader.setAttribute('alt', data.alt || 'alt');
            }).catch(e=>{
                let loader = me.document.getElementById(loadingId);
                loader.remove();
            }).finally(()=>{
                URL.revokeObjectURL(src);
            })
        }
        label.appendChild(input);containerBtn.appendChild(label);
    }

    return {
        bindEvents:{
            'ready': function() {
                //设置loading的样式
                utils.cssRule('loading',
                    '.loadingclasss{display:inline-block;cursor:default;background: url(\''
                    + this.options.themePath
                    + this.options.theme +'/images/loading.gif\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;}\n' +
                    '.loaderrorclass{display:inline-block;cursor:default;background: url(\''
                    + this.options.themePath
                    + this.options.theme +'/images/loaderror.png\') no-repeat center center transparent;border:1px solid #cccccc;margin-right:1px;height: 22px;width: 22px;' +
                    '}',
                    this.document);
            },
            /* 初始化简单上传按钮 */
            'simpleuploadbtnready': function(type, container) {
                containerBtn = container;
                me.afterConfigReady(initUploadBtn);
            }
        },
        outputRule: function(root){
            utils.each(root.getNodesByTagName('img'),function(n){
                if (/\b(loaderrorclass)|(loading)\b/.test(n.getAttr('class'))) {
                    n.parentNode.removeChild(n);
                }
            });
        },
        commands: {
            'simpleupload': {
                queryCommandState: function () {
                    return isLoaded ? 0:-1;
                }
            }
        }
    }
});
