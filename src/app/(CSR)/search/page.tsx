import SearchPage from "./SearchPage";

export const metadata = {
  // metadata 는 serverside에서만 가능하다.
  title: "Search - Image Gallery",
};

export default function Page() {
  return <SearchPage />;
}
