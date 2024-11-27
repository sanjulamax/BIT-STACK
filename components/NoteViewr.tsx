"use client";
import { CldImage } from "next-cloudinary";
import MarkdownIt from "markdown-it";
import "../app/globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import Form from "next/form";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { useEffect, useState } from "react";
import { Writeclient } from "@/sanity/lib/write-client";

interface Note {
  _id: string;
  title: string;
  content: string;
  _createdAt: string;

  author: string;
  preview: string;
  pic: string;
  picUrl: string;
  tag: string;
  authorEmail: string;
  likes: string[];
}

const NoteViewer = ({
  note,
  chviews,
  likes,
}: {
  note: Note[];
  chviews: string[];
  likes: string[];
}) => {
  const { status, data } = useSession();
  const mkd = new MarkdownIt();
  const mkdContent = mkd.render(note[0].content);
  const [viewCount, setViewCount] = useState<number>(0);
  const [viewVerify, setViewVerify] = useState<boolean>(false);
  const [timer] = useState(false);

  const [likeVerify, setLikeVerify] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);
  console.log(likeCount);
  console.log(viewCount);

  const getViews = () => {
    if (data?.user?.email === undefined) {
      return;
    }
    if (
      (data?.user?.email && chviews?.includes(data?.user?.email)) ||
      viewVerify
    ) {
      setViewCount(chviews?.length || 0);

      setViewVerify(false);
    } else {
      setViewVerify(true);

      localStorage.setItem("viewed", data?.user?.email ?? "");

      Writeclient.patch(note[0]._id)
        .setIfMissing({ views: [] })
        .append("views", [data?.user?.email])
        .commit({
          autoGenerateArrayKeys: true,
        })
        .then(() => {
          console.log("");
        })
        .catch((err) => {
          console.error("", err);
        });
      setViewCount(chviews?.length || 0);
    }
  };

  const autoLikeVerify = () => {
    if (data?.user?.email && likes?.includes(data?.user?.email)) {
      setLikeVerify(true);
    }
  };

  const getLikes = () => {
    setLikeVerify(true);

    if (data?.user?.email === undefined) {
      return;
    }
    if (
      (data?.user?.email && likes?.includes(data?.user?.email)) ||
      likeVerify
    ) {
      setLikeCount(likes?.length || 0);
    } else {
      Writeclient.patch(note[0]._id)
        .setIfMissing({ likes: [] })
        .append("likes", [data?.user?.email])
        .commit({
          autoGenerateArrayKeys: true,
        })
        .then(() => {
          console.log("  ");
        })
        .catch((err) => {
          console.error("  ", err);
        });
      setViewCount(likes?.length || 0);
    }
  };

  const removeLikes = () => {
    setLikeVerify(false);
    Writeclient.patch(note[0]._id)
      .setIfMissing({ likes: [] })
      .unset([`likes[@ == "${data?.user?.email}"]`])
      .commit({
        autoGenerateArrayKeys: true,
      })
      .then(() => {
        setLikeVerify(false);
      })
      .catch((err) => {
        console.error("", err);
      });
  };

  useEffect(() => {
    getViews();
    autoLikeVerify();
  }, [note[0]._id, timer]);

  return (
    <>
      <div
        className=" p-10 flex justify-center max-[431px]:p-1 max-[431px]:pt-10"
        style={{
          backgroundImage: `url(${note[0].picUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed", // Add this line
        }}
      >
        <div className="absolute top-2 left-4">
          <Link
            href="/"
            className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <i className="fas fa-home mr-2"></i>
            Home
          </Link>
        </div>

        <div className=" hidden max-[431px]:flex absolute top-0 right-4 ">
          <div className="bg-black/30 hover:bg-black/50 text-white px-4 py-1 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 inline mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {chviews?.length === undefined ? (
              <span>0 views</span>
            ) : (
              <span>{`${chviews.length / 2} views`}</span>
            )}
          </div>
        </div>
        {note.map((noteContents: Note) => {
          return (
            <div
              className="border-2 border-black/10 rounded-xl text-white w-[90%] max-[431px]:w-screen bg-black/20 backdrop-blur-xl  "
              key={noteContents._id}
            >
              <div className="absolute max-[431px]:hidden top-4 right-4">
                <div className="bg-black/30 hover:bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {chviews?.length === undefined ? (
                    <span>0 views</span>
                  ) : (
                    <span>{`${chviews.length / 2} views`}</span>
                  )}
                </div>
              </div>
              <div className="font-extrabold max-[431px]:font-bold max-[431px]:text-3xl max-[431px]:p-1 max-[431px]:pt-5 max-[431px]:flex max-[431px]:text-center text-4xl pt-5 w-full flex justify-center">
                <h1 className="text-white [text-shadow:_3px_3px_3px_rgb(0_0_0)] tracking-wider">
                  {noteContents.title}
                </h1>
              </div>
              <div className="flex justify-center">
                <CldImage
                  src={noteContents.pic}
                  width="1000"
                  height="1000"
                  crop="fill"
                  className="max-[431px]:w-[80%] w-[50%] h-72 mt-5 mb-5 object-cover rounded-xl"
                  alt={""}
                />
              </div>
              <div className="max-[431px]:m-1  border-2 border-white/10 ml-10 mr-10 p-5 bg-black/20 bg-opacity-20 shadow-lg backdrop-blur-lg rounded-xl">
                <article
                  className="prose prose-invert 
            prose-headings:text-white 
            prose-p:text-gray-200 
            prose-p:leading-relaxed 
            prose-p:text-xl 
            prose-a:text-blue-400 
            prose-strong:text-white 
            prose-code:text-blue-300 
            prose-li:text-gray-200
            prose-headings:leading-loose
            prose-headings:tracking-wide
            prose-p:tracking-wide
            max-w-none
            [&>*]:mb-6
            [&>p]:leading-8
            "
                  dangerouslySetInnerHTML={{ __html: mkdContent }}
                  style={{
                    lineHeight: "1.8",
                    letterSpacing: "0.3px",
                  }}
                ></article>
              </div>
              <div className="flex max-[431px]:flex-col justify-end">
                {" "}
                <div className=" pl-2 pr-2 flex justify-end mt-5 ">
                  {status === "authenticated" &&
                    (likeVerify ? (
                      <button
                        className="mr-5 border-2 text-red-500 bg-white border-red-500 h-fit p-1 pl-2 pr-2 rounded-lg hover:border-red-500 hover:bg-transparent flex items-center gap-2"
                        onClick={removeLikes}
                        type="button"
                      >
                        <i className="fas fa-heart text-red-500"></i>
                        Liked
                      </button>
                    ) : (
                      <button
                        className="mr-5 border-2 hover:border-red-500 hover:bg-transparent h-fit p-1 pl-2 pr-2 rounded-lg border-white bg-red-500 flex  hover:text-white items-center gap-2"
                        onClick={getLikes}
                        type="button"
                      >
                        <i className="fas fa-heart text-white hover:text-red-500"></i>
                        Like
                      </button>
                    ))}
                  {noteContents.authorEmail === data?.user?.email ? (
                    <Link href="/MySpace">
                      {" "}
                      <p className="mr-6 bg-green-600 rounded-lg border-white border-2 p-1 h-fit pl-2 pr-2">
                        <i className="fas fa-user"></i>
                        <span> </span> {noteContents.author}
                      </p>
                    </Link>
                  ) : (
                    <>
                      <Form action="/UserNotes">
                        <input
                          type="text"
                          name="userId"
                          defaultValue={noteContents.authorEmail}
                          hidden
                        />

                        <button
                          type="submit"
                          className="mr-6 bg-green-600 rounded-lg border-white border-2 p-1 h-fit pl-2 pr-2"
                        >
                          {" "}
                          <i className="fas fa-user"></i>
                          <span> </span> {noteContents.author}
                        </button>
                      </Form>
                    </>
                  )}
                </div>
                <div className=" pl-2 pr-2 flex justify-end mt-5 ">
                  <p className=" mr-6 rounded-lg bg-yellow-500 border-white border-2 p-1 pl-2 h-fit pr-2 mb-5">
                    <i className="fas fa-calendar-alt mr-2"></i>
                    {new Date(noteContents._createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </div>{" "}
                <div className=" pl-2 pr-2 flex justify-end max-[431px]:mt-0 mt-5 mr-8 ">
                  <Form action="/SearchPage">
                    <input
                      hidden
                      defaultValue={noteContents.tag}
                      name="searchValue"
                      type="text"
                      placeholder="Search"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 border-2 border-white max-[431px]:m-0 p-1 pl-2 pr-2 rounded-lg hover:bg-blue-600 hover:border-blue-600"
                    >
                      {noteContents.tag}
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NoteViewer;
