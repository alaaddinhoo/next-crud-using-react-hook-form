import { revalidatePath } from "next/cache";
import { redirect } from "next/dist/server/api-utils";

export async function getData() {
  const response = await fetch("http://localhost:3000/api/testmodel", {
    // cache: "no-store", // data shouldn't cache
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // Throwing an error on purpose
  //   throw new Error("could not complete");
  return await response.json();
}

export async function createNewTopic(requestBody) {
  const response = await fetch("http://localhost:3000/api/testmodel", {
    // cache: "no-store", // data shouldn't cache
    method: "POST", // Use POST to create a new resource
    headers: {
      "Content-Type": "application/json", // Set the content type to JSON
    },
    body: JSON.stringify(requestBody), // Convert the request body to JSON string
    // cache: "no-store", // Uncomment if you don't want to cache the response
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // Throwing an error on purpose
  //   throw new Error("could not complete");
  return await response.json();
}

export async function deleteTopicByID(topicId) {
  const response = await fetch(
    `http://localhost:3000/api/testmodel/${topicId}`,
    {
      // cache: "no-store", // data shouldn't cache
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}
