import definitions from "./definitions.json";
import { atom   } from "nanostores";
import { reduce } from "lodash";

export const $kept = atom<Array<string>>([])

export function keep(term: string) {
  const kept = $kept.get();
  if(!kept.includes(term))
    $kept.set([...kept, term]);
}

export type Definition = typeof definitions[number];

export function lookup(term: string) {
  return definitions.find((definition) => (
    typeof definition.term === "string"
      ? definition.term ===      term.toLowerCase()
      : definition.term.includes(term.toLowerCase())
  ))
}

export function nameOf(definition: Definition | undefined) {
  return Array.isArray(definition?.term) 
    ? definition.term.join(" / ")
    : definition?.term;
}

export function htmlOf(definition: Definition | undefined) {
  return definition?.html ?? "¯\\_(ツ)_/¯";
}

export function fitb(definition: Definition | undefined) {
  return reduce(array(definition?.term ?? ""), (html, term) => {
    return blank(html, term)
  }, definition?.html ?? "")
}

function array(term: string | Array<string>) {
  return Array.isArray(term) ? term : [term];
}

function blank(html: string, what: string) {
  const blank = " " + new Array(what.length).fill("__").join("") + " "
  const regex = new RegExp(`\\s?${what}\\s?`, "gi")
  return html.replace(regex, blank)
}