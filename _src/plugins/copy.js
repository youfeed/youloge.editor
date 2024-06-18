/**
 * 使用浏览器默认复制 
 * 
 */
UE.plugin.register('copy', function () {
    var me = this;
    function initClipboard() {

        var client = {
            'copy': function (e) {
                
            },
            'mouseover': function (e) {
                
            },
            'mouseout': function (e) {
                
            }
        };

        // 复制内容
        // client.on('copy', function (e) {
        //     var client = e.client,
        //         rng = me.selection.getRange(),
        //         div = document.createElement('div');

        //     div.appendChild(rng.cloneContents());
        //     client.setText(div.innerText || div.textContent);
        //     client.setHtml(div.innerHTML);
        //     rng.select();
        // });
        // hover事件传递到target
        // client.on('mouseover mouseout', function (e) {
        //     var target = e.target;
        //     if (target) {
        //         if (e.type == 'mouseover') {
        //             domUtils.addClass(target, 'edui-state-hover');
        //         } else if (e.type == 'mouseout') {
        //             domUtils.removeClasses(target, 'edui-state-hover');
        //         }
        //     }
        // });
        // 触发事件
        me.fireEvent('zeroclipboardready', client);
    }

    return {
        bindEvents: {
            'ready': function () {
                initClipboard();
            }
        },
        commands: {
            'copy': {
                execCommand: function (cmd) {
                    if (!me.document.execCommand('copy')) {
                        alert(me.getLang('copymsg'));
                    }
                }
            }
        }
    }
});
