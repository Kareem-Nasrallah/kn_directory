import StartupCard, { startupCardType } from "@/components/StartupCard";
import SearchForm from "@/components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

interface props {
  searchParams: Promise<{ search?: string }>;
}
export default async function Home({ searchParams }: props) {
  const search = (await searchParams).search;

  const params = { search: search || null };

  const { data } = await sanityFetch({
    query: STARTUPS_QUERY,
    params,
  });

  const session = await auth();

  const posts = data as startupCardType[];

  return (
    <>
      <section className="pink_container pettern">
        <h1 className="heading-discription word-space-1">
          Pitch Your Startup, <br /> connect with entrepreneurs{" "}
        </h1>
        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual competitons
        </p>
        <SearchForm search={search} />
      </section>
      <section className="section_container">
        <p className="font-subtitle !text-3xl">
          {search ? `Search results for "${search}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: startupCardType) => (
              <StartupCard key={post._id} post={post} />
            ))
          ) : (
            <p className="text-black-100 text-sm">No startps foud</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
