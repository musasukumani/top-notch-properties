import { defineField, defineType } from "sanity";

export const homepageSettings = defineType({
  name: "homepageSettings",
  title: "Homepage Settings",
  type: "document",
  fields: [
    defineField({ name: "heroImage", title: "Hero background image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroHeadline", type: "string" }),
    defineField({ name: "heroSubheading", type: "text", rows: 2 }),
    defineField({
      name: "stats",
      type: "array",
      of: [{
        name: "stat",
        type: "object",
        fields: [
          defineField({ name: "value", type: "string" }),
          defineField({ name: "label", type: "string" }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
    defineField({ name: "ctaHeading", type: "string" }),
    defineField({ name: "ctaSubheading", type: "string" }),
    defineField({ name: "ctaBody", type: "text", rows: 2 }),
    defineField({ name: "appStoreUrl", type: "url" }),
    defineField({ name: "playStoreUrl", type: "url" }),
  ],
});
