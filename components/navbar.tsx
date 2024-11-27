"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Writeclient } from "@/sanity/lib/write-client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { getUsers } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { useEffect } from "react";
import Form from "next/form";
import UpperTabs from "./upperTabs";
import loading01 from "../public/loading01.webp";
import Image from "next/image";

import { Inter } from "next/font/google";

import "@fortawesome/fontawesome-free/css/all.css";

interface NavbarProps {
  searchValue: string;
}

const Navbar = ({ searchValue }: NavbarProps) => {
  console.log(searchValue);
  const [logChecker, setLogChecker] = useState(false);
  const { status, data } = useSession();

  const [search, setSearch] = useState("");
  const [lastRun, setLastRun] = useState("true");
  const COOLDOWN_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

  useEffect(() => {
    const storedLastRun = localStorage.getItem("lastRunTime");

    if (data?.user?.email && storedLastRun === "true") {
      createUser();
      setLastRun("false");
      localStorage.setItem("lastRunTime", "false");
    }
  }, [status, data?.user?.email, lastRun]);

  const createUser = async () => {
    const user = await client.fetch(getUsers, { uemail: data?.user?.email });
    console.log(user);

    if (!user || user.length === 0) {
      try {
        const writer = await Writeclient.create({
          _type: "author",
          name: data?.user?.name,
          email: data?.user?.email,
        });
        console.log(writer);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="  z-10 fixed top-0 left-0 w-full bg-black  bg-cover bg-opacity-20 backdrop-blur-md text-white shadow-sm">
      <div className="pb-2 pt-2 bg-black bg-opacity-20 backdrop-blur-md shadow-sm h-[50px] flex justify-around items-center">
        <Link href="/">
          <div className="text-2xl transition-colors duration-500 font-bold tracking-wider hover:bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 hover:bg-clip-text hover:text-transparent">
            BIT STACK
          </div>
        </Link>

        <Form
          className="bg-white rounded-full flex items-center max-[431px]:w-[150px] max-[431px]:h-8 p-1.5 max-[431px]:p-1"
          action="/SearchPage"
        >
          <input
            type="text"
            placeholder="Search"
            name="searchValue"
            className="outline-none text-black font-mono max-[431px]:w-[100px] max-[431px]:text-sm max-[431px]:pl-2 pl-3"
            defaultValue={searchValue || ""}
          />

          <button
            type="submit"
            className="bg-black rounded-full pt-2 pb-2 flex items-center justify-center max-[431px]:pt-0 max-[431px]:pb-0  max-[431px]:h-6 max-[431px]:w-6"
          >
            <i className="fa-solid fa-magnifying-glass text-white px-3 max-[431px]:px-0 max-[431px]:text-sm"></i>
          </button>
        </Form>

        {/* Desktop Menu */}
        <div className="space-x-6 max-[431px]:hidden">
          {status == "loading" ? (
            <Image
              src={loading01}
              alt="loading"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          ) : status == "authenticated" ? (
            <>
              <button className="border-2 border-blue-500 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 p-1 pl-2 pr-2 rounded-lg hover:from-purple-600 hover:via-blue-500 hover:to-green-400 hover:bg-clip-text hover:text-transparent transition-all duration-500 overflow-hidden">
                {data ? `Welcome ${data.user?.name}` : "Login to continue"}
              </button>
              <button className="border-2 border-yellow-500 p-1 pl-2 pr-2 rounded-lg hover:border-green-500 hover:bg-green-500">
                <Link href="/CreateNote">Create Note</Link>
              </button>
              <button className="border-2 border-red-500 p-1 pl-2 pr-2 rounded-lg hover:border-blue-500 hover:bg-blue-500">
                <Link href="/MySpace">My Space</Link>
              </button>
              <button
                onClick={() => {
                  signOut();
                  setLastRun("true");
                  localStorage.setItem("lastRunTime", "true");
                }}
                className="border-2 border-blue-500 p-1 pl-2 pr-2 rounded-lg hover:border-red-500 hover:bg-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 bg-green-600 py-2 text-sm transition-colors duration-200 border border-transparent hover:border-green-600 hover:text-green-600 hover:bg-transparent rounded-lg"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Sidebar */}
        <div className="hidden max-[431px]:block">
          <button
            onClick={() => setLogChecker(!logChecker)}
            className="text-xl"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div
            className={`fixed top-0 right-0 h-full w-64  rounded-xl   transform transition-transform duration-300 ease-in-out ${logChecker ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="p-4 space-y-4">
              <button
                onClick={() => setLogChecker(false)}
                className="absolute bg-black p-1 border-2 border-white top-3 right-1 rounded-xl"
              >
                <i className="fas fa-times"></i>
              </button>
              {status == "authenticated" ? (
                <div className="flex flex-col space-y-4 mt-12">
                  <div className="text-sm border-white mt-5 p-2 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 border-2">
                    {data ? `Welcome ${data.user?.name}` : "Login to continue"}
                  </div>
                  <Link
                    href="/CreateNote"
                    className="border-2 bg-black border-yellow-500 p-2 rounded-lg text-center hover:border-green-500 hover:bg-green-500"
                  >
                    Create Note
                  </Link>
                  <Link
                    href="/MySpace"
                    className="border-2  bg-black border-red-500 p-2 rounded-lg text-center hover:border-blue-500 hover:bg-blue-500"
                  >
                    My Space
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="border-2  bg-black border-blue-500 p-2 rounded-lg hover:border-red-500 hover:bg-red-500 w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="w-full mt-12 bg-green-600 px-4 py-2 text-sm transition-colors duration-200 border-2 border-transparent  hover:border-green-600 hover:text-green-600 hover:bg-transparent rounded-lg"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <UpperTabs />
    </div>
  );
};

export default Navbar;
