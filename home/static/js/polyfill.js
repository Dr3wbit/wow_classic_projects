function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
        value: function(search, pos) {
            pos = !pos || pos < 0 ? 0 : +pos;
            return this.substring(pos, pos + search.length) === search;
        }
    });
}

// addEventListener(), removeEventListener(), Event.preventDefault(), and Event.stopPropagation()
(function() {
  if (!Event.prototype.preventDefault) {
    Event.prototype.preventDefault=function() {
      this.returnValue=false;
    };
  }
  if (!Event.prototype.stopPropagation) {
    Event.prototype.stopPropagation=function() {
      this.cancelBubble=true;
    };
  }
  if (!Element.prototype.addEventListener) {
    var eventListeners=[];

    var addEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var self=this;
      var wrapper=function(e) {
        e.target=e.srcElement;
        e.currentTarget=self;
        if (typeof listener.handleEvent != 'undefined') {
          listener.handleEvent(e);
        } else {
          listener.call(self,e);
        }
      };
      if (type=="DOMContentLoaded") {
        var wrapper2=function(e) {
          if (document.readyState=="complete") {
            wrapper(e);
          }
        };
        document.attachEvent("onreadystatechange",wrapper2);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper2});

        if (document.readyState=="complete") {
          var e=new Event();
          e.srcElement=window;
          wrapper2(e);
        }
      } else {
        this.attachEvent("on"+type,wrapper);
        eventListeners.push({object:this,type:type,listener:listener,wrapper:wrapper});
      }
    };
    var removeEventListener=function(type,listener /*, useCapture (will be ignored) */) {
      var counter=0;
      while (counter<eventListeners.length) {
        var eventListener=eventListeners[counter];
        if (eventListener.object==this && eventListener.type==type && eventListener.listener==listener) {
          if (type=="DOMContentLoaded") {
            this.detachEvent("onreadystatechange",eventListener.wrapper);
          } else {
            this.detachEvent("on"+type,eventListener.wrapper);
          }
          eventListeners.splice(counter, 1);
          break;
        }
        ++counter;
      }
    };
    Element.prototype.addEventListener=addEventListener;
    Element.prototype.removeEventListener=removeEventListener;
    if (HTMLDocument) {
      HTMLDocument.prototype.addEventListener=addEventListener;
      HTMLDocument.prototype.removeEventListener=removeEventListener;
    }
    if (Window) {
      Window.prototype.addEventListener=addEventListener;
      Window.prototype.removeEventListener=removeEventListener;
    }
  }
})();

// node.remove()
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode === null) {
          return;
        }
        this.parentNode.removeChild(this);
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

