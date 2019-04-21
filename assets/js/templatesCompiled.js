(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['nav'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <li class=\"nav-item\">\r\n                    <a class=\"nav-link\" href="
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + ">"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "</a>\r\n                </li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\r\n\r\n<div class=\"row\">\r\n    <div class=\"p-lg-4\"></div>\r\n    <nav class=\"navbar navbar-expand-lg navbar-dark col-12\">\r\n        <a class=\"navbar-brand\" href=\"index.html\">\r\n            <img src=\"assets/images/OnyBuff.png\" width=\"50\" height=\"50\" alt=\"\">\r\n            Ony Buff</a>\r\n        <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\r\n            aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\r\n            <span class=\"navbar-toggler-icon\"></span>\r\n        </button>\r\n\r\n        <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\r\n            <ul class=\"navbar-nav mr-auto justify-content-around w-100\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.links : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\r\n        </div>\r\n    </nav>\r\n</div>\r\n\r\n\r\n\r\n";
},"useData":true});
})();