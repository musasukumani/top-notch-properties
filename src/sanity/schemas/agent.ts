import { defineField, defineType } from "sanity";

export const agent = defineType({
  name: "agent",
  title: "Agent",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "propertiesCount", type: "number" }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(0).max(5) }),
  ],
  preview: {
    select: { title: "name", subtitle: "title", media: "photo" },
  },
});
