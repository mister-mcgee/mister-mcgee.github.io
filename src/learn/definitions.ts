import { atom } from "nanostores";

export const $defined = atom<Array<string>>([ ])

export function define(word: string) {
  const defined = $defined.get();
  if(!defined.includes(word))
    $defined.set([...defined, word]);
}