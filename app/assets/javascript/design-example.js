class DesignExample {

    static selector() {
        return '.design-example';
    }

    constructor(node) {
        this.node = node;
        this.tabClass = 'app-tabs__item';
        this.currentTabClass = this.tabClass + '--current';
        this.hiddenClass = 'js-hidden';
        this.tabs = this.node.querySelectorAll(`.${this.tabClass}`);
        this.examples = this.node.querySelectorAll('.code-snippet__preformatted');
        this.closeButtons = this.node.querySelectorAll('.app-link--close');
        this.copyButtons = this.node.querySelectorAll('.app-link--copy');
      
        this.bindEvents();
    }

    bindEvents() {
        this.tabs.forEach(tab => tab.addEventListener('click', e => this.handleTabClick(e)));

        if (this.closeButtons) {
            this.closeButtons.forEach(closeButton => closeButton.addEventListener('click', e => this.handleCloseClick(e)));
        }

        this.copyButtons.forEach(copyButton => copyButton.addEventListener('click', e => this.handleCopyClick(e)));

    }

    handleTabClick(e) {
        const targetEl = e.target.parentElement;
        const index = targetEl.dataset.index;

        e.preventDefault();

        this.tabs.forEach(tab => {
            if (tab.classList.contains(this.currentTabClass)) {
                tab.classList.remove(this.currentTabClass);
            }
        });

        targetEl.classList.add(this.currentTabClass);

        this.exampleToggler(index);
    }

    handleCloseClick() {
        this.examples.forEach(example => {
            this.hideEl(example);
        });

        this.tabs.forEach(tab => {
            if (tab.classList.contains(this.currentTabClass)) {
                tab.classList.remove(this.currentTabClass);
            }
        });
    }

    // Follows approach from https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
    handleCopyClick(e) {
        e.preventDefault();
        const el = document.createElement('textarea');
        const str = this.node.querySelector('.code-snippet__preformatted:not(.js-hidden) code');
        el.value = str.innerText;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        e.target.innerText = 'Copied';
        setTimeout(() => e.target.innerText = 'Copy', 2500);
    }

    showEl(el) {
        if (el.classList.contains(this.hiddenClass)) {
            el.classList.remove(this.hiddenClass);
        }
    }

    hideEl(el) {
        if (!el.classList.contains(this.hiddenClass)) {
            el.classList.add(this.hiddenClass);
        }
    }

    exampleToggler(index) {
        this.examples.forEach(example => {
            example.dataset.index === index ?
                example.classList.remove(this.hiddenClass) :
                example.classList.add(this.hiddenClass);
        });
    }
}

export default DesignExample;
