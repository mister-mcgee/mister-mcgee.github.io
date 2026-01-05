import { type CollectionEntry } from "astro:content";

export type Lesson = CollectionEntry<"lessons">;

export namespace Lesson {
  export function slug(lesson: Lesson) {
    return lesson.filePath
      ?.replace(/^src\/learn\//, "")
      ?.replace(      /\.mdx?$/, "");
  }

  export function isDraft(lesson: Lesson) {
    return !!lesson.data.draft;
  }

  export function compare(a: Lesson, b: Lesson) {
    let k;
    if ((k = compareCourse(a, b)) !== 0) return k;
    if ((k = compareDate  (a, b)) !== 0) return k;
    if ((k = compareTitle (a, b)) !== 0) return k;
    return compareId(a, b);
  }
}

function compareCourse(a: Lesson, b: Lesson) {
  if (a.data.course && b.data.course)
    return a.data.course.localeCompare(b.data.course);
  else if (a.data.course && !b.data.course)
    return -1;
  else if (!a.data.course && b.data.course)
    return  1;
  else 
    return  0;
}

function compareTitle(a: Lesson, b: Lesson) {
  if (a.data.title && b.data.title)
    return a.data.title.localeCompare(b.data.title);
  else if (a.data.title && !b.data.title)
    return -1;
  else if (!a.data.title && b.data.title)
    return  1;
  else 
    return  0;
}

function compareDate(a: Lesson, b: Lesson) {
  if (a.data.date && b.data.date)
    return a.data.date != b.data.date ? a.data.date < b.data.date ? -1 : 1 : 0;
  else if (a.data.date && !b.data.date)
    return -1;
  else if (!a.data.date && b.data.date)
    return  1;
  else 
    return  0;
}

function compareId(a: Lesson, b: Lesson) {
  return a.id.localeCompare(b.id);
}