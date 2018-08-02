# Usage with Microsoft Application Insights

[Application Insights] metrics with `botbuilder-telemetry` payload.

![application insights metrics][appinsights-image]

Example of metrics payload in Application Insights on [Azure Portal]

## Hook it up

### 1. Bot Analytics Services (service-level vs conversation-level)
Read until the bottom section 'Enable Analytics'

https://docs.microsoft.com/en-us/bot-framework/bot-service-manage-analytics

### 2. Setting up Application Insights service on Azure
https://docs.microsoft.com/en-us/azure/application-insights/app-insights-create-new-resource

### 3. Setting up App Insights with your Nodejs Bot
Refer to lines 31-59 in `applicationInsights.js` while following the analytics setup steps
https://docs.microsoft.com/en-us/azure/application-insights/app-insights-nodejs

### API Summary for tracking events and metrics with App Insights
https://docs.microsoft.com/en-us/azure/application-insights/app-insights-api-custom-events-metrics


[Application Insights]: https://azure.microsoft.com/en-us/services/application-insights/
[Azure Portal]: https://portal.azure.com
[appinsights-image]: ../static/appinsights.png
