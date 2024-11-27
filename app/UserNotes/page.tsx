import Image from "next/image";
import { getNotesByAuthor } from "@/sanity/lib/queries";
import NoteCard from "@/components/NoteCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Search from "@/components/search";
import loading01 from "@/public/loading01.webp";

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

export default async function UserNotes({
  searchParams,
}: {
  searchParams: Promise<{ userId: string }>;
}) {
  if (!(await searchParams).userId) {
    return (
      <Image
        src={loading01}
        alt="loading"
        width={40}
        height={40}
        className="w-10 h-10"
      />
    );
  }
  const { userId } = await searchParams;
  const decodedEmail = decodeURIComponent(userId);

  const { data }: { data: note[] } = await sanityFetch({
    query: getNotesByAuthor,
    params: { authorEmail: `"${decodedEmail}"` },
  });

  if (!data || data.length === 0) {
    return <div className="text-white">No notes found</div>;
  }

  const notes: note[] = data;
  return (
    <div className="Z-0 h-screen mt-[150px]  max-[431px]:mt-[130px]  font-[family-name:var(--font-geist-sans)]">
      <div className="fixed z-10  overflow-hidden">
        <Search />
      </div>
      <div className="max-[431px]:m-0 max-[431px]:p-0  m-[5%] p-5 min-w-[80%]   text-white bg-bg2 bg-cover rounded-xl ">
        <p className="text-white text-2xl font-bold mb-5">
          Notes by {notes[0].author}
        </p>
        <NoteCard notes={notes} />
        <SanityLive />
      </div>
    </div>
  );
}
