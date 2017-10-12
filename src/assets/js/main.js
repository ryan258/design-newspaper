/*!	
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com 
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/
(function(){
    
      var addEvent = function (el, type, fn) {
        if (el.addEventListener)
          el.addEventListener(type, fn, false);
            else
                el.attachEvent('on'+type, fn);
      };
      
      var extend = function(obj,ext){
        for(var key in ext)
          if(ext.hasOwnProperty(key))
            obj[key] = ext[key];
        return obj;
      };
    
      window.fitText = function (el, kompressor, options) {
    
        var settings = extend({
          'minFontSize' : -1/0,
          'maxFontSize' : 1/0
        },options);
    
        var fit = function (el) {
          var compressor = kompressor || 1;
    
          var resizer = function () {
            el.style.fontSize = Math.max(Math.min(el.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + 'px';
          };
    
          // Call once to set.
          resizer();
    
          // Bind events
          // If you have any js library which support Events, replace this part
          // and remove addEvent function (or use original jQuery version)
          //addEvent(window, 'resize', resizer);
         // addEvent(window, 'orientationchange', resizer);
        };
    
        if (el.length)
          for(var i=0; i<el.length; i++)
            fit(el[i]);
        else
          fit(el);
    
        // return set of elements
        return el;
      };
    })();

$(document).ready(function () {
    //https://github.com/jonathantneal/Polyfills-for-IE8/blob/master/getComputedStyle.js
    // getComputedStyle
        !('getComputedStyle' in this) && (this.getComputedStyle = (function () {
            function getPixelSize(element, style, property, fontSize) {
                var
                sizeWithSuffix = style[property],
                size = parseFloat(sizeWithSuffix),
                suffix = sizeWithSuffix.split(/\d/)[0],
                rootSize;

                fontSize = fontSize != null ? fontSize : /%|em/.test(suffix) && element.parentElement ? getPixelSize(element.parentElement, element.parentElement.currentStyle, 'fontSize', null) : 16;
                rootSize = property == 'fontSize' ? fontSize : /width/i.test(property) ? element.clientWidth : element.clientHeight;

                return (suffix == 'em') ? size * fontSize : (suffix == 'in') ? size * 96 : (suffix == 'pt') ? size * 96 / 72 : (suffix == '%') ? size / 100 * rootSize : size;
            }

            function setShortStyleProperty(style, property) {
                var
                borderSuffix = property == 'border' ? 'Width' : '',
                t = property + 'Top' + borderSuffix,
                r = property + 'Right' + borderSuffix,
                b = property + 'Bottom' + borderSuffix,
                l = property + 'Left' + borderSuffix;

                style[property] = (style[t] == style[r] == style[b] == style[l] ? [style[t]]
                : style[t] == style[b] && style[l] == style[r] ? [style[t], style[r]]
                : style[l] == style[r] ? [style[t], style[r], style[b]]
                : [style[t], style[r], style[b], style[l]]).join(' ');
            }

            function CSSStyleDeclaration(element) {
                var
                currentStyle = element.currentStyle,
                style = this,
                fontSize = getPixelSize(element, currentStyle, 'fontSize', null);

                for (property in currentStyle) {
                    if (/width|height|margin.|padding.|border.+W/.test(property) && style[property] !== 'auto') {
                        style[property] = getPixelSize(element, currentStyle, property, fontSize) + 'px';
                    } else if (property === 'styleFloat') {
                        style['float'] = currentStyle[property];
                    } else {
                        style[property] = currentStyle[property];
                    }
                }

                setShortStyleProperty(style, 'margin');
                setShortStyleProperty(style, 'padding');
                setShortStyleProperty(style, 'border');

                style.fontSize = fontSize + 'px';

                return style;
            }

            CSSStyleDeclaration.prototype = {
                constructor: CSSStyleDeclaration,
                getPropertyPriority: function () {},
                getPropertyValue: function ( prop ) {
                    return this[prop] || '';
                },
                item: function () {},
                removeProperty: function () {},
                setProperty: function () {},
                getPropertyCSSValue: function () {}
            };

            function getComputedStyle(element) {
                return new CSSStyleDeclaration(element);
            }

            return getComputedStyle;
        })(this));

        function myfitfunc(brp){
            fitText($('.fittext-toparticle-h1-1'), 0.60);
            fitText($('.fittext-toparticle-h1-2'), 0.62);

            fitText($('.fittext-bottomarticle-first-h1'), 1.21);
            
            fitText($('.newspaper-bottomarticle-second-h1'), 1.5); 
            fitText($('.newspaper-bottomarticle-second-h2'), 0.4); 
            fitText($('.newspaper-bottomarticle-second-h3'), 0.29);

            fitText($('.newspaper-teaser-fatline'), 1.44); 


            if(brp < 768){
                $('.newspaper-exclusive-box').css('font-size', '');
                $('.fittext-exclusive-h1').css('font-size', '');
                $('.fittext-exclusive-span').css('font-size', '');
            }

            else if (brp >= 768){

                fitText($('.newspaper-exclusive-box'), 0.455);
                fitText($('.fittext-exclusive-h1'), 0.5);
                fitText($('.fittext-exclusive-span'), 0.65);
            }
        }

//Importing CSS breakpoints into JS
var breakpoint = {};
breakpoint.refreshValue = function () {
    this.valueAsNumber = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g, '');
};

breakpoint.refreshValue();
myfitfunc(breakpoint.valueAsNumber);


$( window ).resize(function() {
    breakpoint.refreshValue();

    myfitfunc(breakpoint.valueAsNumber);

}); 

if ($('.no-svg').length > 0) {
    $('img[src$=".svg"]').each(function (index, element) {
        element.src = element.src.replace('.svg', '.png');
    });
}
});