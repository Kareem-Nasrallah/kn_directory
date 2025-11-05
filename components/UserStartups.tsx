import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { startupCardType } from "./StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
  const startups: startupCardType[] = await client.fetch(
    STARTUPS_BY_AUTHOR_QUERY,
    {
      id,
    }
  );
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: startupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p></p>
      )}
    </>
  );
};

export default UserStartups;
