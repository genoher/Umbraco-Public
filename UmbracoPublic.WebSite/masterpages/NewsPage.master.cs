﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LinqIt.Cms;
using LinqIt.Components;
using LinqIt.Utils.Web;
using UmbracoPublic.Logic.Utilities;
using UmbracoPublic.WebSite.Utilities;

namespace UmbracoPublic.WebSite.masterpages
{
    public partial class NewsPage : System.Web.UI.MasterPage, IGridModuleControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
        }

        protected override void CreateChildControls()
        {
            base.CreateChildControls();
            HtmlContent.CreateControls(GenerateOutput, plhContent.Controls);
        }

        private static void GenerateOutput(HtmlWriter writer)
        {
            var page = CmsService.Instance.GetItem<UmbracoPublic.Logic.Entities.NewsPage>();
            if (!string.IsNullOrEmpty(page.Headline))
                writer.RenderFullTag(HtmlTextWriterTag.H1, page.Headline);
            if (page.Date.HasValue)
                writer.RenderFullTag(HtmlTextWriterTag.H6, string.Format("Publiseret {0}", page.Date.Value.ToString("dd-MM-yyyy")));
            foreach (var categorization in page.Categorizations)
                writer.RenderFullTag(HtmlTextWriterTag.Span, categorization, "label");
            if (!page.Intro.IsEmpty)
                writer.RenderParagraph(page.Intro.AsHtml);
            if (!page.Body.IsEmpty)
                writer.Write(page.Body.ToString());
        }

        public GridLayout GetGridLayout()
        {
            return PageLayouts.GeneralLayout;
        }
    }
}