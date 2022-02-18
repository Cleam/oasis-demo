(function(doc, win) {
  var docEl = doc.documentElement;
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  var recalc = function() {
    var clientWidth = docEl.clientWidth;
    var MAX_WIDTH = 1242;
    if (!clientWidth) {
      return;
    }
    if (clientWidth >= MAX_WIDTH) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = 100 * (clientWidth / MAX_WIDTH) + 'px';
    }
    // 解决安卓webview 被调整字体大小后 显示异常问题
    var fontSize = parseFloat(docEl.style.fontSize);
    var finalFontSize = parseFloat(window.getComputedStyle(docEl).getPropertyValue('font-size'));
    if (finalFontSize !== fontSize) {
      docEl.style.fontSize = (fontSize * fontSize) / finalFontSize + 'px';
    }
  };
  recalc();
  if (!doc.addEventListener) {
    return;
  }
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
