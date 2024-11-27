import Footer from "@/components/footer";
import NoteViewer from "@/components/NoteViewr";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { checklikes, checkViews, getOneNote } from "@/sanity/lib/queries";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import React from "react";

const notepanel = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const noteData = await sanityFetch({ query: getOneNote, params: { id } });

  const checkingView = await sanityFetch({ query: checkViews, params: { id } });
  const checkLikes = await sanityFetch({ query: checklikes, params: { id } });
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
