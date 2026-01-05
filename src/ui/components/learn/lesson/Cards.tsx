import Card from "./Card";

export default function Cards({ lessons }: { lessons: Array<{
  title  ?: string;
  course ?: string;
  author ?: string;
  tags   ?: Array<string>;
  date   ?: Date;
  draft  ?: boolean;
  slug   ?: string;
}> }) {
  return <>{
    lessons.map(lesson => <Card key={lesson.slug} {...lesson}/>)
  }</>
}