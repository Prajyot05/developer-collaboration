"use server";

import axios from "axios";
import { auth } from "../auth"; // Adjust the path to your auth file if needed

/**
 * Fetches all join requests for a given project ID.
 * Requires the user to be authenticated.
 * @param {string} projectId - The ID of the project to fetch requests for.
 * @returns {Promise<Array<any>>} A promise that resolves to an array of join requests.
 * @throws {Error} If the user is not authenticated or if the fetch fails.
 */
export async function fetchJoinRequestsForProject(projectId: string) {
  const session = await auth();
  if (!session?.user) {
    // Throws an error if the user is not logged in.
    throw new Error(
      "Unauthorized: User must be signed in to fetch join requests."
    );
  }

  try {
    // NOTE: The API path '/api/join-requests/' is inferred from your model name "JoinRequest".
    // Please adjust this path if your actual API route is different.
    const { data: requests } = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/list/requests/${projectId}`
    );

    return requests;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handles specific Axios errors (e.g., 404 Not Found, 500 Server Error)
      console.error(
        "Axios Error fetching join requests:",
        error.response?.data || error.message
      );
    } else {
      // Handles other types of errors
      console.error("Unexpected error fetching join requests:", error);
    }

    // Throws a new, standardized error to the component that called this action.
    throw new Error("Failed to fetch join requests.");
  }
}
