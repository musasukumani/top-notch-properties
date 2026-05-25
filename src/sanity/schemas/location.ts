import { defineField, defineType } from "sanity";

export const location = defineType({
  name: "location",
  title: "Location",
  type: "document",
  fields: [
    defineField({ name: "city", type: "string", validation: (r) => r.required() }),
    defineField({ name: "country", type: "string", validation: (r) => r.required() }),
    defineField({ name: "image", type: "image", options: { hotspot: true } }),
    defineField({ name: "listingsCount", type: "number" }),
  ],
  preview: {
    select: { title: "city", subtitle: "country", media: "image" },
  },
});
