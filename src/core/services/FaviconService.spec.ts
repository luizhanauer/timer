import { describe, it, expect, beforeEach } from 'vitest';
import { FaviconService } from './FaviconService';

describe('FaviconService', () => {
  beforeEach(() => {
    // Limpa o cabeçalho do documento simulado antes de cada teste
    document.head.innerHTML = '';
  });

  it('deve criar uma nova tag link se não existir nenhuma', () => {
    const color = '#FF0000';
    FaviconService.updateFavicon(color);

    const linkElement = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    
    expect(linkElement).not.toBeNull();
    expect(linkElement.type).toBe('image/svg+xml');
    // Verifica se a cor foi injetada no SVG codificado
    expect(linkElement.href).toContain(encodeURIComponent(color));
  });

  it('deve atualizar a tag link existente em vez de criar duplicados', () => {
    // Cria uma tag link preexistente
    const existingLink = document.createElement('link');
    existingLink.rel = 'icon';
    existingLink.href = 'old-icon.png';
    document.head.appendChild(existingLink);

    FaviconService.updateFavicon('#00FF00');

    const links = document.querySelectorAll('link[rel="icon"]');
    
    // Garante que não criou duplicados
    expect(links.length).toBe(1);
    
    // Garante que o href foi atualizado com o novo SVG
    const updatedLink = links[0] as HTMLLinkElement;
    expect(updatedLink.href).toContain(encodeURIComponent('#00FF00'));
    expect(updatedLink.href).not.toBe('old-icon.png');
  });
});