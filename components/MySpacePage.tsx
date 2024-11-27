"use client";

interface postDetailsInterface {
  title: string;
  tag: string;
  preview: string;
  _id: string;
  _createdAt: string;
  pic?: string; // Add the pic property
  author: string; // Add the author property
}

const MySpacePage = ({
  postDetails,
  savedPosts,
}: {
  postDetails: postDetailsInterface[];
  savedPosts: postDetailsInterface[];
}) => {
  console.log(postDetails);
  console.log(savedPosts);

  return <>My Space</>;
};

export default MySpacePage;
