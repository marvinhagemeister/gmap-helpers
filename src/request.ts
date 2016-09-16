export function request(url: string, callback: any, type?: string) {
  type = type === "GET" ? "GET" : "POST";

  let req = new XMLHttpRequest();
  req.addEventListener("load", callback);
  req.open(type, url);
  req.send();
}
