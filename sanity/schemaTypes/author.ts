import { defineType , defineField } from "sanity";

export const  author = defineType({
    name:"author",
    title:"Author",
    type:"document",
    fields:[
        defineField({
            name:"name",
            type:"string"
        }),
        defineField({
            name:"email",
            type:"email"
        }),
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:"email"
            }
        }),
        defineField({
            name:"bio",
            type:"text"
        }),
        defineField({
            name:"image",
            type:"image"
        }) ,
        defineField({
            name: "savedPosts",
            type: "array",
            of: [{type: 'string'}],
            initialValue: [],
            validation: (Rule) => Rule.unique()
        }),
    ],
})