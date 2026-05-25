import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "logo", type: "image" }),
    defineField({ name: "contactEmail", type: "string" }),
    defineField({ name: "contactPhone", type: "string" }),
    defineField({ name: "footerTagline", type: "string" }),
    defineField({ name: "twitterUrl", type: "url" }),
    defineField({ name: "instagramUrl", type: "url" }),
    defineField({ name: "facebookUrl", type: "url" }),
    defineField({ name: "linkedinUrl", type: "url" }),
  ],
});
