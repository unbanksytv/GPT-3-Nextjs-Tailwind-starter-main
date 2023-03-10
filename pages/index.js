import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useEffect, Fragment } from "react";
import {
  EmojiHappyIcon as EmojiHappyIconSolid,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  ThumbUpIcon,
  XIcon,
} from "@heroicons/react/solid";

export default function Home() {
  // React Hooks
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  // What we want to render
  return (
    <Fragment>
      <Head>
        <title>Wen GPT-33 Ser</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-r from-pink-700 to-blue-900 min-h-screen px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <main className="flex flex-col justify-center  max-w-3xl w-full align-center">
          <h1 className="text-4xl text-center font-extrabold text-slate-800 drop-shadow sm:text-5xl mb-1">
            LTL x AI 
          </h1>
          <p className="block text-sm text-center font-medium text-gray-800">
            wen gpt33 ser
          </p>

          {/* Card & Input field  */}
          <div className="text-center relative backdrop-filter overflow-hidden mb-6 max-w w-full rounded-md  ring-1 ring-black ring-opacity-0 p-4 ">
            <textarea
              className="max-w shadow-sm      min-h-133  block w-full focus:ring-pink-900 focus:border-pink-900 sm:text-sm border border-gray-900 rounded-md"
              type="textarea"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Past your article here...."
              defaultValue={"Good Vibes Ohmly, ask me anything"}
            />

            {/* Button to that calls API */}
            <button
              className="inline-flex mt-5 items-center px-8 py-2 border border-gray-900 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900"
              type="button"
              onClick={() => setSearch(query)}
            >
              Create
            </button>

            <div className="mt-5 p-5 text-sm text-gray-900 border-t-2 border-slate-600 ">
              {isLoading ? <div>Loading ...</div> : <span> {data.text} </span>}
              {/* {lorem} */}
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}
