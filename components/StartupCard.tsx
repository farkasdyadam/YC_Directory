import React from 'react'
import {formatDate} from "@/lib/utils";
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Author, Startup} from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author }

export default function StartupCard({post}: { post: StartupTypeCard }) {
    console.log(post)
    const {_createdAt, author, views, title, category, _id, description, image} = post;
    return (
        <li className={"startup-card group"}>
            <div className={"flex justify-between"}>
                <p className={"startup_card_date"}>
                    {formatDate(_createdAt)}
                </p>
                <div className={"flex gap-1.5"}>
                    <EyeIcon className={"size-5 text-primary"}/>
                    <span className={"text-sm/[16px] font-bold"}>{views}</span>
                </div>
            </div>
            <div className={"flex justify-between mt-5 gap-5"}>
                <div className={"flex-1/2"}>
                    <Link href={`/user/${author?._id}`}>
                        <p className={"text-sm/[16px] font-bold line-clamp-1 mb-2"}>{author?.name}</p>
                    </Link>
                    <Link href={`/startup/${_id}`}>
                        <h3 className={"text-3xl font-semibold line-clamp-1"}>{title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${author?._id}`}>
                    <Image src={author?.image ? author.image : "https://placehold.co/48x48"} alt={"placeholder"}
                           width={48} height={48}
                           className={"rounded-full"}/>
                </Link>
            </div>
            <Link href={`/startup/${_id}`}>
                <p className={"startup-card_desc"}>
                    {description}
                </p>
                <img src={image} alt={"placeholder"} className={"startup-card_img"}/>
            </Link>

            <div className={"flex justify-between gap-3 mt-5"}>
                <Link href={`/?query=${category?.toLowerCase()}`}>
                    <p className={"text-sm/[16px] font-bold"}>{category}</p>
                </Link>
                <Button className={"startup-card_btn"} asChild>
                    <Link href={`/startup/${_id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}
