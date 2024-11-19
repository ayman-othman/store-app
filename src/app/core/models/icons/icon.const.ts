export const ICONS = {
  cart: 'cart',
  search: 'search',
  noResult: 'noResult',
  egyptFlag: 'egyptFlag',
  AmericaFlag: 'americaFlag',
  language: 'language',
  add: 'add',
  minus: 'minus',
  trash: 'trash',
  star: 'star',
  shield: 'shield',
  damaged: 'damaged',
} as const;

export type Icons = (typeof ICONS)[keyof typeof ICONS];
