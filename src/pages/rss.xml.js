import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const lessons = await getCollection("lessons")

  function slug(idea) {
    let slug = idea.filePath
    slug = slug?.replace(/^learn\//, "");
    slug = slug?.replace(/\.mdx?$/, "");
    return slug;
  }

  return rss({
    // `<title>` field in output xml
    title: "Mister McGee's Classroom",
    // `<description>` field in output xml
    description: "Robotics & Mechatronics",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: lessons
      .filter(lesson => lesson.data.date)
      .map(lesson => ({
        title      : lesson.data.title,
        date       : lesson.data.date,
        description: lesson.data.description,
        link: `/learn/${slug(lesson)}`,
      })),

    trailingSlash: false,
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,

    stylesheet: "/rss/styles.xsl"
  });
}