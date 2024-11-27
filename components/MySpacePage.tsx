"use client";
import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import { CldImage } from "next-cloudinary";
import { useSearchParams } from "next/navigation";
import { Writeclient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { getOneNote } from "@/sanity/lib/queries";
import Link from "next/link";
import Form from "next/form";
import { useSession } from "next-auth/react";

interface postDetailsInterface {
  title: string;
  tag: string;
  preview: string;
  _id: string;
  _createdAt: string;
  pic?: string;
  author?: string;
}

type SavedPostType = string;

const MySpacePage = ({
  postDetails,
  savedPosts,
}: {
  postDetails: postDetailsInterface[];
  savedPosts: SavedPostType[];
}) => {
  const { status } = useSession();

  const [savedPostFetched, setSavedPostFetched] = useState<
    postDetailsInterface[]
  >([]);
  const [currentPosts, setCurrentPosts] = useState<postDetailsInterface[]>([]);
  const se = useSearchParams();
  const params = se.get("option");

  const mkd = new MarkdownIt();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      if (params === "savedPosts") {
        const savedPostsData = await Promise.all(
          savedPosts.map(async (post) => {
            const data = await client.fetch(getOneNote, { id: post });
            return data;
          })
        );
        setSavedPostFetched(savedPostsData.flat());
      } else {
        setCurrentPosts(postDetails);
      }
    };

    fetchSavedPosts();
  }, [params, savedPosts, postDetails]);

  useEffect(() => {
    if (params === "savedPosts") {
      setCurrentPosts(savedPostFetched);
    } else {
      setCurrentPosts(postDetails);
    }
  }, [savedPostFetched, params, postDetails]);

  if (status === "loading") return <p>Loading</p>;
  if (status === "unauthenticated") return (window.location.href = "/");

  return (
    <>
      <div>
        <div className="z-0 grid grid-cols-1 md:grid-cols-3 gap-6 max-[431px]:gap-4 p-4 max-[431px]:p-2">
          {currentPosts?.length > 0 ? (
            (console.log(postDetails),
            currentPosts.map((post: postDetailsInterface) => {
              const notePreview = mkd.render(post.preview);
              const date = new Date(post._createdAt);
              const deletePost = async () => {
                try {
                  await Writeclient.delete(post._id);
                  window.location.reload();
                } catch (error) {
                  console.error("Error deleting post:", error);
                }
              };

              return (
                <div
                  key={post._id}
                  className="bg-white/10 max-[431px]:h-fit max-[431px]:mb-1 z-0 backdrop-blur-sm rounded-lg p-6 max-[431px]:p-3   shadow-lg border-2 border-transparent hover:border-green-600"
                >
                  <Link href={`/NotPanel/${post._id}`}>
                    <h2 className=" h-[10%] flex text-2xl max-[431px]:text-xl font-bold mb-4 text-white">
                      {post.title}
                    </h2>
                    {post.preview && (
                      <article
                        className="prose prose-invert  h-[13%] prose-headings:text-white prose-p:text-gray-200 prose-a:text-blue-400 prose-strong:text-white prose-code:text-blue-300 max-w-none max-[431px]:text-sm"
                        dangerouslySetInnerHTML={{ __html: notePreview }}
                      />
                    )}
                    <div className="flex justify-center text-right mt-4">
                      {post.pic && (
                        <CldImage
                          src={post.pic}
                          width="500"
                          height="500"
                          alt="pic"
                          className="w-full h-64 max-[431px]:h-48 object-cover rounded-xl"
                        />
                      )}
                    </div>
                    <div className="text-right mt-4 text-purple-600 max-[431px]:text-sm">
                      <p>
                        <i className="fas fa-user"></i>
                        <span> </span> {post.author}
                      </p>
                    </div>
                    <div className="text-right mt-4 text-yellow-400 max-[431px]:text-sm">
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
                  </Link>
                  <div className="text-right mt-4">
                    <Form className="" action="/SearchPage">
                      <input
                        type="hidden"
                        name="searchValue"
                        defaultValue={post.tag}
                      />
                      <button
                        type="submit"
                        className="border-2 border-white px-4 py-2 max-[431px]:px-2 max-[431px]:py-1 text-sm transition-colors duration-200 hover:border-white hover:bg-white hover:text-black rounded-lg"
                      >
                        {post.tag}
                      </button>
                    </Form>
                  </div>
                  {params === null && (
                    <div>
                      <button
                        onClick={deletePost}
                        className="mt-4 w-full bg-red-500 hover:bg-red-900 text-white font-semibold py-2 px-4 max-[431px]:py-1.5 max-[431px]:text-sm rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 max-[431px]:h-4 max-[431px]:w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete Note
                      </button>
                      <Link href={`/MySpace/${post._id}`}>
                        <button className="mt-4 w-full bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 max-[431px]:py-1.5 max-[431px]:text-sm rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 max-[431px]:h-4 max-[431px]:w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4v-1H5v-3H4z" />
                          </svg>
                          Edit Post
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              );
            }))
          ) : (
            <p className="text-white">Nothing Found</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MySpacePage;
