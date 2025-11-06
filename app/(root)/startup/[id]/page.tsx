import { startupCardType } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const data = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!data) return notFound();

  const post = data as startupCardType;

  const {
    author,
    category,
    description,
    image,
    pitch,
    slug,
    title,
    views,
    _createdAt,
  } = post;

  const md = markdownit();

  const parsedContent = md.render(pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(_createdAt)}</p>
        <h1 className="heading-discription ">{title}</h1>
        <p className="sub-heading !max-w-5xl">{description}</p>
      </section>
      <section className="section_container">
        <img src={image} alt={title} className="w-full h-auto rounded-xl" />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${author?._id}`}
              className="flex justify-between gap-2 items-center mb-3"
            >
              <Image
                src={author?.image ?? "https://placehold.co/48x48"}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-xl">{author?.name}</p>
                <p className="text-black-300">@{author?.username}</p>
              </div>
            </Link>

            <p className="category-tag">{category}</p>
          </div>

          <h3 className="text-3xl">Pitch Details</h3>
          {parsedContent ? (
            <article
              className="prose dark:prose-invert max-w-4xl break-all text-foreground"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>

        <hr className="divider" />

        {/* TODO: EDITOR SELECTED STARTUPS */}
        <Suspense fallback={<Skeleton className="" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;
