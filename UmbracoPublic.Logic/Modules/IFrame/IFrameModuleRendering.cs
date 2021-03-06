﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.UI;
using LinqIt.Utils.Web;

namespace UmbracoPublic.Logic.Modules.IFrame
{
    public class IFrameModuleRendering : BaseModuleRendering<IFrameModule>, IRequiresCookies
    {
        protected override void RenderModule(IFrameModule item, LinqIt.Utils.Web.HtmlWriter writer)
        {
            if (string.IsNullOrEmpty(item.Url))
                return;

            writer.RenderBeginTag(HtmlTextWriterTag.Div, "iframe-module");

            var url = new UrlBuilder(item.Url);
            if (string.IsNullOrEmpty(url.Scheme))
                url.Scheme = "http";

            writer.AddAttribute(HtmlTextWriterAttribute.Src, url.ToString());
            writer.AddAttribute(HtmlTextWriterAttribute.Width, "100%");
            if (item.Height.HasValue)
                writer.AddAttribute(HtmlTextWriterAttribute.Height, item.Height.Value.ToString());
            writer.AddAttribute("frameBorder", item.ShowBorder ? "1" : "0");
            writer.AddAttribute("scrolling", item.ShowScrollbars ? "yes" : "no");
            writer.AddAttribute("horizontalscrolling", item.ShowScrollbars ? "yes" : "no");
            writer.AddAttribute("verticalscrolling", item.ShowScrollbars ? "yes" : "no");
            writer.RenderBeginTag(HtmlTextWriterTag.Iframe);
            writer.RenderEndTag();

            writer.RenderEndTag();
        }

        public override int[] GetModuleColumnOptions()
        {
            return new[] { 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
        }

        public override string ModuleDescription
        {
            get { return "Iframe boks"; }
        }
    }
}
