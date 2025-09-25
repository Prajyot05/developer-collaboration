
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface JoinRequest {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  attachment: string;
  status: string;
}

const ProjectRequests = () => {
  const { data: session } = useSession();
  const params = useParams();
  const id = params.id as string;
  const [requests, setRequests] = useState<JoinRequest[]>([]);

  const fetchRequests = async () => {
    if (session) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/list/request/${id}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching join requests:", error);
        toast.error("Failed to fetch join requests.");
      }
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [id, session]);

  const handleAccept = async (requestId: string, userId: string) => {
    const toastId = toast.loading("Accepting request...");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/linkage/accept/${requestId}`
      );
      toast.success("Request accepted successfully!", { id: toastId });
      fetchRequests(); // Refresh the list
    } catch (error) {
      toast.error("Failed to accept request.", { id: toastId });
      console.error("Error accepting request:", error);
    }
  };

  const handleReject = async (requestId: string) => {
    const toastId = toast.loading("Rejecting request...");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/linkage/reject/${requestId}`
      );
      toast.success("Request rejected successfully!", { id: toastId });
      fetchRequests(); // Refresh the list
    } catch (error) {
      toast.error("Failed to reject request.", { id: toastId });
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project Join Requests</h1>
      {requests.length === 0 ? (
        <p>No pending join requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h2 className="text-xl font-semibold">
                {request.user.firstName} {request.user.lastName}
              </h2>
              <p className="text-gray-600">{request.user.email}</p>
              <p className="mt-2 bg-gray-50 p-2 rounded">
                {request.attachment}
              </p>
              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleAccept(request._id, request.user._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300 transform active:scale-95"
                  disabled={request.status !== "pending"}
                >
                  {request.status === "accepted" ? "Accepted" : "Accept"}
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300 transform active:scale-95"
                  disabled={request.status !== "pending"}
                >
                  {request.status === "rejected" ? "Rejected" : "Reject"}
                </button>
              </div>
              {request.status !== "pending" && (
                <p className="text-sm text-gray-500 mt-2">
                  This request has been {request.status}.
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectRequests;
