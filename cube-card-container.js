import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';

class CubeCardContainer extends PolymerElement {
  static get is() {return 'cube-card-container'}

  static get template()
  {
    return html`
    <style>
      :host {
        display: block;
        margin: 8px;
      }

      #columns {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-content: space-between;
        flex-basis: 33%;
      }

      #columns > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 8px;

        text-align: center;
        flex: 1 0;
      }

      #columns > div ::slotted(*) {
        max-width: initial;
        text-align: left;
        margin-bottom: 16px;
      }

    </style>
    <div id="columns">
      <div>
        <slot name="one"></slot>
        <slot name="now"></slot>
      </div>
      <div>
        <slot name="two"></slot>
        <slot name="next"></slot>
      </div>
      <div>
        <slot name="three"></slot>
        <slot name="past"></slot>
      </div>
    </div>
    <slot></slot>
`
  }
}

customElements.define(CubeCardContainer.is, CubeCardContainer);