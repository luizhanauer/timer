export class FaviconService {
  public static updateFavicon(color: string): void {
    const svgContent = this.generateSvgString(color);
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
    
    this.injectIntoDOM(dataUrl);
  }

  private static generateSvgString(color: string): string {
    return `
      <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="20" fill="#000000"/>
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <g stroke="${color}" stroke-width="4" fill="none" filter="url(#neon-glow)">
          <circle cx="50" cy="55" r="30" />
          <path d="M40 20 H60" stroke-linecap="round" />
          <path d="M50 20 V25" stroke-linecap="round" />
          <path d="M50 55 L65 40" stroke-linecap="round" />
          <circle cx="50" cy="32" r="1" fill="${color}" />
          <circle cx="73" cy="55" r="1" fill="${color}" />
          <circle cx="50" cy="78" r="1" fill="${color}" />
          <circle cx="27" cy="55" r="1" fill="${color}" />
        </g>
      </svg>
    `.trim();
  }

  private static injectIntoDOM(dataUrl: string): void {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="icon"]');
    
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    
    link.type = 'image/svg+xml';
    link.href = dataUrl;
  }
}