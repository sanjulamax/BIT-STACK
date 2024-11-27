import MySpacePage from "@/components/MySpacePage";

import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { getNotesByAuthor, getSavedPosts } from "@/sanity/lib/queries";
import React, { Suspense } from "react";
import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Form from "next/form";

const MySpace = async () => {
  const session = await auth();
  const email = session?.user?.email || "";
  if (!session)
    return (
      <>
        <Link
          href="/"
          className="text-white h-screen w-screen flex flex-col items-center justify-center align-middle "
        >
          <p className="text-white mb-10 text-3xl bg-black p-2 rounded-xl">
            You Are Not Authenticated ! Please Go To Home And SignIn
          </p>
          <p className="p-5   bg-green-500 rounded-xl hover:bg-blue-500">
            Go To Home
          </p>
        </Link>
      </>
    );

  const myPosts = await sanityFetch({
    query: getNotesByAuthor,
    params: { authorEmail: email },
  });

  const saved = await sanityFetch({
    query: getSavedPosts,
    params: { email: session?.user?.email },
  });

  // Serialize the data
  const serializedPosts = JSON.parse(JSON.stringify(myPosts.data));
  const serializedSavedPosts = JSON.parse(
    JSON.stringify(saved.data[0]?.savedPosts || [])
  );

  // Remove duplicates from saved posts
  if (saved.data[0]?.savedPosts) {
    const uniqueSaved = [
      ...new Set(saved.data[0].savedPosts.map(JSON.stringify)),
    ].map((value) => JSON.parse(value as string));
    saved.data[0].savedPosts = uniqueSaved;
  }

  return (
    <>
      <Link href="/">
        <button className="max-[431px]:hidden absolute top-5 left-5 bg-white text-bl p-3 rounded-full hover:bg-white/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
      </Link>

      <div className="flex flex-col justify-center items-center align-middle">
        <div className="flex max-[431px]:flex-col max-[431px]:gap-4 flex-row mt-5 justify-around w-[80%] max-[431px]:w-[95%] bg-white/10 rounded-xl backdrop-blur-lg shadow-xl align-middle items-center p-4">
          <Link href="/">
            <button className="hidden max-[431px]:block absolute top-5 left-5 bg-white text-bl p-3 rounded-full hover:bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </button>
          </Link>

          <div className="flex flex-col justify-center align-middle items-center">
            <Image
              src={
                session?.user?.image ||
                "https://cdn.pixabay.com/photo/2024/03/15/19/51/ai-generated-8635685_640.png"
              }
              alt="profile"
              width={100}
              height={100}
              className="rounded-full h-20 w-20"
            />
            <h1 className="text-white text-center">{session?.user?.name}</h1>
            <h1 className="text-white text-center text-sm">
              {session?.user?.email}
            </h1>
          </div>
          <h1 className="text-white font-bold text-2xl max-[431px]:text-lg text-center mb-5">
            - Manage your posts and stay organized-
          </h1>
          <div className="flex flex-col items-center justify-center align-middle">
            <Link href="/CreateNote">
              <button className="bg-blue-500 text-white p-2 rounded-xl border-2 border-transparent mb-2 hover:bg-transparent hover:text-blue-500 hover:border-2 hover:border-blue-500">
                Create a new post
              </button>
            </Link>

            <Form action="/MySpace">
              <input
                type="text"
                name="option"
                defaultValue="savedPosts"
                hidden
                className="bg-green-500 w-full text-white p-2 rounded-xl border-2 border-transparentborder-2 border-transparent hover:bg-transparent hover:text-green-500 hover:border-2 hover:border-green-500"
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-xl border-2 border-transparentborder-2 border-transparent hover:bg-transparent hover:text-green-500 hover:border-2 hover:border-green-500"
              >
                Saved Posts
              </button>
            </Form>
          </div>
        </div>
        <div className="m-[5%] max-[431px]:m-[2%] mt-2 p-5 min-w-[80%] max-[431px]:min-w-[95%] text-white bg-bg2 bg-cover rounded-xl">
          <Suspense>
            {" "}
            <MySpacePage
              postDetails={serializedPosts}
              savedPosts={serializedSavedPosts}
            />
          </Suspense>
          <SanityLive />
        </div>
      </div>
    </>
  );
};

export default MySpace;
