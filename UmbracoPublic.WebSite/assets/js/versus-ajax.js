﻿if (!this.JSON) { this.JSON = {} } (function () { function f(a) { return a < 10 ? "0" + a : a } function quote(a) { escapable.lastIndex = 0; return escapable.test(a) ? '"' + a.replace(escapable, function (a) { var b = meta[a]; return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) + '"' : '"' + a + '"' } function str(a, b) { var c, d, e, f, g = gap, h, i = b[a]; if (i && typeof i === "object" && typeof i.toJSON === "function") { i = i.toJSON(a) } if (typeof rep === "function") { i = rep.call(b, a, i) } switch (typeof i) { case "string": return quote(i); case "number": return isFinite(i) ? String(i) : "null"; case "boolean": case "null": return String(i); case "object": if (!i) { return "null" } gap += indent; h = []; if (Object.prototype.toString.apply(i) === "[object Array]") { f = i.length; for (c = 0; c < f; c += 1) { h[c] = str(c, i) || "null" } e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]"; gap = g; return e } if (rep && typeof rep === "object") { f = rep.length; for (c = 0; c < f; c += 1) { d = rep[c]; if (typeof d === "string") { e = str(d, i); if (e) { h.push(quote(d) + (gap ? ": " : ":") + e) } } } } else { for (d in i) { if (Object.hasOwnProperty.call(i, d)) { e = str(d, i); if (e) { h.push(quote(d) + (gap ? ": " : ":") + e) } } } } e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}"; gap = g; return e } } if (typeof Date.prototype.toJSON !== "function") { Date.prototype.toJSON = function (a) { return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null }; String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) { return this.valueOf() } } var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = { "\b": "\\b", "	": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\" }, rep; if (typeof JSON.stringify !== "function") { JSON.stringify = function (a, b, c) { var d; gap = ""; indent = ""; if (typeof c === "number") { for (d = 0; d < c; d += 1) { indent += " " } } else if (typeof c === "string") { indent = c } rep = b; if (b && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number")) { throw new Error("JSON.stringify") } return str("", { "": a }) } } if (typeof JSON.parse !== "function") { JSON.parse = function (text, reviver) { function walk(a, b) { var c, d, e = a[b]; if (e && typeof e === "object") { for (c in e) { if (Object.hasOwnProperty.call(e, c)) { d = walk(e, c); if (d !== undefined) { e[c] = d } else { delete e[c] } } } } return reviver.call(a, b, e) } var j; text = String(text); cx.lastIndex = 0; if (cx.test(text)) { text = text.replace(cx, function (a) { return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4) }) } if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) { j = eval("(" + text + ")"); return typeof reviver === "function" ? walk({ "": j }, "") : j } throw new SyntaxError("JSON.parse") } } })()
function callMethodAsync(a,b,c){var d={};d.control=a;d.method=b;d.args={};for(var e=3;e<arguments.length;e++){d.args["arg"+(e-3)]=arguments[e]}$.ajax({type:"POST",url:document.location.pathname.replace(/\.[^/]+$/,"")+"/AjaxProxy.json"+document.location.search,data:JSON.stringify(d),contentType:"versus/callback; charset=utf-8",dataType:"json",success:c,error:OnMethodFailed})}

function callMethod(control,method)
{
    var data={};
    data.control=control;
    data.method=method;
    data.args={};
    for(var i=2;i<arguments.length;i++){
        data.args["arg"+(i-2)]=arguments[i]
    }
    var responseText=$.ajax({
        type:"POST",
        url:(document.location.pathname == "/"? "" : document.location.pathname.replace(/\.[^/]+$/,""))+"/AjaxProxy.json"+document.location.search,
        data:JSON.stringify(data),
        contentType:"versus/callback; charset=utf-8",
        dataType:"json",async:false,error:OnMethodFailed
    }).responseText;
    return eval("("+responseText+")");
}

function OnMethodFailed(XmlHttpRequest,textStatus,errorThrown)
{
    if(XmlHttpRequest.responseText)
    {
        var response=eval("("+XmlHttpRequest.responseText+")");
        alert(response.Message)
    }
}
        
function setInnerHtml(a,b){$("#"+a).html(b.toString())}