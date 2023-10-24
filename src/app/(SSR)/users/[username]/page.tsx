import NotFound from "@/app/not-found";
import { UnsplashUser } from "@/app/models/unsplash-user";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from "@/components/bootstrap";

interface PageProps {
  params: { username: string };
}

async function getUser(username: string): Promise<UnsplashUser | false> {
  // if you are not using the fetch function, and you use something like axios or different way of fetching your data
  // then these cards are not automatically deduplicated.
  // this is only the case for the native fetch function.
  // but you can do this manually.

  const response = await fetch(
    `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  if (response.status === 404) {
    // notFound();  // https://nextjs.org/docs/app/api-reference/functions/not-found#notfound
    // 공식문서에는 notFound()만 쓰면 자동으로 Custom Not Found Page로 보낸다고 되어있으나, 안됨... 그래서 NotFoundPage Component를 직접 Return해줬다!
    // return NotFound;
    // return <NotFound />;
    return false;
  }
  const user: UnsplashUser = await response.json();
  return user;
}

// fetch 말고 axios를 써서 deduplicated하게 data fetch하는 방법
// if we call get user cached instead of getUser in both places then this will also deduplicated.
// but again if you don't use fetch. (getUser function안에서 fetch가 아니라 axios등으로 데이터를 부를때만 필요.)
// = Use Cache if you're not using the native fetch
const getUserCached = cache(getUser);

// interface 검사. 참조 : https://velog.io/@zzunkie/Typescript%EC%97%90%EC%84%9C-interface-%EA%B2%80%EC%82%AC-%ED%95%A8%EC%88%98-%EB%A7%8C%EB%93%A4%EA%B8%B0
// const instanceOfUnsplashUser = (object: any): object is UnsplashUser => {
//   if (object === null || object === undefined) return false;
//   return (
//     "username" in object &&
//     "first_name" in object &&
//     "last_name" in object &&
//     typeof object.username === "string" &&
//     typeof object.first_name === "string" &&
//     typeof object.last_name === "string" &&
//     Object.keys(object).length === 3
//   );
// };

const instanceOfUnsplashUser = (
  object: UnsplashUser | false
): object is UnsplashUser => {
  if (!object) {
    return false;
  }
  return "username" in object;
};

export async function generateMetadata({ params: { username } }: PageProps) {
  const user = await getUser(username);
  if (!instanceOfUnsplashUser(user)) {
    return {
      title: "",
    };
  }
  return {
    title:
      ([user.first_name, user.last_name].filter(Boolean).join(" ") ||
        user.username) + " - Image Gallery",
  };
}

export default async function Page({ params: { username } }: PageProps) {
  // const response = await fetch(
  //   `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  // );

  // if (response.status === 404) {
  //   // notFound();  // https://nextjs.org/docs/app/api-reference/functions/not-found#notfound
  //   // 공식문서에는 notFound()만 쓰면 자동으로 Custom Not Found Page로 보낸다고 되어있으나, 안됨... 그래서 NotFoundPage Component를 직접 Return해줬다!
  //   // return NotFound;
  //   return <NotFound />;
  // }

  // const user: UnsplashUser = await response.json();

  const user = await getUser(username);

  if (!instanceOfUnsplashUser(user)) {
    return <NotFound />;
  }

  return (
    <div>
      <Alert>
        This profile page uses <strong>generateMetadata</strong>to set the{" "}
        <strong>page title</strong> dynamically from the API response.
      </Alert>
      <h1>{user.username}</h1>
      <p>First name : {user.first_name}</p>
      <p>Last name : {user.last_name}</p>
      <a href={"https://unsplash.com/" + user.username}>Unsplash profile</a>
      {/* Link를 써도 똑같이 작동하지만, 외부 사이트로 이동할때는 a태그도 쓸 수 있다는 걸 보여주기 위해 */}
    </div>
  );
}
