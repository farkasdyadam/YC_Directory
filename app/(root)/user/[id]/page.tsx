import React from 'react'
import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";
import {AUTHOR_BY_ID_QUERY} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";

const Page = async ({params}: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();
    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id})

    if (!user) return notFound()

    return (
        <>
            <section className={"profile_container"}>
                <div className={"profile_card"}>
                    <div className={"profile_title"}>
                        <h3 className={"text-black font-bold text-2xl uppercase text-center line-clamp-1"}>{user.name}</h3>
                    </div>
                    <Image src={user.image} alt={user.name} width={220} height={220} className="profile_image"/>
                    <p className={"text-3xl text-white font-bold mt-7 text-center"}>
                        @{user.username}
                    </p>
                    <p className={"mt-1 text-center text-white text-2xl"}>
                        {user.bio}
                    </p>
                </div>
                <div className={"flex-1 flex flex-col gap-5 lg:-mt-5"}>
                    <p className={"text-2xl font-bold"}>
                        {session?.id === id ? "Your" : "All"} Startups
                    </p>
                    <ul className={"card_grid-sm"}>
                        <UserStartups id={id}/>
                    </ul>
                </div>
            </section>
        </>
    )
}
export default Page
