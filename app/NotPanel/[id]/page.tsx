import Footer from "@/components/footer";
import NoteViewer from "@/components/NoteViewr";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { checklikes, checkViews, getOneNote } from "@/sanity/lib/queries";
import { time } from "console";
import { CldImage } from "next-cloudinary";
import React from "react";

interface notes {
  _id: string;
  title: string;
  content: string;
  _createdAt: string;
  author: string;
  preview: string;
  pic: string;
  authorEmail: string;
}

const notepanel = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);

  const noteData = await sanityFetch({ query: getOneNote, params: { id } });

  let checkingView = await sanityFetch({ query: checkViews, params: { id } });
  let checkLikes = await sanityFetch({ query: checklikes, params: { id } });
  const fetchedData = noteData.data;

  return (
    <>
      {" "}
      <NoteViewer
        note={fetchedData}
        chviews={checkingView.data[0].views}
        likes={checkLikes.data[0].likes}
      />
      <SanityLive /> <Footer />
    </>
  );
};

export default notepanel;
