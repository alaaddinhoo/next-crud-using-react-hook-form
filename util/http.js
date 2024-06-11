export async function getData() {
  const response = await fetch("http://localhost:3000/api", {
    // cache: "no-store", // data shouldn't cache
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // Throwing an error on purpose
  //   throw new Error("could not complete");
  return await response.json();
}
