/**
 * 超链接 支持任意协议
 * @youloge 协议全部通过 open.youloge.com/link?target=UUID 中转
 * @since 2023-11-10 04:46:02 
 */

/**
 * 插入超链接
 * ```javascript
 * editor.execCommand( 'link', '{
 *     url:'ueditor.baidu.com',
 *     title:'ueditor',
 *     target:'_blank'
 * }' );
 * ```
 */
/**
 * 返回当前选中的第一个超链接节点
 * ```javascript
 * editor.queryCommandValue( 'link' );
 * ```
 */

/**
 * 取消超链接
 * ```javascript
 * editor.execCommand( 'unlink');
 * ```
 */

UE.plugins['link'] = function(){
    var me = this;
    function optimize( range ) {
        var start = range.startContainer,end = range.endContainer;
        if ( start = domUtils.findParentByTagName( start, 'a', true ) ) {
            range.setStartBefore( start );
        }
        if ( end = domUtils.findParentByTagName( end, 'a', true ) ) {
            range.setEndAfter( end );
        }
    }
    UE.commands['unlink'] = {
        execCommand : function() {
            var range = this.selection.getRange(),bookmark;
            if(range.collapsed && !domUtils.findParentByTagName( range.startContainer, 'a', true )){
                return;
            }
            bookmark = range.createBookmark();
            optimize( range );
            range.removeInlineStyle( 'a' ).moveToBookmark( bookmark ).select();
        },
        queryCommandState : function(){
            return !this.highlight && this.queryCommandValue('link') ?  0 : -1;
        }
    };
    function doLink(range,opt,me){
        var rngClone = range.cloneRange(),link = me.queryCommandValue('link');
        optimize( range = range.adjustmentBoundary() );
        var start = range.startContainer;
        if(start.nodeType == 1 && link){
            start = start.childNodes[range.startOffset];
            if(start && start.nodeType == 1 && start.tagName == 'A' && /^(?:https?|ftp|file)\s*:\s*\/\//.test(start.textContent)){
                start.textContent =  utils.html(opt.textValue||opt.title);
            }
        }
        if( !rngClone.collapsed || link){
            range.removeInlineStyle( 'a' );
            rngClone = range.cloneRange();
        }
        if ( rngClone.collapsed ) {
            var a = range.document.createElement( 'a'),text = '';
            if(opt.textValue){
                text =   utils.html(opt.textValue);
                delete opt.textValue;
            }else{
                text =  utils.html(opt.title);
            }
            domUtils.setAttributes( a, opt );
            start =  domUtils.findParentByTagName( rngClone.startContainer, 'a', true );
            if(start && domUtils.isInNodeEndBoundary(rngClone,start)){
                range.setStartAfter(start).collapse(true);
            }
            a.textContent= text;
            range.insertNode(a).selectNode( a );
        } else {
            range.applyInlineStyle( 'a', opt );
        }
    }
    UE.commands['link'] = {
        execCommand : function( cmdName, opt ) {
            let LINKURL = me.getOpt('LINKURL');
            // alert(JSON.stringify(opt))
            if(opt.href.startsWith(LINKURL)){
                opt.target = "_blank"
                doLink(range=this.selection.getRange(),opt,this);
                //闭合都不加占位符，如果加了会在a后边多个占位符节点，导致a是图片背景组成的列表，出现空白问题
                range.collapse().select(true);
            }
        },
        queryCommandValue : function() {
            var range = this.selection.getRange(),
                node;
            if ( range.collapsed ) {
//                    node = this.selection.getStart();
                //在ie下getstart()取值偏上了
                node = range.startContainer;
                node = node.nodeType == 1 ? node : node.parentNode;
                if ( node && (node = domUtils.findParentByTagName( node, 'a', true )) && ! domUtils.isInNodeEndBoundary(range,node)) {
                    return node;
                }
            } else {
                //trace:1111  如果是<p><a>xx</a></p> startContainer是p就会找不到a
                range.shrinkBoundary();
                var start = range.startContainer.nodeType  == 3 || !range.startContainer.childNodes[range.startOffset] ? range.startContainer : range.startContainer.childNodes[range.startOffset],
                    end =  range.endContainer.nodeType == 3 || range.endOffset == 0 ? range.endContainer : range.endContainer.childNodes[range.endOffset-1],
                    common = range.getCommonAncestor();
                node = domUtils.findParentByTagName( common, 'a', true );
                if ( !node && common.nodeType == 1){
                    var as = common.getElementsByTagName( 'a' ),ps,pe;
                    for ( var i = 0,ci; ci = as[i++]; ) {
                        ps = domUtils.getPosition( ci, start ),pe = domUtils.getPosition( ci,end);
                        if ( (ps & domUtils.POSITION_FOLLOWING || ps & domUtils.POSITION_CONTAINS)
                            &&
                            (pe & domUtils.POSITION_PRECEDING || pe & domUtils.POSITION_CONTAINS)
                            ) {
                            node = ci;
                            break;
                        } 
                    }
                }
                return node;
            }

        },
        queryCommandState : function() {
            //判断如果是视频的话连接不可用
            //fix 853
            var img = this.selection.getRange().getClosedNode(),
                flag = img && (img.className == "edui-faked-video" || img.className.indexOf("edui-upload-video")!=-1);
            return flag ? -1 : 0;
        }
    };
};