﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;
using LinqIt.Ajax;
using LinqIt.Cms;
using LinqIt.Cms.Data;
using LinqIt.Components.Data;

namespace UmbracoPublic.WebSite.handlers
{
    public partial class MultiListEditorHandler : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            AjaxUtil.RegisterPageMethods(this);

            if (!string.IsNullOrEmpty(Request.QueryString["frame"]))
            {
                ClientScript.RegisterStartupScript(Page.GetType(), "editorInitialization", @"
                var gridEditorFrame = $('#" + Request.QueryString["frame"] + @"', window.parent.document);
                gridEditorFrame.parent().css('clear','both');
                ", true);    
            }

            editor.Attributes.Add("hiddenId", Request.QueryString["hiddenId"]);

            var provider = GetProvider();
            var sourceNodes = provider.GetRootNodes().ToList();
            var destinationNodes = new List<Node>();
            using (CmsContext.Editing)
            {
                var item = CmsService.Instance.GetItem<Entity>(new Id(Request.QueryString["itemId"]));
                var fieldName = Request.QueryString["fieldName"];
                var value = new IdList(item[fieldName]);
                foreach (var id in value)
                {
                    var node = sourceNodes.FirstOrDefault(n => n.Id == id.ToString());
                    if (node != null)
                    {
                        sourceNodes.Remove(node);
                        destinationNodes.Add(node);
                    }
                }
                var litSource = new Literal();
                litSource.Text = string.Format("<ul class=\"srcList listbox\">{0}</ul>", multiListControl.GenerateListBox(sourceNodes));
                multiListControl.Initialize(litSource, destinationNodes);
            }
        }

        public static NodeProvider GetProvider()
        {
            var queryString = HttpContext.Current.Request.QueryString;
            var referenceId = queryString["rootId"];
            if (string.IsNullOrEmpty(referenceId))
                referenceId = queryString["itemId"];
            return ProviderHelper.GetProvider<NodeProvider>(queryString["provider"], referenceId);
        }
    }
}