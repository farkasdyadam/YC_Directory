import React, {Suspense} from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {Skeleton} from "@/components/ui/skeleton";
import View from "@/components/View";

export const experimental_ppr = false;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  const parsedContent = post?.pitch || "No details provided.";

  if (!post) {
    return notFound();
  }

  return (
    <>
      <section className={"pink_container !min-h-[230px]"}>
        <p className={"tag"}>{formatDate(post?._createdAt)}</p>
        <h1 className={"heading"}>{post.title}</h1>
        <p className={"sub-heading !max-w-5xl"}>{post.description}</p>
      </section>

      <section className={"section_container"}>
        <img src={post.image} alt={"placeholder"} className={"w-full h-auto rounded-xl"} />
        <div className={"space-y-5 mt-10 max-w-4xl mx-auto"}>
          <div className={"flex justify-between gap-5"}>
            <Link href={`/user/${post?.author?._id}`} className={"flex gap-2 items-center mb-3"}>
              <Image
                src={post.author.image}
                alt={"avatar"}
                width={64}
                height={64}
                className={"rounded-full drop-shadow-lg"}
              />
              <div>
                <p className={"text-2xl font-semibold"}>{post.author.name}</p>
                <p className={"text-1xl font-semibold text-black-300"}>@{post.author.username}</p>
              </div>
            </Link>

            <div className={"flex"}>
              <p className={"category-tag"}>{post.category}</p>
            </div>
          </div>
          <h3 className={"text-4xl font-bold"}>Pitch Details</h3>{/* TODO 3:10:00 körül van*/}
          <article className={"prose max-w-4xl break-all"} dangerouslySetInnerHTML={{__html:parsedContent}}/>
        </div>
        <hr className={"divider"}/>
        {/*TODO EDITOR SELECTED STARTUPS*/}

        <Suspense fallback={<Skeleton className={"view_skeleton"}/>}>
          <View id={id}/>
        </Suspense>
      </section>

    </>
  );
};
export default Page;