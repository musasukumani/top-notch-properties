import { defineField, defineType } from "sanity";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "price", type: "number", validation: (r) => r.required() }),
    defineField({
      name: "priceUnit",
      type: "string",
      options: { list: [{ title: "Per month", value: "month" }, { title: "Per year", value: "year" }, { title: "Total (sale)", value: "sale" }] },
    }),
    defineField({
      name: "status",
      type: "string",
      options: { list: ["for-sale", "for-rent"] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: { list: ["apartment", "villa", "commercial", "warehouse", "penthouse", "house"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "city", type: "reference", to: [{ type: "location" }] }),
    defineField({ name: "address", type: "string" }),
    defineField({ name: "bedrooms", type: "number" }),
    defineField({ name: "bathrooms", type: "number" }),
    defineField({ name: "area", type: "number" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "rating", type: "number", validation: (r) => r.min(0).max(5) }),
    defineField({ name: "reviewCount", type: "number" }),
    defineField({ name: "yearBuilt", type: "number" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "amenities", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "image", title: "Main image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "image" },
  },
});
