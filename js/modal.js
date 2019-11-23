class Modal extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                
                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }
                
                :host([opened]) #modal {
                    top: 15vh;
                }
                
                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    height: 15rem;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                    z-index: 100;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease-out;
                }
                
                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }
                
                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }
                
                #main {
                    padding: 1rem;
                }
                
                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                
                #actions button {
                    margin: 0 0.25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
            <header>
                <slot name="title">Please confirm payment</slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Ok</button>
            </section>
            </div>
        `;
        const backdrop = this.shadowRoot.querySelector('#backdrop');
        const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
        const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
        backdrop.addEventListener('click', this.cancel.bind(this));
        cancelButton.addEventListener('click', this.cancel.bind(this));
        confirmButton.addEventListener('click', this.confirm.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.isOpen = this.hasAttribute('opened');
    }

    static get observedAttributes() {
        return ['opened']
    }

    open() {
        this.setAttribute('opened', '')
    }

    hide() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened')
        }
    }

    cancel() {
        this.hide();
        const cancelEvent = new Event('cancel')
        this.dispatchEvent(cancelEvent)
    }

    confirm() {
        this.hide();
        const confirmEvent = new Event('confirm')
        this.dispatchEvent(confirmEvent)
    }

}

customElements.define('mp-modal', Modal);
