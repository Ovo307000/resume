export interface LocalizedText {
  en: string;
  zh: string;
}

export interface Project {
  name: string;
  nameZh?: string;
  url?: string;
  description: string;
  descriptionZh?: string;
  longDescription?: string | LocalizedText;
  technologies?: string[];
  imageUrl: string;
  category?: string;
  githubUrl?: string;
}

declare const projectsData: Project[];
export default projectsData;
