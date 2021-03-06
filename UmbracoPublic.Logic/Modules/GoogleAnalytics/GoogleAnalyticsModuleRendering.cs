﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using LinqIt.Ajax.Parsing;
using UmbracoPublic.Logic.Entities;
using UmbracoPublic.Logic.Services;
using UmbracoPublic.Logic.Utilities;

namespace UmbracoPublic.Logic.Modules.GoogleAnalytics
{
    public class GoogleAnalyticsModuleRendering : BaseModuleRendering<GoogleAnalyticsModule>, IRequiresCookies
    {
        protected override void OnInit(EventArgs e)
        {
            base.OnInit(e);
            this.Visible = DataService.Instance.GetCookieState() != CookieState.Accepted;
        }

        protected override void RegisterScripts()
        {
            if (string.IsNullOrEmpty(Module.ApiKey))
                throw new ConfigurationErrorsException("Google Analytics Apikey has not been specified");

            ModuleScripts.RegisterInitScript("googleanalytics", new JSONString(Module.ApiKey));
        }

        public override string ModuleDescription
        {
            get { return "Google statistik"; }
        }
    }
}

