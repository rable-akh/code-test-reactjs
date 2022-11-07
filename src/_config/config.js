const uris = {
    api:
      process.env.REACT_APP_STATUS === "staging"
        ? process.env.REACT_APP_API_URL
        : "http://localhost:3000/api/v1.0.0/",
    img:
      process.env.REACT_APP_STATUS === "staging"
        ? process.env.REACT_APP_IMG_URL
        : "http://localhost:3000/",
  };
  
  // https://localhost:3000/api/v1.0.0/
  
  export function ApiUri(path = "") {
    if (path !== "") {
      return uris.api + path;
    } else {
      return uris.api;
    }
  }
  
  export function ImgUri(path = "") {
    if (path !== "") {
      return uris.img + path;
    } else {
      return uris.img;
    }
  }
  