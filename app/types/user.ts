export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  skills?: string[];
  profilePic?: string;
  instituteName?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  projectsCompleted?: number;
  rank?: number;
  projectIds?: string[];
  codingPlatforms?: Array<{
    platform: string;
    username: string;
    profileUrl?: string;
  }>;
}
