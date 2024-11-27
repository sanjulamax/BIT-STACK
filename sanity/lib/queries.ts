import { defineQuery } from "next-sanity";
import { createClient } from "next-sanity";

export const getNotes = defineQuery(`*[_type=='notes'  ] | order(_createdAt desc) {

  _id,
    slug ,
    title ,
    content , 
    _createdAt,
    author,
    pic ,
    tag,
    preview,
    authorEmail,
    views,
    likes
}
    `)



export const writeNotes = defineQuery(`
  *[_type=='notes' && defined(slug.current)]{
    _id,
    slug ,
    title ,
    content , 
    _createdAt,
     authorId
  }
  `)
  export const getUsers = defineQuery(`
    *[_type=='author' && email == $uemail ]{
      _id,  
      name,
      email,
      slug,
  }`) 

  export const searchNotes = defineQuery(`*[_type=='notes' && title match $searchValue + '*' || author match $searchValue + '*' || tag match $searchValue + '*'  ]| order(_createdAt desc){

    _id,
      slug ,
      title ,
      content , 
      _createdAt,
      author,
      pic ,
       tag,
       preview,
        authorId,
        views,
            likes
  }
      `)

      export const getOneNote  = defineQuery(`*[_type=='notes' && _id match $id  ]{

        _id,
          slug ,
          title ,
          content , 
          _createdAt,
          author,
          pic ,
           tag,
           preview,
           picUrl ,
            authorId ,
            authorEmail,
            views,
                likes
      }
          `)

          export const getByTag = defineQuery(`*[_type=='notes' && tag match $tag   ] | order(_createdAt desc){

            _id,
              slug ,
              title ,   
              content , 
              _createdAt,
              author,
              pic ,
               tag,
               preview ,
                authorId,
                views ,
                    likes
          }
              `)

              export const getNotesByAuthor = defineQuery(`*[_type=='notes' && authorEmail match $authorEmail   ] | order(_createdAt desc){
                  
                  _id,
                    slug ,
                    title ,   
                    content , 
                    _createdAt,
                    author,
                    pic ,
                    tag,
                    preview ,
                      authorEmail ,
                      views ,
                          likes
                }
                    `)


                    export const getSavedPosts = defineQuery(`
                      *[_type=='author' && email match $email ] | order(_createdAt desc){
         
                        savedPosts []
                      } 
                      `
                    )

            export const checkViews = defineQuery(`
            *[_type=='notes' && _id == $id ]{
              _id,
              views[]
            }
            `)

            
            export const checklikes = defineQuery(`
              *[_type=='notes' && _id == $id ]{
                _id,
                likes[]
              }
              `)


                    
    

  
  

