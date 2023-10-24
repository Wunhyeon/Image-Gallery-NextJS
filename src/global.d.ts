declare global {
  interface UnsplashImage {
    description: string;
    user: {
      username: string;
    };
    urls: {
      raw: string;
    };
    width: number;
    height: number;
  }

  interface UnsplashSearchResponse {
    results: UnsplashImage[];
  }

  interface UnsplashUser {
    username: string;
    first_name: string;
    last_name: string;
  }
}
