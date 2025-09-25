export interface ProjectOwner {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Project {
  _id: string;
  title: string;
  domains: string[];
  location: string;
  description: string;
  instituteName?: string;
  link: string;
  requirements: string;
  responsibilities: string;
  owner: ProjectOwner;
  team: ProjectOwner[];
}
