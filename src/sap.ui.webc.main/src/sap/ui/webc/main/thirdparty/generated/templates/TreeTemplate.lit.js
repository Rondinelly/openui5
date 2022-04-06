sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-list", tags, suffix)} .mode="${litRender.ifDefined(context.mode)}" .headerText="${litRender.ifDefined(context.headerText)}" .footerText="${litRender.ifDefined(context.footerText)}" .noDataText="${litRender.ifDefined(context.noDataText)}" .accessibleRole="${litRender.ifDefined(context._role)}" @ui5-item-click="${litRender.ifDefined(context._onListItemClick)}" @ui5-item-delete="${litRender.ifDefined(context._onListItemDelete)}" @ui5-selection-change="${litRender.ifDefined(context._onListSelectionChange)}" class="ui5-tree-root"><slot name="header" slot="header"></slot>${ litRender.repeat(context._listItems, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) }</${litRender.scopeTag("ui5-list", tags, suffix)}> ` : litRender.html`<ui5-list .mode="${litRender.ifDefined(context.mode)}" .headerText="${litRender.ifDefined(context.headerText)}" .footerText="${litRender.ifDefined(context.footerText)}" .noDataText="${litRender.ifDefined(context.noDataText)}" .accessibleRole="${litRender.ifDefined(context._role)}" @ui5-item-click="${litRender.ifDefined(context._onListItemClick)}" @ui5-item-delete="${litRender.ifDefined(context._onListItemDelete)}" @ui5-selection-change="${litRender.ifDefined(context._onListSelectionChange)}" class="ui5-tree-root"><slot name="header" slot="header"></slot>${ litRender.repeat(context._listItems, (item, index) => item._id || index, (item, index) => block1(item, index, context, tags, suffix)) }</ui5-list> `;
	const block1 = (item, index, context, tags, suffix) => suffix ? litRender.html`<${litRender.scopeTag("ui5-li-tree", tags, suffix)} type="Active" level="${litRender.ifDefined(item.level)}" icon="${litRender.ifDefined(item.treeItem.icon)}" ?indeterminate="${item.treeItem.indeterminate}" additional-text="${litRender.ifDefined(item.treeItem.additionalText)}" additional-text-state="${litRender.ifDefined(item.treeItem.additionalTextState)}" title="${litRender.ifDefined(item.treeItem.title)}" ?_toggle-button-end="${litRender.ifDefined(context._toggleButtonEnd)}" ?_minimal="${litRender.ifDefined(context._minimal)}" .treeItem="${litRender.ifDefined(item.treeItem)}" .expanded="${litRender.ifDefined(item.treeItem.expanded)}" .selected="${litRender.ifDefined(item.treeItem.selected)}" .showToggleButton="${litRender.ifDefined(item.treeItem.requiresToggleButton)}" ._posinset="${litRender.ifDefined(item.posinset)}" ._setsize="${litRender.ifDefined(item.size)}" @ui5-toggle="${litRender.ifDefined(context._onListItemToggle)}" @ui5-step-in="${litRender.ifDefined(context._onListItemStepIn)}" @ui5-step-out="${litRender.ifDefined(context._onListItemStepOut)}" @mouseover="${context._onListItemMouseOver}" @mouseout="${context._onListItemMouseOut}">${litRender.ifDefined(item.treeItem.text)}</${litRender.scopeTag("ui5-li-tree", tags, suffix)}>` : litRender.html`<ui5-li-tree type="Active" level="${litRender.ifDefined(item.level)}" icon="${litRender.ifDefined(item.treeItem.icon)}" ?indeterminate="${item.treeItem.indeterminate}" additional-text="${litRender.ifDefined(item.treeItem.additionalText)}" additional-text-state="${litRender.ifDefined(item.treeItem.additionalTextState)}" title="${litRender.ifDefined(item.treeItem.title)}" ?_toggle-button-end="${litRender.ifDefined(context._toggleButtonEnd)}" ?_minimal="${litRender.ifDefined(context._minimal)}" .treeItem="${litRender.ifDefined(item.treeItem)}" .expanded="${litRender.ifDefined(item.treeItem.expanded)}" .selected="${litRender.ifDefined(item.treeItem.selected)}" .showToggleButton="${litRender.ifDefined(item.treeItem.requiresToggleButton)}" ._posinset="${litRender.ifDefined(item.posinset)}" ._setsize="${litRender.ifDefined(item.size)}" @ui5-toggle="${litRender.ifDefined(context._onListItemToggle)}" @ui5-step-in="${litRender.ifDefined(context._onListItemStepIn)}" @ui5-step-out="${litRender.ifDefined(context._onListItemStepOut)}" @mouseover="${context._onListItemMouseOver}" @mouseout="${context._onListItemMouseOut}">${litRender.ifDefined(item.treeItem.text)}</ui5-li-tree>`;

	return block0;

});
