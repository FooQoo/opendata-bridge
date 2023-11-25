export type Resource = {
  title: string;
  url: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
  prompt: string;
  updatedAt: string;
};
