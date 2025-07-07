async function fetch(url = "", data = {}) {
  const response = await fetch( url, {
    method: "POST", // *GET, POST, PUT, DELETE 등
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache",  // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // menual, *follow, error
    referrerPolicy: "no-referrer",  // no-referrer, *no-referrer-when-downgrade, origin,
    // origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // Body의 data-type = Head의 content-type
  });
  return response.json();
}

postData("https://example.com/answer", {answer:42}).than((data) => { 
  console.log(data);
});