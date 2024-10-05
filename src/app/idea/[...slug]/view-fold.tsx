import NavView from "@/components/nav/nav-view"

export default function FoldView({ slug }: { slug: Array<string> }) {
  return NavView({ root: `./idea/${slug.join("/")}` })
}