import { UnsplashImage } from "@/app/models/unsplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "@/components/bootstrap";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Static Fetching - Image Gallery",
  description: "Static",
};

export default async function Page() {
  const response = await fetch(
    "https://api.unsplash.com/photos/random?client_id=" +
      process.env.UNSPLASH_ACCESS_KEY
    // NEXT_PUBLIC_을 앞에 붙여야만 client에서 사용할 수 있고, 보일 수 있다.
    // 지금은 서버에서 사용하기 때문에 클라이언트에 보이지도 않고, NEXT_PUBLIC을 붙이지 않으면 undefined로 나온다.
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(500, image.width);
  const height = (width / image.width) * image.height;

  return (
    <div className="d-flex flex-column align-items-center">
      <Alert>
        This page <strong>fetches and caches data at build time.</strong>
        Eventhough the Unsplash aPI always returs a new image, we see the same
        image after refreshing the page until we compile the project again.
      </Alert>
      <Suspense fallback={<p>Loading...</p>}>
        <Image
          src={image.urls.raw}
          width={width}
          height={height}
          alt={image.description}
          className="rounded shadow mw-100 h-100"
        />
        <div>RAW : {image.urls.raw}</div>
        <Link href={"/users/" + image.user.username}>
          {image.user.username}
        </Link>
      </Suspense>
    </div>
  );
}
