sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var linkCss = {packageName:"@ui5/webcomponents",fileName:"themes/Link.css",content:".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-flex}:host{max-width:100%;color:var(--sapLinkColor);font-family:\"72override\",var(--sapFontFamily);font-size:var(--sapFontSize);cursor:pointer;outline:none;text-decoration:var(--_ui5_link_text_decoration)}:host(:hover){text-decoration:var(--_ui5_link_hover_text_decoration)}:host([disabled]){pointer-events:none}:host([disabled]) .ui5-link-root{text-shadow:none;outline:none;cursor:default;pointer-events:none;opacity:var(--_ui5_link_opacity)}:host([design=Emphasized]) .ui5-link-root{font-weight:700}:host([design=Subtle]) .ui5-link-root,:host([design=Subtle]) .ui5-link-root:visited{color:var(--sapLink_SubtleColor)}:host([design=Subtle]) .ui5-link-root:focus{color:var(--sapLinkColor)}:host([wrapping-type=Normal]) .ui5-link-root{white-space:normal;word-wrap:break-word}.ui5-link-root{width:100%;display:inline-block;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;word-wrap:normal;outline:none;text-decoration:inherit}.ui5-link-root,.ui5-link-root:active,.ui5-link-root:visited{color:currentColor}:host .ui5-link-root{border:var(--_ui5_link_border);border-radius:var(--_ui5_link_focus_border-radius)}:host([focused]) .ui5-link-root{border:var(--_ui5_link_border_focus);text-decoration:underline}"};

	return linkCss;

});
