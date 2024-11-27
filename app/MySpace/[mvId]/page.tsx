import React from "react";

import { sanityFetch } from "@/sanity/lib/live";
import { getOneNote } from "@/sanity/lib/queries";
import NoteEditor from "@/components/noteEditor";

import Link from "next/link";

import Footer from "@/components/footer";

const editorPage = async ({
  params,
}: {
  params: Promise<{ mvId: string }>;
}) => {
  const { mvId } = await params;

  if (!mvId) return null;

  const post = await sanityFetch({ query: getOneNote, params: { id: mvId } });

  return (
    <>
      <Link href="/MySpace">
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </Link>

      <div className="">
        <NoteEditor post={post.data[0]} />
      </div>
      <Footer />
    </>
  );
};

export default editorPage;
