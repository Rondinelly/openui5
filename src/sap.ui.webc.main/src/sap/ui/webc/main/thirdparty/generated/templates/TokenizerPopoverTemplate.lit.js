sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-responsive-popover", tags, suffix)} tokenizer-popover="true" style=${litRender.styleMap(context.styles.popover)} header-text=${litRender.ifDefined(context.morePopoverTitle)} ?content-only-on-desktop="${context.hasValueState}" hide-arrow placement-type="Bottom" horizontal-align="Left">${ !context.hasValueState ? block1(context, tags, suffix) : undefined }<${litRender.scopeTag("ui5-list", tags, suffix)} class="ui5-tokenizer-list" mode="Delete" @ui5-item-delete=${litRender.ifDefined(context.itemDelete)}>${ litRender.repeat(context._tokens, (item, index) => item._id || index, (item, index) => block4(item, index, context, tags, suffix)) }</${litRender.scopeTag("ui5-list", tags, suffix)}>${ context._isPhone ? block5(context, tags, suffix) : undefined }</${litRender.scopeTag("ui5-responsive-popover", tags, suffix)}>` : litRender.html`<ui5-responsive-popover tokenizer-popover="true" style=${litRender.styleMap(context.styles.popover)} header-text=${litRender.ifDefined(context.morePopoverTitle)} ?content-only-on-desktop="${context.hasValueState}" hide-arrow placement-type="Bottom" horizontal-align="Left">${ !context.hasValueState ? block1(context, tags, suffix) : undefined }<ui5-list class="ui5-tokenizer-list" mode="Delete" @ui5-item-delete=${litRender.ifDefined(context.itemDelete)}>${ litRender.repeat(context._tokens, (item, index) => item._id || index, (item, index) => block4(item, index, context, tags, suffix)) }</ui5-list>${ context._isPhone ? block5(context, tags, suffix) : undefined }</ui5-responsive-popover>`;
	const block1 = (context, tags, suffix) => litRender.html`<div slot="header" class="ui5-responsive-popover-header" style="${litRender.styleMap(context.styles.popoverHeader)}">${ context._isPhone ? block2(context, tags, suffix) : undefined }<div class="${litRender.classMap(context.classes.popoverValueState)}" style="${litRender.styleMap(context.styles.popoverValueStateMessage)}">${ litRender.repeat(context.valueStateMessageText, (item, index) => item._id || index, (item, index) => block3(item)) }</div></div>`;
	const block2 = (context, tags, suffix) => suffix ? litRender.html`<div class="row" style="${litRender.styleMap(context.styles.popoverHeaderTitle)}"><${litRender.scopeTag("ui5-title", tags, suffix)} level="H5" class="ui5-responsive-popover-header-text">Remove</${litRender.scopeTag("ui5-title", tags, suffix)}><${litRender.scopeTag("ui5-button", tags, suffix)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${context.closeMorePopover}"></${litRender.scopeTag("ui5-button", tags, suffix)}></div>` : litRender.html`<div class="row" style="${litRender.styleMap(context.styles.popoverHeaderTitle)}"><ui5-title level="H5" class="ui5-responsive-popover-header-text">Remove</ui5-title><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${context.closeMorePopover}"></ui5-button></div>`;
	const block3 = (item, index, context, tags, suffix) => litRender.html`${litRender.ifDefined(item)}`;
	const block4 = (item, index, context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-li", tags, suffix)} .tokenRef=${litRender.ifDefined(item)}>${litRender.ifDefined(item.text)}</${litRender.scopeTag("ui5-li", tags, suffix)}>` : litRender.html`<ui5-li .tokenRef=${litRender.ifDefined(item)}>${litRender.ifDefined(item.text)}</ui5-li>`;
	const block5 = (context, tags, suffix) => suffix ? litRender.html`<div slot="footer" class="ui5-responsive-popover-footer"><${litRender.scopeTag("ui5-button", tags, suffix)} design="Transparent" @click="${context.closeMorePopover}">OK</${litRender.scopeTag("ui5-button", tags, suffix)}></div>` : litRender.html`<div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${context.closeMorePopover}">OK</ui5-button></div>`;

	return block0;

});
