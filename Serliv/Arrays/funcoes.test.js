// funcoes.test.js
import { describe, it, expect } from 'vitest';
import { somar, media } from './somaEMedia';

describe('Função somar', () => {
  it('deve somar números individuais', () => {
    expect(somar(3, 8)).toBe(11);
  });

  it('deve somar números dentro de array', () => {
    expect(somar([3, 8])).toBe(11);
  });

  it('deve retornar 0 com chamada vazia', () => {
    expect(somar()).toBe(0);
  });
});

describe('Função media', () => {
  it('deve calcular média de números individuais', () => {
    expect(media(3, 8)).toBe(5.5);
  });

  it('deve calcular média de números em array', () => {
    expect(media([3, 8])).toBe(5.5);
  });

  it('deve retornar 0 com chamada vazia', () => {
    expect(media()).toBe(0);
  });
});
