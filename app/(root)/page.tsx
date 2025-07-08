import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: { searchParams: Promise<{ query: string }> }) {

    const query = (await searchParams).query;

    const post = [{
        _createdAt: new Date(),
        views: 55,
        author: {_id: 1,name:"Adam"},
        _id: 1,
        description: "This is a description",
        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstar-wars-legends.fandom.com%2Fwiki%2FR2-D2&psig=AOvVaw0UThJPup0hy0sL5WLFthX6&ust=1752063662045000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPCTtvSfrY4DFQAAAAAdAAAAABAE",
        category: "Robots",
        title: "We Robots"
    }];

    return (
        <>
            <section className={"pink_container"}>
                <h1 className="heading"> Pitch Your Startup, <br/> Connect With Entrepreneurs</h1>
                <p className="sub-heading !max-w-3xl">
                    Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
                </p>

                <SearchForm query={query}/>
            </section>

            <section className={"section_container"}>
                <p className={"text-4xl font-bold"}>
                    {query ? `Search Results for "${query}"` : "All Startups"}
                </p>

                <ul className={"mt-7 card_grid"}>
                    {post.length > 0 ?
                        (post.map((post, index) => (
                                <StartupCard post={post} key={post._id}/>
                            ))
                        ) : (<p className={"no-result"}> asd</p>)}
                </ul>
            </section>

        </>
    );
}
