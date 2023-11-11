/*
* @youloge 自执行函数 改成`Youloge.rpc`
* 等待清理函数 utils.isCrossDomainUrl
*/
(function(){
	UE.Editor.prototype.loadServerConfig = function(){
			var me = this;
			var genRequest = me.genRequest('editor','config',{},true);
			me._serverConfigLoaded = false;
			fetch(...genRequest).then(r=>r.json()).then(({err,msg,data})=>{
				err == 200 ? (
					utils.extend(me.options, data),
					me.fireEvent('serverConfigLoaded'),
					me._serverConfigLoaded = true
				) : showErrorMsg("me.getLang('loadconfigFormatError')");
			}).catch(e=>{
				showErrorMsg(me.getLang('loadconfigHttpError'));
				showErrorMsg(me.getLang('loadconfigError'));
			})
			function showErrorMsg(msg) {
				me.fireEvent('showMessage', {
					'title': msg,
					'type': 'error'
				});
			}
	};
	UE.Editor.prototype.isServerConfigLoaded = function(){
			var me = this;
			return me._serverConfigLoaded || false;
	};
	UE.Editor.prototype.afterConfigReady = function(handler){
			if (!handler || !utils.isFunction(handler)) return;
			var me = this;
			var readyHandler = function(){
					handler.apply(me, arguments);
					me.removeListener('serverConfigLoaded', readyHandler);
			};
			if (me.isServerConfigLoaded()) {
					handler.call(me, 'serverConfigLoaded');
			} else {
					me.addListener('serverConfigLoaded', readyHandler);
			}
	};
})();
