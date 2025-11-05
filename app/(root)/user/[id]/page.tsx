import { auth } from "@/auth";
import UserStartups from "@/components/UserStartups";
import { Author } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = (await params).id;
  const session = await auth();

  const user: Author = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-2xl uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
            src={user?.image ? user.image : "https://placehold.co/48x48"}
            alt={user?.name ? user?.name : "user image"}
            width={220}
            height={220}
            className=" profile_image"
          />

          <p className="text-3xl font-bold mt-7 text-center">
            @{user.username}
          </p>
          <p className="mt-1 text-center text-sm">{user.bio}</p>
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:mt-5">
          <p className="text-3xl font-bold">
            {session?.id == id ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            <UserStartups id={id} />
          </ul>
        </div>
      </section>
    </>
  );
};

export default page;
