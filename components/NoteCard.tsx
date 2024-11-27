"use client";
import React, { useState } from "react";
import markdownit from "markdown-it";
import { sliceString } from "sanity";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import Form from "next/form";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { Writeclient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import errPic from "../public/404err.png";
import Img from "next/image";

interface Note {
  _id: string;
  title: string;
  content: string;
  _createdAt: string;
  author: string;
  pic: string;
  tag: string;
  preview: string;
  authorEmail: string;
  views: string[];
  likes: string[];
}
interface date {
  date: string;
}

const NoteCard = ({ notes }: { notes: Note[] }) => {
  const md = markdownit({
    html: true,
    breaks: true,
    linkify: true,
  });
  let notePreview = "";
  const [page, setPage] = React.useState(1);
  const numberOfNotesPerPage = 6;

  const { status, data } = useSession();

  const indexOfLastNote = page * numberOfNotesPerPage;
  const indexOfFirstNote = indexOfLastNote - numberOfNotesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
  const count = Math.ceil(notes.length / numberOfNotesPerPage);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const [user, setUser] = useState<any>(null);
  const [postId, setPostId] = useState("");

  React.useEffect(() => {
    const getUser = async () => {
      const userData = await client.fetch(
        `*[_type=='author' && email == $uemail ]{
    _id,  
    
}`,
        { uemail: data?.user?.email || "" }
      );
      setUser(userData);
    };
    if (data?.user?.email) {
      getUser();
    }
  }, [data?.user?.email]);

  const savePosts = async (noteId: any) => {
    if (data?.user?.email != null) {
      Writeclient.patch(user[0]._id)
        .setIfMissing({ savedPosts: [] })
        .append("savedPosts", [noteId])
        .commit({
          autoGenerateArrayKeys: true,
        })
        .then((res) => {
          console.log("Post saved successfully");
        })
        .catch((err) => {
          console.error("Error saving post:", err);
        });
    }
  };

  return (
    <>
      {currentNotes.length === 0 && (
        <div className=" flex justify-center flex-col align-middle items-center text-center text-white">
          <h1 className="text-4xl font-bold mb-2">No Notes Found</h1>
          <p>Please Try Another Keyword</p>
          <Img src={errPic} width="500" height="500" alt="404" />
        </div>
      )}{" "}
      <div className="z-0 grid grid-cols-1 md:grid-cols-3 gap-6 p-4 ">
        {currentNotes.map((note: Note) => {
          console.log(note.preview);

          if (!(note.preview === null)) {
            notePreview = md.render(note.preview);
            console.log("Hi I Am Preview");
          }
          const date = new Date(note._createdAt);
          return (
            <div
              key={note._id}
              className="bg-white/10    mb-[10%] z-0 min-h-fit backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-transparent  hover:border-green-600"
            >
              {" "}
              <div className="absolute -right-4 top-[-2%] transform bg-gray-800 rounded-lg px-3 py-1 flex items-center max-[431px]:text-sm max-[431px]:-right-4  max-[431px]:w-fit max-[431px]:top-[-2%]">
                <i className="fas fa-eye"></i>
                <span className="ml-2">
                  {note?.views?.length / 2 || 0} views
                </span>
                <span className="ml-2">{note?.likes?.length || 0} Likes</span>
              </div>
              <Link href={`/NotPanel/${note._id}`}>
                <h2 className=" flex text-2xl font-bold mb-4 text-white  h-[13%] max-[431px]:text-xl max-[431px]:h-[10%]">
                  {note.title}
                </h2>
                {note.preview && (
                  <article
                    className="max-[431px]:h-28 h-24 overflow-hidden line-clamp-3 prose prose-invert prose-headings:text-white prose-p:text-gray-200 prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-300 max-w-none"
                    dangerouslySetInnerHTML={{ __html: notePreview }}
                  />
                )}
                <div className="flex justify-center text-right mt-4">
                  {note.pic && (
                    <CldImage
                      src={note.pic}
                      width="500"
                      height="500"
                      alt="pic"
                      className="w-full h-64 object-cover rounded-xl"
                    />
                  )}
                </div>{" "}
              </Link>
              <div className="text-right mt-4 text-purple-600">
                {note.authorEmail === data?.user?.email ? (
                  <Link href="/MySpace">
                    {" "}
                    <i className="fas fa-user"></i>
                    <span> </span> {note.author}
                  </Link>
                ) : (
                  <Form action="/UserNotes">
                    <input
                      type="text"
                      name="userId"
                      defaultValue={note.authorEmail}
                      hidden
                    />

                    <button type="submit" className="text-blue-500">
                      {" "}
                      <i className="fas fa-user"></i>
                      <span> </span> {note.author}
                    </button>
                  </Form>
                )}
              </div>
              <div className="text-right mt-4 text-yellow-400">
                <p>
                  <i className="fas fa-calendar-alt"></i>
                  <span> </span>{" "}
                  {date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at{" "}
                  {date.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-right mt-4 flex justify-between">
                {status === "authenticated" && (
                  <>
                    <button
                      onClick={() => {
                        savePosts(note._id);
                        const messageDiv = document.createElement("div");
                        messageDiv.innerHTML = "Saved successfully";
                        messageDiv.className =
                          "fixed  bottom-4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-lg";
                        document.body.appendChild(messageDiv);
                        setTimeout(() => {
                          messageDiv.remove();
                        }, 2000);
                      }}
                      className=" border-2 border-white px-4 py-2 text-sm transition-colors duration-200   hover:border-blue-500 hover:bg-blue-500 hover:text-white  rounded-lg"
                    >
                      <FontAwesomeIcon icon={faSave} className="mr-2" />
                      Save
                    </button>
                  </>
                )}

                <Form className="" action="/SearchPage">
                  <input
                    type="hidden"
                    name="searchValue"
                    defaultValue={note.tag}
                  />
                  <button
                    type="submit"
                    className=" border-2 border-white px-4 py-2 text-sm transition-colors duration-200   hover:border-white hover:bg-white hover:text-black  rounded-lg"
                  >
                    {note.tag}
                  </button>
                </Form>
              </div>
            </div>
          );
        })}
      </div>
      <Stack spacing={2} alignItems="center" className="my-10">
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white",
              borderColor: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
              "&.Mui-selected": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
            },
          }}
        />
      </Stack>
    </>
  );
};

export default NoteCard;
