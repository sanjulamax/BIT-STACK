import { defineField , defineType } from "sanity";

export const notes = defineType({
    name: "notes",
    title: "Notes",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
            validation: Rule => Rule.required().max(30).min(5),
           
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title"
            }
        }),
        defineField({
            name: "preview",
            type: "string",
            validation: Rule => Rule.required().max(100).min(10)
            
        }),
        defineField({
            name: "content",
            type: "markdown"
        }),
        
        defineField({
            name: "createdAt",
            type: "datetime",
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
             
            },
            initialValue: () => new Date().toISOString()
        }) ,

        defineField({
            name:"author",
            type : "string"

        }),
        defineField({
            name:"authorEmail",
            type : "string"

        }),
      

        
        defineField({
            name:"pic",
            type : "string"

        }) ,
        defineField({
            name:"tag",
            type : "string"

        }) ,
        defineField({
            name:"picUrl",
            type : "url"

        }) ,
        defineField({
            name:"views",
            type:"array",
            of:[{type:"string"}],
            initialValue:[],
        
           
        }) ,
        defineField({
            name:"likes",
            type:"array",
            of:[{type:"string"}],
            initialValue:[],
        
           
        }) ,


        
        
    ],
    preview: {
        select: {
            title: "title",
            date: "date"
        }
    }
})