import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "avatar", type: "image", options: { hotspot: true } }),
    defineField({ name: "content", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "rating", type: "number", validation: (r) => r.required().min(1).max(5) }),
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "avatar" },
  },
});
