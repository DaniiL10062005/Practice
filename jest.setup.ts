/* eslint-disable @typescript-eslint/no-explicit-any */
// jest.setup.ts
import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Полифиллы, которые нужны react-router и другим либам
;(global as any).TextEncoder = TextEncoder
;(global as any).TextDecoder = TextDecoder

// Мок ResizeObserver, которого нет в jsdom
class ResizeObserver {
  callback: ResizeObserverCallback

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
  }

  observe() {}
  unobserve() {}
  disconnect() {}
}

;(global as any).ResizeObserver = ResizeObserver

// Полифилл window.matchMedia для Ant Design (responsiveObserver/useBreakpoint и т.п.)
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // старый API
      removeListener: () => {}, // старый API
      addEventListener: () => {}, // новый API
      removeEventListener: () => {}, // новый API
      dispatchEvent: () => false,
    }),
  })
}

// Мок getComputedStyle (часто нужен для некоторых UI-штук)
Object.defineProperty(window, 'getComputedStyle', {
  value: () =>
    ({
      overflow: 'hidden',
      overflowX: 'hidden',
      overflowY: 'hidden',
      getPropertyValue: () => '',
    } as unknown as CSSStyleDeclaration),
})
