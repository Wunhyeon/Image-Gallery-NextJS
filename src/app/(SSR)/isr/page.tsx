import { UnsplashImage } from "@/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";

// ISR기능이 13.5.x ~ 버전부터 안되고 있는 걸로 보인다.
// 관련 링크
// https://github.com/vercel/next.js/issues/56232
// https://github.com/vercel/next.js/issues/56915

export const metadata: Metadata = {
  title: "Incremental Static Regeneration - Image Gallery",
};

// export const revalidate = 5;

export default async function Page() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY,
    {
      next: { revalidate: 10 }, //(seconds)
    }
  );

  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page uses <strong>incremental static regeneration.</strong>A new
        image is fetched every 15 seconds (after refreshing the page) and then
        served from the cache for that duration.
      </Alert>
      <Image
        src={image.urls.raw}
        width={width}
        height={height}
        alt={image.description}
        className="rounded shadow mw-100 h-100"
      />
      {/* <Link href={"/users/" + image.user.username}>{image.user.username}</Link> */}
    </div>
  );
}
