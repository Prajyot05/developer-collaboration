export interface Project {
  _id: number;
  title: string;
  domains: string[];
  location: string;
  description: string;
  instituteName?: string;
  link: string;
  requirements: string;
  responsibilities: string;
}
