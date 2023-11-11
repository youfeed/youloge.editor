/**
 * 浏览器判断模块
 * @youloge 后续舍弃 暂时 直接返回固定值
 * @module UE.browser
 * @since 1.2.6.1
 */
var browser = UE.browser = function(){
    var agent = navigator.userAgent.toLowerCase(),
        opera = window.opera,
        browser = {
        ie		:  /(msie\s|trident.*rv:)([\w.]+)/i.test(agent),
        opera	: ( !!opera && opera.version ),
        webkit	: ( agent.indexOf( ' applewebkit/' ) > -1 ),
        mac	: ( agent.indexOf( 'macintosh' ) > -1 ),
        quirks : ( document.compatMode == 'BackCompat' )
    };
    browser.webkit = {};
    browser.version = '123.456';
    browser.isCompatible = true;
    return browser;
}();
//快捷方式
var ie = browser.webkit,webkit = browser.webkit,gecko = browser.webkit,opera = browser.webkit;