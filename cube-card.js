import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-styles/paper-styles-classes.js';
import '@webcomponents/shadycss/apply-shim.min.js'

class CubeCard extends PolymerElement {
  static get is() {return 'cube-card';}

  static get template()
  {
    return html`<style>
      :host {
        width: 100%;
        min-width: 300px;
        display: inline-block;
        background: #FFFFFF;
        @apply --theme-100;
        @apply --text-primary;
        @apply --paper-font-body1;
        @apply --shadow-transition;
        @apply --shadow-elevation-2dp;
        order: var(--card-order, 1000);
        transition: box-shadow 300ms;
        border-radius: 2px;
      }

      :host(:hover) {
        @apply --shadow-elevation-3dp;
      }

      :host #header {
        overflow: hidden;
        border-bottom: 1px solid var(--divider-secondary-color);
        position: relative;
        margin-bottom: 16px;

        display: flex;
        justify-content: space-between;
      }

      :host #headerText {
        padding: 0 16px 0 16px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      #headerBox {
        display: flex;
        justify-content: flex-end;
        background-position: center;
        background-size: cover;
        min-width: 40%;
      }

      #header h1 {
        @apply --paper-font-title;
        font-weight: normal;
        margin: 0 0 5px;
        white-space: normal;
      }

      #header h2 {
        @apply --paper-font-body1;
        margin: 0 0 5px;
      }

      :host #headerBox {
        background-size: cover;
      }

      #content::slotted(cube-action),
      #legal ::slotted(cube-action) {
        box-sizing: border-box;
        border-top: 1px solid var(--divider-secondary-color);
        width: 100%;
      }

      #legal ::slotted(*),
      #legal span {
        font-size: 12px;
        line-height: 14px;
        display: block;
        text-align: right;
        @apply --text-secondary;
      }

      #legal span {
        margin: 0;
        box-sizing: border-box;
        border-top: 1px solid var(--divider-secondary-color);
        width: 100%;
        padding: 5px;
        line-height: 18px;
      }

      #legal span cube-icon {
        --cube-icon-padding: 0 3px 2px 3px;
        vertical-align: middle;
      }

      #content::slotted(cube-action) {
        padding-left: 16px;
        line-height: 34px;
        color: var(--accent-400-color);
      }

      #content::slotted(cube-action[icon]) {
        padding-left: 6px;
      }

      #toolbar {
        display: flex;
      }

      #options {
        visibility: hidden;
      }

      :host(:hover) #options {
        visibility: visible;
      }

      #toolbar {
        background: var(--theme-400-color);
        border-bottom: 1px solid var(--divider-secondary-color);
      }

      #toolbar cube-action {
        margin: 1px;
      }

      #toolbar cube-icon {
        margin: 7px 11px;
        @apply --text-secondary;
      }

      #toolbar h1 {
        @apply --paper-font-body2;
        display: inline-flex;
        flex-grow: 1;
        @apply --text-secondary;
      }

      #toolbar h1 span {
        @apply --paper-font-caption;
        padding-left: 5px;
      }

      #toolbar,
      #toolbar h1,
      #toolbar h1 span {
        line-height: 48px;
        margin: 0;
      }

    </style>

    <div id="toolbar">
      <cube-icon icon="[[icon]]"></cube-icon>
      <h1>[[title]]<span class="time">[[ updateTime ]]</span></h1>
      <cube-action id="options" icon="icons:more-vert"></cube-action>
    </div>

    <div id="card">
      <template is="dom-if" if="[[header]]">
        <div id="header">
          <div id="headerText">
            <h1>[[header]]</h1>
            <template is="dom-if" if="[[subHeader]]">
              <h2>[[subHeader]]</h2>
            </template>
          </div>
          <div id="headerBox" style="background-image:url([[thumbnail]])">
            <slot name="overview"></slot>
          </div>
        </div>
      </template>

      <slot id="content"></slot>
      <div id="legal">
        <slot name="legal"></slot>
        <template is="dom-if" if="[[appName]]">
          <span>
            <strong>[[ appName ]]</strong> by <em>[[vendorName]]</em>
            <cube-icon size="16" icon="[[appIcon]]"></cube-icon>
          </span>
        </template>

      </div>
    </div>`;
  }

  static get properties()
  {
    return {
      icon:       {type: String},
      title:      {type: String},
      header:     {type: String},
      subHeader:  {type: String},
      thumbnail:  {type: String},
      appId:      {type: String},
      appName:    {type: String},
      appIcon:    {type: String},
      vendorName: {type: String},
      time:       {type: String},//- 17 mins
      order:      {type: Number, observer: "_updateOrder"}
    }
  }

  _updateOrder(val)
  {
    this.updateStyles({'--card-order': val});
  }
}

customElements.define(CubeCard.is, CubeCard);