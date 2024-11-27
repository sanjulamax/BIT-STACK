import { searchNotes } from "@/sanity/lib/queries";
import NoteCard from "@/components/NoteCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/footer";
import { Suspense } from "react";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

interface note {
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

export default async function searchpage({
  searchParams,
}: {
  searchParams: Promise<{ searchValue?: string }>;
}) {
  const paramsz = (await searchParams)?.searchValue;
  const { data }: { data: note[] } = await sanityFetch({
    query: searchNotes,
    params: { searchValue: `"${paramsz}"` },
  });
  const notes: note[] = data;

  return (
    <div className="Z-0 h-screen mt-[200px] max-[431px]:mt-[130px]  font-[family-name:var(--font-geist-sans)]">
      <div className=" max-[431px]:m-0 max-[431px]:p-0  m-[5%] mb-[1%] p-5 min-w-[80%]   text-white bg-bg2 bg-cover rounded-xl">
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          <NoteCard notes={notes} />{" "}
        </Suspense>
        <SanityLive />
      </div>
      <Footer />
    </div>
  );
}
