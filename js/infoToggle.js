class InfoToggle extends HTMLElement {
  constructor() {
    super();
    this.isVisible = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
        <style>
            #info-box {
                display: none;
            }
        </style>
        <button>Show</button>
        <p id="info-box">
            <slot></slot>
        </p>
    `;
    this.toggleButton = this.shadowRoot.querySelector('button');
    this.infoBox = this.shadowRoot.querySelector('#info-box');
    this.toggleButton.addEventListener(
      'click',
      this.toggleInfoBox.bind(this)
    );
  }

  connectedCallback() {
    if (this.hasAttribute('is-visible')) {
      if (this.getAttribute('is-visible') === 'true') {
        this.isVisible = true;
        this.infoBox.style.display = 'block';
        this.toggleButton.textContent = 'Hide';
      }
    }
  }

  toggleInfoBox() {
    this.isVisible = !this.isVisible;
    this.infoBox.style.display = this.isVisible ? 'block' : 'none';
    this.toggleButton.textContent = this.isVisible ? 'Hide' : 'Show';
  }
}

customElements.define('mp-info-toggle', InfoToggle);
