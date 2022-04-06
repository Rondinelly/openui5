sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => litRender.html`<div class="ui5-illustrated-message-root"><div class="ui5-illustrated-message-illustration">${litRender.unsafeHTML(context.effectiveIllustration)}</div>${ context.hasTitle ? block1(context, tags, suffix) : undefined }${ context.hasSubtitle ? block2(context) : undefined }${ context.hasActions ? block5() : undefined }<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ui5-illustrated-message-util">${blockSVG1()}</svg></div>`;
	const block1 = (context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-title", tags, suffix)} level="H2" class="ui5-illustrated-message-title" wrapping-type="Normal">${litRender.ifDefined(context.effectiveTitleText)}</${litRender.scopeTag("ui5-title", tags, suffix)}>` : litRender.html`<ui5-title level="H2" class="ui5-illustrated-message-title" wrapping-type="Normal">${litRender.ifDefined(context.effectiveTitleText)}</ui5-title>`;
	const block2 = (context, tags, suffix) => litRender.html`<div class="ui5-illustrated-message-subtitle">${ context.hasFormattedSubtitle ? block3() : block4(context) }</div>`;
	const block3 = (context, tags, suffix) => litRender.html`<slot name="subtitle"></slot>`;
	const block4 = (context, tags, suffix) => litRender.html`${litRender.ifDefined(context.effectiveSubitleText)}`;
	const block5 = (context, tags, suffix) => litRender.html`<div class="ui5-illustrated-message-actions"><slot></slot></div>`;
	const blockSVG1 = (context, tags, suffix) => litRender.svg`<defs><pattern id="sapIllus_PatternShadow" data-name="sapIllus_PatternShadow" width="3" height="5.5" patternUnits="userSpaceOnUse" viewBox="0 0 3 5.5"><rect class="sapIllus_NoColor sapIllus_NoColor_Fill" width="3" height="5.5" /><circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cx="3" cy="5.5001" r="0.5" /><circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cy="5.5001" r="0.5" /><circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cx="1.5" cy="2.7501" r="0.5" /><circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cx="3" cy="0.0001" r="0.5" /><circle class="sapIllus_BrandColorPrimary sapIllus_BrandColorPrimary_Fill" cy="0.0001" r="0.5" /></pattern><pattern id="sapIllus_PatternHighlight" data-name="sapIllus_PatternHighlight" width="3" height="5.5" patternTransform="translate(35.9059 309.6208)" patternUnits="userSpaceOnUse" viewBox="0 0 3 5.5"><rect class="sapIllus_NoColor sapIllus_NoColor_Fill" width="3" height="5.5" /><circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="3.0001" cy="5.5001" r="0.5" /><circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="0.0001" cy="5.5001" r="0.5" /><circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="1.5001" cy="2.7501" r="0.5" /><circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="3.0001" cy="0.0001" r="0.5" /><circle class="sapIllus_ObjectFillColor sapIllus_ObjectFillColor_Fill" cx="0.0001" cy="0.0001" r="0.5" /></pattern></defs>`;

	return block0;

});
