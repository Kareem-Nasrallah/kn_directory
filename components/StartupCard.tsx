import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Startup } from "@/sanity.types";

export type AuthorCard = {
  _id: string;
  name: string | null;
  image: string | null;
  bio: string | null;
  username: string | null;
};

export type startupCardType = Omit<
  Startup,
  "author" | "_type" | "_rev" | "_updatedAt"
> & { author?: AuthorCard | null };

const StartupCard = ({ post }: { post: startupCardType }) => {
  const {
    author,
    _createdAt,
    _id,
    category,
    description,
    image,
    title,
    views,
  } = post;

  return (
    <li>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <p>{formatDate(_createdAt as string)}</p>
            <div className="flex gap-1.5">
              <EyeIcon className="size-6 text-primary" />
              <span>{views}</span>
            </div>
          </div>
          <div className="flex mt-5 gap-5 justify-between items-center">
            <div className="flex-1">
              <Link href={`/user/${author?._id}`}>
                <p className="line-clamp-1 mb-1">{author?.name}</p>
              </Link>
              <Link href={`/startup/${_id}`}>
                <CardTitle className="text-[26px] line-clamp-1">
                  {title}
                </CardTitle>
              </Link>
            </div>
            <Link href={`/user/${author?._id}`}>
              <Image
                src={
                  author?.image ? author.image : "https://placehold.co/48x48"
                }
                alt="placehold"
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          <Link href={`/startup/${_id}`}>
            <p className="line-clamp-2 min-h-12 my-3 text-black-300 break-all">
              {description}
            </p>
            <img
              src={image ? image : "https://placehold.co/48x48"}
              alt={title ? title : "unknown title"}
              className="w-full h-[164px] rounded-[10px] object-cover"
            />
          </Link>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-3 mt-5">
          <Link className="capitalize" href={`/?search=${category?.toLowerCase()}`}>{category}</Link>
          <Button
            asChild
            className="rounded-full bg-black-200 text-white px-5 py-2"
          >
            <Link href={`/startup/${_id}`}>Details</Link>
          </Button>
        </CardFooter>
      </Card>
    </li>
  );
};

export default StartupCard;
