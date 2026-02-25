import { describe, it, expect } from 'vitest';
import { TimeFormatter } from './TimeFormatter';

describe('TimeFormatter', () => {
  it('deve formatar zero milissegundos como 00:00:00', () => {
    expect(TimeFormatter.formatMilliseconds(0)).toBe('00:00:00');
  });

  it('deve formatar corretamente horas, minutos e segundos', () => {
    // 1 hora = 3600000ms, 1 minuto = 60000ms, 1 segundo = 1000ms
    const totalMs = 3600000 + 60000 + 1000;
    expect(TimeFormatter.formatMilliseconds(totalMs)).toBe('01:01:01');
  });

  it('deve formatar apenas segundos corretamente', () => {
    expect(TimeFormatter.formatMilliseconds(45000)).toBe('00:00:45');
  });

  it('deve retornar 00:00:00 para valores negativos (Early Return Guard)', () => {
    expect(TimeFormatter.formatMilliseconds(-5000)).toBe('00:00:00');
  });
});