export function request(url: string, callback: any) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

export function jsonRequest(url: string, callback: any) {
  request(url, res => {
    try {
      const out = JSON.parse(res);
      callback(out);
    } catch (err) {
      console.error(err);
      callback(null);
    }
  });
}
