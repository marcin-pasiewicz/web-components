class Tooltip extends HTMLElement {
    constructor() {
        super();
        this.tooltipText;
        this.tooltipIcon;
        this.tooltipVisible = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
                <style>
                    div {
                        font-weight: normal;
                        background-color: black;
                        color: white;
                        position: absolute;
                        top: 1.5rem;
                        left: 0.75rem;
                        z-index: 10;
                        padding: 0.15rem;
                        border-radius: 3px;
                        box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
                    }
                    ::slotted(.highlight) {
                        border-bottom: red 1px solid; 
                    }
                    
                    :host {
                        position: relative;
                    }
                    
                    :host(.important) {
                        background: var(--color-primary, #ccc);
                        padding: 0.15rem;
                    }
                    
                    :host-context(p) {
                        font-weight: bold;
                    }
                    
                    .icon {
                        background: black;
                        color: white;
                        padding: 0.15rem 0.5rem;
                        text-align: center;
                        border-radius: 50%;
                    }
                </style>
                <slot>Default</slot>
                <span class="icon">?</span>
        `;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue && name === 'text') {
            this.tooltipText = newValue
        }
    }

    static get observedAttributes() {
        return ['text']
    }

    connectedCallback() {
        this.tooltipText = this.getAttribute('text');
        this.tooltipIcon = this.shadowRoot.querySelector('span');
        this.tooltipIcon.addEventListener('mouseenter', this.showTooltip.bind(this));
        this.tooltipIcon.addEventListener('mouseleave', this.hideTooltip.bind(this));
    }

    render() {
        let tooltipContainer = this.shadowRoot.querySelector('div');
        if (this.tooltipVisible) {
            tooltipContainer = document.createElement('div');
            tooltipContainer.textContent = this.tooltipText;
            this.shadowRoot.appendChild(tooltipContainer)
        } else {
            if (tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer);
            }
        }
    }

    disconnectedCallback() {
        this.removeEventListener('mouseenter', this.showTooltip)
        this.removeEventListener('mouseleave', this.hideTooltip)
    }

    showTooltip() {
        this.tooltipVisible = true;
        this.render()
    }

    hideTooltip() {
        this.tooltipVisible = false;
        this.render()
    }
}

customElements.define('mp-tooltip', Tooltip);
