import { type CollectionEntry } from "astro:content";

export type Lesson = CollectionEntry<"lessons">;

export namespace Lesson {
  export function slug(lesson: Lesson) {
    return lesson.filePath
      ?.replace(/^src\/learn\//, "")
      ?.replace(      /\.mdx?$/, "");
  }

  export function isDraft(lesson: Lesson) {
    return lesson.data.draft;
  }

  export function compare(a: Lesson, b: Lesson) {
    return a.id !== b.id ? a.id < b.id ? -1 : 1 : 0;
  }
}