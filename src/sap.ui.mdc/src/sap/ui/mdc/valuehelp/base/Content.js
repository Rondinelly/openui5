/*!
 * ${copyright}
 */

sap.ui.define([
	'sap/ui/core/Element',
	'sap/ui/mdc/mixin/PromiseMixin',
	'sap/ui/base/ManagedObjectObserver',
	'sap/ui/mdc/condition/Condition',
	'sap/ui/mdc/condition/FilterOperatorUtil',
	'sap/ui/mdc/condition/Operator',
	'sap/ui/mdc/enum/ConditionValidated',
	'sap/base/strings/formatMessage'
], function(
	Element,
	PromiseMixin,
	ManagedObjectObserver,
	Condition,
	FilterOperatorUtil,
	Operator,
	ConditionValidated,
	formatMessage
) {
	"use strict";

	/**
	 * Constructor for a new <code>Content</code>.
	 *
	 * This is the basis for different value help contents. It cannot be used directly.
	 *
	 * @param {string} [sId] ID for the new element, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new element
	 * @class Content for the {@link sap.ui.mdc.valuehelp.base.Container Container} element.
	 * @extends sap.ui.core.Element
	 * @version ${version}
	 * @constructor
	 * @abstract
	 * @private
	 * @ui5-restricted sap.fe
	 * @MDC_PUBLIC_CANDIDATE
	 * @since 1.95.0
	 * @experimental As of version 1.95
	 * @alias sap.ui.mdc.valuehelp.base.Content
	 */
	var Content = Element.extend("sap.ui.mdc.valuehelp.base.Content", /** @lends sap.ui.mdc.valuehelp.base.Content.prototype */
	{
		metadata: {
			library: "sap.ui.mdc",
			properties: {
				/**
				 * Title text that appears tab header.
				 */
				title: {
					type: "string",
					group: "Appearance",
					defaultValue: ""
				},
				/**
				 * Title text that appears in the dialog header.
				 */
				shortTitle: {
					type: "string",
					group: "Appearance",
					defaultValue: ""
				},
				/**
				 * Title text that appears in the dialog tokenizer panel, when ony one content exist.
				 */
				tokenizerTitle: {
					type: "string",
					group: "Appearance",
					defaultValue: ""
				},
				/**
				 * Conditions of the value help
				 *
				 * <b>Note:</b> This property must not be set from outside, it is only to be used by the corresponding container
				 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
				 * @private
				 * @experimental: Do not use - this property is only for internal usage
				 */
				conditions: { // TODO: only internal? make restricted?
					type: "object[]",
					defaultValue: [],
					byValue: true
				},
				/**
				 * Value for filtering ($search)
				 *
				 * <b>Note:</b> This property must not be set from outside, it is only to be used by the corresponding container
				 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
				 * @private
				 * @experimental: Do not use - this property is only for internal usage
				 */
				filterValue: { // TODO: how to hide? Or how to access from ValueHelp?
					type: "string",
					defaultValue: ""//,
					//visibility: "hidden"
				},
				/**
				 * Internal configuration
				 *
				 * <b>Note:</b> This property must not be set from outside, it is only to be used by the corresponding container
				 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
				 * @private
				 * @experimental: Do not use - this property is only for internal usage
				 */
				config: {
					type: "object",
					defaultValue: {}//,
//					visibility: "hidden"
				},
				 /**
				 * Hide content temporary.
				 */
				visible: {
					type: "boolean",
					group : "Appearance",
					defaultValue: true
				}

			},
			aggregations: {
				/**
				 * Content control that is put inside the parent container
				 *
				 * <b>Note:</b> This aggregation must not be set from outside, it is only to be used by the corresponding container
				 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
				 * @private
				 * @experimental: Do not use - this aggregation is only for internal usage
				 */
				displayContent: {
					type: "sap.ui.core.Control",
					multiple: false//,
					//visibility: "hidden" // as ManagedObjectModel can only observe hidden aggregations on root-control
				}
			},
			events: {
				/**
				 * Fired if the selected condition changed.
				 */
				select: {
					parameters: {
						/**
						 * Type of the selection change (add, remove)
						 */
						type: { type: "sap.ui.mdc.enum.SelectType" },
						/**
						 * Changed conditions
						 *
						 * <b>Note:</b> A condition must have the structure of {@link sap.ui.mdc.condition.ConditionObject ConditionObject}.
						 */
						conditions: { type: "object[]" }
					}
				},
				/**
				 * Fired if a change on the content is confirmed.
				 */
				confirm: {
					parameters: {
						/**
						 * True if the value help need to be closed
						 */
						close: { type: "boolean" }
					}
				},
				/**
				 * Fired if the change is cancelled.
				 */
				cancel: {},

				/**
				 * Fired if the value help should switch to dialog mode.
				 */
				requestSwitchToDialog: {},
				/**
				 * Fired if a navigation was executed in the content.
				 */
				navigated: {
					parameters: {
						/**
						 * True if the focus should be set back to the field.
						 */
						leaveFocus: { type: "boolean" },
						/**
						 * Navigated condition.
						 *
						 * <b>Note:</b> A condition must have the structure of {@link sap.ui.mdc.condition.ConditionObject ConditionObject}.
						 */
						condition: { type: "object" },
						/**
						 * ID of the navigated item. (This is needed to set the corresponding aria-attribute)
						 */
						itemId: { type: "string" }
					}
				}
			}
		}
	});

	Content.prototype.init = function() {

		this._oObserver = new ManagedObjectObserver(this.observeChanges.bind(this));

		this._oObserver.observe(this, {
			properties: ["filterValue", "conditions", "config"]
		});

		this._oOperator = FilterOperatorUtil.getEQOperator(); // use as default if no configuartion

	};

	Content.prototype.exit = function() {

		this._oObserver.disconnect();
		this._oObserver = undefined;

	};

	Content.prototype.setProperty = function(sPropertyName, oValue, bSuppressInvalidate) {

		// don't rerender content or parent-container on conditions change. This needs only be updated on
		// content control inside (Table, List, DefineConditionPanel...).
		if (sPropertyName === "conditions" || sPropertyName === "filterValue" || sPropertyName === "config") {
			bSuppressInvalidate = true;
		}

		return Element.prototype.setProperty.apply(this, [sPropertyName, oValue, bSuppressInvalidate]);

	};


	/**
	 * Gets the content controls
	 *
	 * @returns {Promise<sap.ui.core.Control>} This promise resolves after the content is created
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getContent = function () {

	};

	/**
	 * Provides a configuration map for supported containers
	 *
	 * @example
	 * 	// Example configuration:
	 * 	{
	 *		'sap.ui.mdc.valuehelp.MyCustomContainer': {
	 *			showArrow: true,
	 *			showHeader: true,
 				getFooter: function () { Promise.resolve(oFooter); },
	 *			getContentWidth: function () { return "500px"; },
	 			getContentHeight: function () { ... },
	 *		}
	 *	}
	 * @returns {object|undefined} if available, a container configuration object is returned.
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getContainerConfig = function () {

	};

	/**
	 * Finalize content before it is shown
	 * @param {boolean} bInitial Indicates, if the content is to be shown for the first time since it's container opened.
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.onBeforeShow = function (bInitial) {

	};

	/**
	 * Called if the content will be shown.
	 *
	 * @param {boolean} bInitial Indicates, if the content is shown for the first time since it's container opened.
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.onShow = function (bInitial) {
		this._bVisible = true;
		this.handleConditionsUpdate();
		//this.handleFilterValueUpdate();
	};

	/**
	 * Getter for the initial focusable <code>control</code> on the panel.
	 *
	 * @returns {sap.ui.core.Control} Control instance which could get the focus.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc
	 */
	Content.prototype.getInitialFocusedControl = function() {
		return null;
	};

	/**
	 * Called if the content will be hidden.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.onHide = function () {
		this._bVisible = false;
	};

	/**
	 * Determines the item (key and description) for a given value.
	 *
	 * The content checks if there is an item with a key or description that fits this value.
	 *
	 * <b>Note:</b> This function must only be called by the <code>Container</code> element.
	 *
	 * @param {sap.ui.mdc.valuehelp.base.ItemForValueConfiguration} oConfig Configuration
	 * @returns {Promise<sap.ui.mdc.valuehelp.ValueHelpItem>} Promise returning object containing description, key and payload.
	 * @throws {sap.ui.model.FormatException|sap.ui.model.ParseException} if entry is not found or not unique
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getItemForValue = function (oConfig) {
		return undefined;
	};

	/**
	 * Defines if the content can be used for input validation.
	 *
	 * @returns {boolean} True if content can be used for input validation
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.isValidationSupported = function() { // TODO only for TypeAhead content
		return false;
	};

	/**
	 * Returns the sap.ui.core.ScrollEnablement delegate which is used with this control.
	 * @returns {sap.ui.core.ScrollEnablement} The scroll enablement delegate
	 * @private
	 */
	Content.prototype.getScrollDelegate = function() {
		var oContainer = this.getParent();
		return oContainer && oContainer.getScrollDelegate();
	};

	/**
	 * Observes property and aggregation changes
	 * @param {object} oChanges Change
	 * @protected
	 */
	Content.prototype.observeChanges = function(oChanges) {
		if (oChanges.name === "conditions") {
			this.handleConditionsUpdate(oChanges);
		}

		if (oChanges.name === "filterValue") {
			this.handleFilterValueUpdate(oChanges);
		}

		if (oChanges.name === "config") {
			_configChanged.call(this, oChanges.current);
		}
	};

	/**
	 * Called if the <code>filterValue</code> property changed
	 * @param {object} oChanges Change
	 * @protected
	 */
	Content.prototype.handleFilterValueUpdate = function(oChanges) {
		if (this.isContainerOpen() && this.isTypeahead()) {
			var oDelegate = this.getValueHelpDelegate();
			var oDelegatePayload = this.getValueHelpDelegatePayload();

			// Everytime the filterValue changes, we consult the delegate again to decide if the typeahead should still be shown or hidden via a cancel event
			// Please also see the default implementation of sap.ui.mdc.ValueHelpDelegate.showTypeahead
			Promise.resolve(!!oDelegate && oDelegate.showTypeahead(oDelegatePayload, this)).then(function (bShowTypeahead) {
				if (!bShowTypeahead) {
					this.fireCancel();
				}
			}.bind(this));
		}
	};

	/**
	 * Called if the <code>conditions</code> property changed
	 * @param {object} oChanges Change
	 * @protected
	 */
	Content.prototype.handleConditionsUpdate = function(oChanges) {

	};

	/**
	 * Creates a condition based on the used operator.
	 *
	 * @param {any} vValue Value of the condition. For item conditions this must be the key.
	 * @param {string} [sDescription] Description of the operator
	 * @param {object} [oPayload] payload
	 * @returns {sap.ui.mdc.condition.ConditionObject} The new condition object with the maintained operator along with <code>sKey</code> and <code>sDescription</code> as <code>aValues</code>
	 * @protected
	 */
	Content.prototype.createCondition = function(vValue, sDescription, oPayload) {

		var oOperator = _getOperator.call(this);

		var aValues = [vValue];
		if (oOperator.valueTypes.length > 1 && oOperator.valueTypes[1] !== Operator.ValueType.Static && sDescription !== null && sDescription !== undefined) {
			// description is supported
			aValues.push(sDescription);
		}

		return Condition.createCondition(oOperator.name, aValues, undefined, undefined, ConditionValidated.Validated, oPayload); // Conditions from help are always validated
	};

	/**
	 * The focus visualization of the field help needs to be removed as the user starts typing into the field.
	 *
	 * Only needed for typeahead.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valueHelp.base.Container
	 */
	Content.prototype.removeFocus = function() {

	};

	/**
	 * Triggers navigation in the content.
	 *
	 * As this could be asyncron as data might be loaded a promise is returned.
	 *
	 * <b>Note:</b> This function must only be called by the <code>Container</code> element.
	 *
	 * @param {int} iStep Number of steps for navigation (e.g. 1 means next item, -1 means previous item)
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valueHelp.base.Container
	 */
	Content.prototype.navigate = function(iStep) {

	};

	Content.prototype.getUIArea = function() {
		// Table, List or other content might be rerendered. In this case the corresponding UIArea is the one of the Popover or Dialog, not the one of the parents.
		var oContainer = this.getParent();
		if (oContainer && oContainer.getUIAreaForContent) {
			return oContainer.getUIAreaForContent();
		}

		return Element.prototype.getUIArea.apply(this, arguments);
	};

	/**
	 * Determines if the container of the content is used as typeAhead inside the value help
	 *
	 * <b>Note:</b> This function is used by the content and must not be used from outside
	 *
	 * @returns {boolean} True if used as typeahead
	 * @protected
	 */
	Content.prototype.isTypeahead = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.isTypeahead();
	};

	/**
	 * Determines if the content supports search
	 *
	 * <b>Note:</b> This function is used by the container and content and must not be used from outside
	 *
	 * @returns {boolean} Flag if searching is supported
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valueHelp.base.Container
	 */
	Content.prototype.isSearchSupported = function () {
		return false;
	};

	/**
	 * Determines if the the content needs to provide a scrolling mechanism like a
	 * {@link sap.m.ScrollContainer ScrollContainer}
	 *
	 * <b>Note:</b> This function is used by the content and must not be used from outside
	 *
	 * @returns {boolean} True a scrolling mechanism is needed
	 * @protected
	 */
	Content.prototype.provideScrolling = function () {
		var oContainer = this.getParent();
		return !oContainer || !oContainer.providesScrolling();
	};

	/**
	 * Checks if the parent container is open
	 * @returns {boolean} <code>true</code> if open
	 * @protected
	 */
	Content.prototype.isContainerOpen = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.isOpen();
	};

	/**
	 * Checks if the parent container is opening
	 * @returns {boolean} <code>true</code> if opening
	 * @protected
	 */
	Content.prototype.isContainerOpening = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.isOpening();
	};

	/**
	 * returns the used <code>ValueHelpDelegate</code>
	 * @returns {sap.ui.mdc.BaseDelegate} <code>Delegate</code> module
	 * @throws Throws an error if the delegate module is not available
	 * @protected
	 */
	Content.prototype.getValueHelpDelegate = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.getValueHelpDelegate();
	};

	/**
	 * Determines the delegate payload of the value help
	 * @returns {object} payload
	 * @protected
	 */
	Content.prototype.getValueHelpDelegatePayload = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.getValueHelpDelegatePayload();
	};

	/**
	 * Provides access to the delegate initialization <code>Promise</code> of the value help.
	 * @returns {Promise} <code>Promise</code> reflecting the delegate initialization
	 * @throws Throws an error if the delegate module is not available
	 * @protected
	 */
	Content.prototype.awaitValueHelpDelegate = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.awaitValueHelpDelegate();
	};

	/**
	 * Determines if delegate of the value help is initialized
	 * @returns {boolean} True if delegate is initialized
	 * @protected
	 */
	Content.prototype.isValueHelpDelegateInitialized = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.isValueHelpDelegateInitialized();
	};

	/**
	 * Returns control connected to value help
	 * @returns {sap.ui.core.Control} connected control
	 * @protected
	 */
	Content.prototype.getControl = function () {
		var oContainer = this.getParent();
		return oContainer && oContainer.getControl();
	};

	/**
	 * Gets the number of conditions relevant for the current content
	 * @param {sap.ui.mdc.condition.ConditionObject[]} aConditions Array of conditions
	 * @returns {int} count
	 */
	Content.prototype.getCount = function (aConditions) {
		return 0;
	};

	/**
	 * Return the value help icon that should be used for the field.
	 *
	 * <b>Note</b> This function needs only to be implemented for <code>Content</code>
	 * implementing the <code>sap.ui.mdc.valuehelp.Popover</code> container.
	 * On dialogs the <code>sap.ui.mdc.valuehelp.Dialog</code> container defines the icon, as it could have multiple contents.
	 *
	 * @returns {null|string} Name of the icon for this content. If <code>null</code> this content will not be used as value help and could only be used as typeahead.
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getValueHelpIcon = function() {
	};

	//TODO: define aria attribute object
	/**
	 * Returns the aria attributes the field needs from the value help
	 *
	 * <b>Note</b> This function needs only to be implemented for <code>Content</code>
	 * implementing the <code>sap.ui.mdc.valuehelp.Popover</code> container.
	 * On dialogs the <code>Dialog</code> container defines the attributes, as it could have multiple contents.
	 *
	 * @param {int} iMaxConditions maximal conditions allowed (as ValueHelp might not be connected to a field)
	 * @returns {object} object with the aria-attibutes
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getAriaAttributes = function(iMaxConditions) {

		return { // return default values, but needs to be implemented by specific content
			contentId: null,
			ariaHasPopup: "listbox",
			roleDescription: null
		};

	};

	/**
	 * Returns if the value help is used for single selection
	 * @returns {boolean} <code>true</code> id single seletion
	 * @protected
	 */
	Content.prototype.isSingleSelect = function () {
		return this.getMaxConditions() === 1;
	};

	/**
	 * Determines if the value help should be opened when the user clicks into the connected control.
	 *
	 * @returns {boolean} If <code>true</code>, the value help should open when user clicks into the connected field control
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.shouldOpenOnClick = function() {
		return false;
	};

	/**
	 * Determines if the value help should be opened when the user used the arrow keys.
	 * By default closed navigation is only enabled for single select scenarios
	 *
	 * @returns {boolean} If <code>true</code>, the value help should open when user used the arrow keys in the connected field control
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.shouldOpenOnNavigate = function() {
		return !this.isSingleSelect();
	};

	/**
	 * Determines if navigation via arrow keys should be possible.
	 *
	 * In ComboBox-like case keyboard-navigation should be anabled if closed and if open.
	 * If only typeahead is used (and maybe an value help dialog) keyboard-navigation schould be enabled only if typeahed is open.
	 *
	 * As not all rowas might be loaded navigation with home, end, page up or dowm might be disabled, depending of the used content.
	 *
	 * @param {int} iStep Number of steps for navigation (e.g. 1 means next item, -1 means previous item)
	 *
	 * @returns {boolean} If <code>true</code>, the navigation should be enabled if value help is closed
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.isNavigationEnabled = function(iStep) {
		return false; // enable only for supported Content
	};

	/**
	 * Determines if the focus is set in the value help or stays in the calling control.
	 *
	 * @returns {boolean} if true, focus goes to the value help, if false it stays in the calling control.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.isFocusInHelp = function() {

		return !this.isTypeahead();

	};

	/**
	 * Determines if multiselection is active.
	 *
	 * @returns {boolean} if true, multi-selection is active.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.isMultiSelect = function() {

		return !this.isSingleSelect();

	};

	/**
	 * Determines if quick selection is supported.
	 *
	 * @returns {boolean} if true, quick-selection is supported.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.isQuickSelectSupported = function() {
		return false;
	};

	/**
	 * Determines if value help dialog should show the tokenizer for the content.
	 *
	 * @returns {boolean} if for one content the value is true, the dialog shows the tokenizer.
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	 Content.prototype.getRequiresTokenizer = function() {
		return true;
	};

	/**
	 * This function is called if the <code>config</code> property changed
	 * @param {object} oConfig configuration
	 * @protected
	 */
	function _configChanged(oConfig) {

		_determineOperator.call(this, oConfig.operators);

	}

	function _determineOperator(aOperators) {
		this._oOperator = FilterOperatorUtil.getEQOperator(aOperators); // if no operators provided use default EQ operator
	}

	function _getOperator() {
		return this._oOperator;
	}

	/**
	 * Determines the title used in the <code>TabBar</code> of the dialog.
	 *
	 * <b>Note:</b> This function is used by the container and must not be used from outside
	 *
	 * @param {int} iCount Number of selected items or conditions
	 * @returns {string} title
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getFormattedTitle = function(iCount) {
		var sTitle = this.getTitle();
		if (sTitle) {
			sTitle = formatMessage(sTitle, iCount ? iCount : "");
		}
		return sTitle;
	};

	/**
	 * Determines the title used in the header of the dialog.
	 *
	 * <b>Note:</b> This function is used by the container and must not be used from outside
	 *
	 * @returns {string} title
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getFormattedShortTitle = function() {
		return this.getShortTitle();
	};

	/**
	 * Determines the title used in the header of the dialog for the bottom tokenizer.
	 *
	 * <b>Note:</b> This function is used by the container and must not be used from outside
	 *
	 * @param {int} iCount Number of selected items or conditions
	 * @returns {string} title
	 *
	 * @private
	 * @ui5-restricted sap.ui.mdc.valuehelp.base.Container
	 */
	Content.prototype.getFormattedTokenizerTitle = function(iCount) {
		var sTitle = this.getTokenizerTitle();
		if (sTitle) {
			sTitle = formatMessage(sTitle, iCount ? iCount : "");
		}
		return sTitle;
	};

	/**
	 * Returns if the value help is used for single selection
	 * @returns {boolean} <code>true</code> id single seletion
	 * @protected
	 */
	Content.prototype.getMaxConditions = function() {

		var oConfig = this.getConfig();
		return oConfig && oConfig.maxConditions;

	};

	/**
	 * Performs logic needed if the container closes
	 * @protected
	 */
	Content.prototype.onContainerClose = function() {

	};

	/**
	 * Performs logic needed if the container opens
	 * @protected
	 */
	Content.prototype.onContainerOpen = function() {

	};

	/**
	 * Called if ValueHelp connection to Field changed
	 * @protected
	 */
	Content.prototype.onConnectionChange = function () {
	};

	PromiseMixin.call(Content.prototype);


	return Content;

});