if (!Array.prototype.flat) {
	Array.prototype.flat = function () {
		var depth = arguments[0];
		depth = depth === undefined ? 1 : Math.floor(depth);
		if (depth < 1) return Array.prototype.slice.call(this);
		return (function flat(arr, depth) {
			var len = arr.length >>> 0;
			var flattened = [];
			var i = 0;
			while (i < len) {
				if (i in arr) {
					var el = arr[i];
					if (Array.isArray(el) && depth > 0)
						flattened = flattened.concat(flat(el, depth - 1));
					else flattened.push(el);
				}
				i++;
			}
			return flattened;
		})(this, depth);
	};
}
// 1. String.prototype.trim polyfill
if (!"".trim) String.prototype.trim = function(){ return this.replace(/^[\s﻿]+|[\s﻿]+$/g, ''); };
(function(window){"use strict"; // prevent global namespace pollution
if(!window.DOMException) (DOMException = function(reason){this.message = reason}).prototype = new Error;
var wsRE = /[\11\12\14\15\40]/, wsIndex = 0, checkIfValidClassListEntry = function(O, V) {
  if (V === "") throw new DOMException(
    "Failed to execute '" + O + "' on 'DOMTokenList': The token provided must not be empty." );
  if((wsIndex=V.search(wsRE))!==-1) throw new DOMException("Failed to execute '"+O+"' on 'DOMTokenList': " +
    "The token provided ('"+V[wsIndex]+"') contains HTML space characters, which are not valid in tokens.");
}
// 2. Implement the barebones DOMTokenList livelyness polyfill
if (typeof DOMTokenList !== "function") (function(window){
    var document = window.document, Object = window.Object, hasOwnProp = Object.prototype.hasOwnProperty;
    var defineProperty = Object.defineProperty, allowTokenListConstruction = 0, skipPropChange = 0;
    function DOMTokenList(){
        if (!allowTokenListConstruction) throw TypeError("Illegal constructor"); // internally let it through
    }
    DOMTokenList.prototype.toString = DOMTokenList.prototype.toLocaleString = function(){return this.value};
    DOMTokenList.prototype.add = function(){
        a: for(var v=0, argLen=arguments.length,val="",ele=this[" uCL"],proto=ele[" uCLp"]; v!==argLen; ++v) {
            val = arguments[v] + "", checkIfValidClassListEntry("add", val);
            for (var i=0, Len=proto.length, resStr=val; i !== Len; ++i)
                if (this[i] === val) continue a; else resStr += " " + this[i];
            this[Len] = val, proto.length += 1, proto.value = resStr;
        }
        skipPropChange = 1, ele.className = proto.value, skipPropChange = 0;
    };
    DOMTokenList.prototype.remove = function(){
        for (var v=0, argLen=arguments.length,val="",ele=this[" uCL"],proto=ele[" uCLp"]; v !== argLen; ++v) {
            val = arguments[v] + "", checkIfValidClassListEntry("remove", val);
            for (var i=0, Len=proto.length, resStr="", is=0; i !== Len; ++i)
                if(is){ this[i-1]=this[i] }else{ if(this[i] !== val){ resStr+=this[i]+" "; }else{ is=1; } }
            if (!is) continue;
            delete this[Len], proto.length -= 1, proto.value = resStr;
        }
        skipPropChange = 1, ele.className = proto.value, skipPropChange = 0;
    };
    window.DOMTokenList = DOMTokenList;
    function whenPropChanges(){
        var evt = window.event, prop = evt.propertyName;
        if ( !skipPropChange && (prop==="className" || (prop==="classList" && !defineProperty)) ) {
            var target = evt.srcElement, protoObjProto = target[" uCLp"], strval = "" + target[prop];
            var tokens=strval.trim().split(wsRE), resTokenList=target[prop==="classList"?" uCL":"classList"];
            var oldLen = protoObjProto.length;
            a: for(var cI = 0, cLen = protoObjProto.length = tokens.length, sub = 0; cI !== cLen; ++cI){
                for(var innerI=0; innerI!==cI; ++innerI) if(tokens[innerI]===tokens[cI]) {sub++; continue a;}
                resTokenList[cI-sub] = tokens[cI];
            }
            for (var i=cLen-sub; i < oldLen; ++i) delete resTokenList[i]; //remove trailing indexs
            if(prop !== "classList") return;
            skipPropChange = 1, target.classList = resTokenList, target.className = strval;
            skipPropChange = 0, resTokenList.length = tokens.length - sub;
        }
    }
    function polyfillClassList(ele){
        if (!ele || !("innerHTML" in ele)) throw TypeError("Illegal invocation");
        ele.detachEvent( "onpropertychange", whenPropChanges ); // prevent duplicate handler infinite loop
        allowTokenListConstruction = 1;
        try{ function protoObj(){} protoObj.prototype = new DOMTokenList(); }
        finally { allowTokenListConstruction = 0 }
        var protoObjProto = protoObj.prototype, resTokenList = new protoObj();
        a: for(var toks=ele.className.trim().split(wsRE), cI=0, cLen=toks.length, sub=0; cI !== cLen; ++cI){
            for (var innerI=0; innerI !== cI; ++innerI) if (toks[innerI] === toks[cI]) { sub++; continue a; }
            this[cI-sub] = toks[cI];
        }
        protoObjProto.length = cLen-sub, protoObjProto.value = ele.className, protoObjProto[" uCL"] = ele;
        if (defineProperty) { defineProperty(ele, "classList", { // IE8 & IE9 allow defineProperty on the DOM
            enumerable:   1, get: function(){return resTokenList},
            configurable: 0, set: function(newVal){
                skipPropChange = 1, ele.className = protoObjProto.value = (newVal += ""), skipPropChange = 0;
                var toks = newVal.trim().split(wsRE), oldLen = protoObjProto.length;
                a: for(var cI = 0, cLen = protoObjProto.length = toks.length, sub = 0; cI !== cLen; ++cI){
                    for(var innerI=0; innerI!==cI; ++innerI) if(toks[innerI]===toks[cI]) {sub++; continue a;}
                    resTokenList[cI-sub] = toks[cI];
                }
                for (var i=cLen-sub; i < oldLen; ++i) delete resTokenList[i]; //remove trailing indexs
            }
        }); defineProperty(ele, " uCLp", { // for accessing the hidden prototype
            enumerable: 0, configurable: 0, writeable: 0, value: protoObj.prototype
        }); defineProperty(protoObjProto, " uCL", {
            enumerable: 0, configurable: 0, writeable: 0, value: ele
        }); } else { ele.classList=resTokenList, ele[" uCL"]=resTokenList, ele[" uCLp"]=protoObj.prototype; }
        ele.attachEvent( "onpropertychange", whenPropChanges );
    }
    try { // Much faster & cleaner version for IE8 & IE9:
        // Should work in IE8 because Element.prototype instanceof Node is true according to the specs
        window.Object.defineProperty(window.Element.prototype, "classList", {
            enumerable: 1,   get: function(val){
                                 if (!hasOwnProp.call(this, "classList")) polyfillClassList(this);
                                 return this.classList;
                             },
            configurable: 0, set: function(val){this.className = val}
        });
    } catch(e) { // Less performant fallback for older browsers (IE 6-8):
        window[" uCL"] = polyfillClassList;
        // the below code ensures polyfillClassList is applied to all current and future elements in the doc.
        document.documentElement.firstChild.appendChild(document.createElement('style')).styleSheet.cssText=(
            '_*{x-uCLp:expression(!this.hasOwnProperty("classList")&&window[" uCL"](this))}' + //  IE6
            '[class]{x-uCLp/**/:expression(!this.hasOwnProperty("classList")&&window[" uCL"](this))}' //IE7-8
        );
    }
})(window);

// 3. Patch in unsupported methods in DOMTokenList
(function(DOMTokenListProto, testClass){
    if (!DOMTokenListProto.item) DOMTokenListProto.item = function(i){
        function NullCheck(n) {return n===void 0 ? null : n} return NullCheck(this[i]);
    };
    if (!DOMTokenListProto.toggle || testClass.toggle("a",0)!==false) DOMTokenListProto.toggle=function(val){
        if (arguments.length > 1) return (this[arguments[1] ? "add" : "remove"](val), !!arguments[1]);
        var oldValue = this.value;
        return (this.remove(oldValue), oldValue === this.value && (this.add(val), true) /*|| false*/);
    };
    if (!DOMTokenListProto.replace || typeof testClass.replace("a", "b") !== "boolean")
        DOMTokenListProto.replace = function(oldToken, newToken){
            checkIfValidClassListEntry("replace", oldToken), checkIfValidClassListEntry("replace", newToken);
            var oldValue = this.value;
            return (this.remove(oldToken), this.value !== oldValue && (this.add(newToken), true));
        };
    if (!DOMTokenListProto.contains) DOMTokenListProto.contains = function(value){
        for (var i=0,Len=this.length; i !== Len; ++i) if (this[i] === value) return true;
        return false;
    };
    if (!DOMTokenListProto.forEach) DOMTokenListProto.forEach = function(f){
        if (arguments.length === 1) for (var i = 0, Len = this.length; i !== Len; ++i) f( this[i], i, this);
        else for (var i=0,Len=this.length,tArg=arguments[1]; i !== Len; ++i) f.call(tArg, this[i], i, this);
    };
    if (!DOMTokenListProto.entries) DOMTokenListProto.entries = function(){
        var nextIndex = 0, that = this;
        return {next: function() {
            return nextIndex<that.length ? {value: [nextIndex, that[nextIndex++]], done: false} : {done: true};
        }};
    };
    if (!DOMTokenListProto.values) DOMTokenListProto.values = function(){
        var nextIndex = 0, that = this;
        return {next: function() {
            return nextIndex<that.length ? {value: that[nextIndex++], done: false} : {done: true};
        }};
    };
    if (!DOMTokenListProto.keys) DOMTokenListProto.keys = function(){
        var nextIndex = 0, that = this;
        return {next: function() {
            return nextIndex<that.length ? {value: nextIndex++, done: false} : {done: true};
        }};
    };
})(window.DOMTokenList.prototype, window.document.createElement("div").classList);
})(window);
