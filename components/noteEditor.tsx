"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Writeclient } from "@/sanity/lib/write-client";
import { useSession } from "next-auth/react";

import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import loading01 from "../public/loading01.webp";

interface Post {
  content: string;
  title: string;
  picUrl: string;
  tag: string;
  preview: string;
  _id: string;
  authorEmail: string;
}

const NoteEditor = ({ post }: { post: Post }) => {
  console.log(post);
  const [mdValue, setMdValue] = useState(post?.content);
  const [title, setTitle] = useState(post?.title);
  const { status, data } = useSession();
  const [picId, setPicId] = useState(post?.picUrl);

  const [tags, setTags] = useState(post?.tag);
  const [preview, setPreview] = useState(post?.preview);
  const [sucMsg, setSucMsg] = useState(false);
  const [picUrl, setPicUrl] = useState(post?.picUrl);
  const [showSuc, setShowSuc] = useState(false);

  if (status === "loading")
    return (
      <Image
        src={loading01}
        alt="loading"
        width={400}
        height={400}
        className="w-screen h-screen"
      />
    );
  if (status === "unauthenticated") return (window.location.href = "/");
  if (post === undefined)
    return (
      <p className="text-white h-screen flex justify-center align-middle items-center text-5xl">
        Not Found
      </p>
    );
  if (post.authorEmail !== data?.user?.email)
    return (window.location.href = "/");

  const handleSave = async () => {
    window.location.href = `/MySpace`;
    await Writeclient.patch(post._id)
      .set({
        title: title,
        preview: preview,
        content: mdValue,
        pic: picId,
        tag: tags,
        picUrl: picUrl,
      })
      .commit();

    setMdValue("");
    setTitle("");
    setPicId("");
    setPreview("");
    setTags("");
    setSucMsg(true);
  };

  return (
    <>
      <div className="bg-bg2 bg-cover max-[431px]:m-2 m-20 text-white bg-white/10 z-0 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <h1 className="font-extrabold text-4xl max-[431px]:text-2xl text-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
          Light-Up Your Ideas
        </h1>
        <br></br>
        <br></br>
        <div className="">
          <div className="flex w-full max-[431px]:flex-col">
            <div className="block w-[50%] max-[431px]:w-full mr-10 max-[431px]:mr-0">
              <label htmlFor="title" className="text-white text-xl">
                Title
              </label>
              <br /> <br />
              <input
                type="text"
                id="title"
                defaultValue={title}
                required
                maxLength={30}
                minLength={5}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSucMsg(false);
                }}
                className="text-black border-2 border-black rounded-lg p-3 w-[100%] text-xl font-bold"
              />
              <br></br>
              <br></br>
              <label htmlFor="title" className="text-white">
                Preview
              </label>
              <br /> <br />
              <textarea
                id="preview"
                defaultValue={preview}
                maxLength={100}
                minLength={10}
                onChange={(e) => setPreview(e.target.value)}
                required
                className="text-black border-2 border-black rounded-lg p-3 w-[100%] text-base h-auto"
                rows={3}
              />
            </div>
            {picId && (
              <CldImage
                src={picId}
                height="300"
                width="300"
                crop="scale"
                alt="img"
                className="rounded-xl max-[431px]:mt-4"
              />
            )}
          </div>
          <br />
          <br />
          <label htmlFor="content" className="text-white">
            Content
          </label>{" "}
          <br /> <br />
        </div>
        <div className="mt-6">
          <MDEditor
            value={mdValue}
            onChange={(value) => setMdValue(value || "")}
            height={500}
            className="border-2 border-gray-300 rounded-lg shadow-sm"
          />
        </div>
        <br></br>
        <br></br>
        <div className="flex justify-center align-middle items-center flex-col">
          {" "}
          <div className="flex max-[431px]:flex-col max-[431px]:items-center">
            <label
              htmlFor="title"
              className="text-white mr-[5%] ml-[-10%] max-[431px]:m-0 max-[431px]:mb-2"
            >
              Tag
            </label>

            <select
              className="text-black p-1 rounded-lg"
              defaultValue={tags}
              onChange={(e) => setTags(e.target.value)}
              required
            >
              <option value="Programming">Programming</option>
              <option value="AI">AI</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Web Development">Web Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Data Science">Data Science</option>
              <option value="New Tech News">New Tech News</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="IOT">IOT</option>
              <option value="Networking">Networking</option>
              <option value="Database">Database</option>
              <option value="Mobile Dev">Mobile Development</option>
              <option value="Game Dev">Game Development</option>
              <option value="DevOps">DevOps</option>
              <option value="Testing">Testing</option>
              <option value="Operating System">Operating System</option>
              <option value="Software Dev">Software Development</option>
              <option value="Science">Science</option>
              <option value="Inventions">Inventions</option>
              <option value="World Of Computing">World Of Computing</option>
              <option value="World News">World News</option>
              <option value="Films and Tv Shows">Films and Tv Shows</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Space And Time">Space And Time</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <br></br>
          <br></br>
          <CldUploadWidget
            uploadPreset="postPhotos"
            options={{ multiple: false }}
            onSuccess={(results) => {
              if (results.info) {
                if (typeof results.info !== "string") {
                  setPicId(results.info.public_id);
                  setShowSuc(true);

                  setPicUrl(results.info.secure_url);
                }
              }
            }}
          >
            {({ open }) => (
              <button
                className="border-2 border-blue-500 p-1 pr-2 pl-2 bg-blue-600 hover:bg-green-600 rounded-lg hover:border-green-500"
                onClick={() => open()}
              >
                {picId ? <p>update Cover Photo</p> : <p>Upload Cover Photo</p>}
              </button>
            )}
          </CldUploadWidget>
          <br /> <br />
          {showSuc && (
            <>
              <p className="p1 pl-2 pr-2 bg-green-500 rounded-lg text-center">
                Cover Photo has Successfully updated..... Look upper 👆
              </p>
              {window.scrollTo({ top: 0, behavior: "smooth" })}
            </>
          )}
        </div>
        <br />
        {sucMsg && (
          <div className="text-white w-full flex justify-center">
            <p className="border-2 border-green-500 p-1 pl-2 pr-2 rounded-xl">
              Successfully Updated The Post
            </p>

            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <p className="text-green-500 font-bold">
                  Successfully Updated The Post
                </p>
                <button
                  onClick={() => setShowSuc(false)}
                  className="mt-4 bg-blue-500 text-white p-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        <br />
        {title && picId && tags && preview ? (
          <button
            onClick={handleSave}
            className="rounded-lg border-2 border-red-950 w-full p-1 bg-red-500 hover:bg-yellow-500"
          >
            Save Changes
          </button>
        ) : (
          <button
            className="rounded-lg border-2 border-red-950 w-full p-1 bg-gray-500 hover:bg-gray-800"
            disabled
          >
            Please Fill All The Fields
          </button>
        )}
      </div>
    </>
  );
};

export default NoteEditor;
