import { Component, State } from '@stencil/core';

@Component({
  tag: 'docs-header',
  styleUrl: 'header.css'
})
export class DocsHeader {
  @State() hidden = false;
  private frameRequested = false;
  private prevScroll = 0;

  componentDidLoad() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUnload() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    if (!this.frameRequested) {
      requestAnimationFrame(() => {
        const { scrollY, innerHeight } = window;
        const { height } = document.body.getBoundingClientRect();
        const maxScroll = height - innerHeight - 60;
        this.hidden = scrollY > 60 && scrollY > this.prevScroll || scrollY > maxScroll;
        this.prevScroll = scrollY;
        this.frameRequested = false;
      });
      this.frameRequested = true;
    }
  }

  hostData() {
    return {
      class: { hidden: this.hidden }
    };
  }

  render() {
    return (
      <header>
        <stencil-route-link url="/docs/">
          <Logo/>
        </stencil-route-link>
      </header>
    );
  }
}

const Logo = () => (
  <svg class="Logo" fill="currentColor" viewBox="0 0 78 25">
    <title>Ionic Docs</title>
    <path d="M19.8517 8.01728C21.2289 8.01728 22.3454 6.9008 22.3454 5.52354C22.3454 4.14628 21.2289 3.02979 19.8517 3.02979C18.4744 3.02979 17.3579 4.14628 17.3579 5.52354C17.3579 6.9008 18.4744 8.01728 19.8517 8.01728Z"/>
    <path d="M22.9219 8.02656L22.8187 7.79688L22.65 7.98438C22.2422 8.44844 21.7219 8.80469 21.1453 9.02031L20.9859 9.08125L21.0516 9.23594C21.5484 10.4312 21.8016 11.6969 21.8016 12.9953C21.8016 18.4 17.4047 22.8016 11.9953 22.8016C6.58594 22.8016 2.19375 18.4047 2.19375 13C2.19375 7.59531 6.59531 3.19375 12 3.19375C13.4672 3.19375 14.8828 3.5125 16.2 4.14062L16.3547 4.21562L16.4203 4.06094C16.6594 3.49844 17.0437 2.99687 17.5266 2.60781L17.7234 2.44844L17.4984 2.33125C15.7875 1.45 13.9359 1 12 1C5.38125 1 0 6.38125 0 13C0 19.6187 5.38125 25 12 25C18.6187 25 24 19.6187 24 13C24 11.2703 23.6391 9.59687 22.9219 8.02656Z"/>
    <path d="M12.1829 7.53447C9.02353 7.43134 6.43134 10.0235 6.53447 13.1829C6.62822 16.047 8.95322 18.3767 11.8173 18.4657C14.9767 18.5688 17.5688 15.9767 17.4657 12.8173C17.372 9.95322 15.047 7.62822 12.1829 7.53447Z"/>
    <text style="white-space: pre" font-size="18" font-weight="bold" letter-spacing="-0.02em"><tspan x="30" y="19.98">Docs</tspan></text>
  </svg>
);
