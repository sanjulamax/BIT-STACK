import Form from "next/form";
import React from "react";

const UpperTabs = () => {
  const tags = [
    "Programming",
    "AI",
    "Cyber Security",
    "Web Development",
    "Machine Learning",
    "Data Science",
    "New Tech News",
    "Cloud Computing",
    "IOT",
    "Networking",
    "Database",
    "Mobile Dev",
    "Game Dev",
    "DevOps",
    "Testing",
    "Operating System",
    "Software Dev",
    "Other",
  ];
  return (
    <div className="w-full mt-2">
      <details className="w-full">
        <summary className="cursor-pointer pl-20  max-[431px]:pl-2  p-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700">
          Browse Categories
        </summary>
        <div className="flex flex-wrap gap-2 p-4 bg-gray-900 rounded-b-lg mt-1">
          {tags.map((tag) => (
            <div
              key={tag}
              className="flex-shrink-0 hover:bg-yellow-400 hover:text-black hover:border-yellow-500 border-2 border-white rounded-full px-4 py-1 whitespace-nowrap max-[431px]:text-sm max-[431px]:px-2 max-[431px]:py-0.5"
            >
              <Form action={"/SearchPage"}>
                <input
                  hidden
                  defaultValue={tag}
                  name="searchValue"
                  type="text"
                  placeholder="Search"
                />
                <button type="submit">{tag}</button>
              </Form>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export default UpperTabs;
