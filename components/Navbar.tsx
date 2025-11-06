import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut, MoonIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import ThemeButton from "./ThemeButton";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 shadow-sm dark:shadow-foreground">
      <nav className="flex justify-between items-center font-subtitle">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Next.js Logo"
            width={144}
            height={30}
            priority
          />
        </Link>
        <div className="flex items-center gap-3 xs:gap-5">
          <ThemeButton />
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer flex items-center"
                >
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session.user.image || ""}
                    alt={session.user.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="cursor-pointer">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
