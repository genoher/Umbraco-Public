(function () { tinymce.PluginManager.requireLangPack("linqitlink"); tinymce.create("tinymce.plugins.LinqItLinkPlugin", { init: function (a, b) { a.addCommand("mceLinqItLink", function () { a.windowManager.open({ file: b + "/dialog.aspx" + window.location.search, width: 650 + parseInt(a.getLang("linqitlink.delta_width", 0)), height: 310 + parseInt(a.getLang("linqitlink.delta_height", 0)), inline: 1 }, { plugin_url: b, query: window.location.search }) }); a.addButton("linqitlink", { title: "linqitlink.desc", cmd: "mceLinqItLink", image: b + "/img/linqitlink.png" }); a.onNodeChange.add(function (d, c, e) { c.setActive("linqitlink", e.nodeName == "IMG") }) }, createControl: function (b, a) { return null }, getInfo: function () { return { longname: "LinqItLink plugin", author: "LinqIt Aps", authorurl: "http://tinymce.moxiecode.com", infourl: "http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/linqitlink", version: "1.0"} } }); tinymce.PluginManager.add("linqitlink", tinymce.plugins.LinqItLinkPlugin) })();