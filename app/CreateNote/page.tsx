import React from "react";
import CreateNote from "@/components/createNote";
import Link from "next/link";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const createNote = async () => {
  const session = await auth();

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

  return (
    <div>
      <CreateNote />
    </div>
  );
};

export default createNote;
