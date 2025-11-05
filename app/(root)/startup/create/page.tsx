import { auth } from "@/auth";
import { redirect } from "next/navigation";
import StartupForm from "@/components/StartupForm";
import React, { Suspense } from "react";

const page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading-discription">Submit Your Startup</h1>
      </section>
      <StartupForm />
    </>
  );
};

export default page;
