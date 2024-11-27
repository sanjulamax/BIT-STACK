import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { checkViews, getNotes } from "@/sanity/lib/queries";
import NoteCard from "@/components/NoteCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Search from "@/components/search";
import Footer from "@/components/footer";

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

export default async function Home() {
  const { data }: { data: note[] } = await sanityFetch({ query: getNotes });
  const notes: note[] = data;
  console.log(JSON.stringify(notes));

  return (
    <div className="Z-0 h-screen mt-[150px]  max-[431px]:mt-[130px]  font-[family-name:var(--font-geist-sans)]">
      <div className="fixed z-10  overflow-hidden">
        <Search />
      </div>
      <div className="max-[431px]:m-0 max-[431px]:p-0  m-[5%] mb-[1%] p-5 min-w-[80%]   text-white bg-bg2 bg-cover rounded-xl ">
        <NoteCard notes={notes} />
        <SanityLive />
      </div>
      <Footer />
    </div>
  );
}
