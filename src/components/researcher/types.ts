// Shared types for ResearcherPortfolio and related components

export type PublicationType = "Journal" | "Conference" | "Preprint";

export type PublicationLink = {
  arxiv?: string;
  pdf?: string;
  code?: string;
  doi?: string;
};

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  tags?: string[];
  links?: PublicationLink;
  bibtex: string;
}

export interface Experience {
  title: string;
  org: string;
  period: string;
  bullets: string[];
}

export interface Profile {
  name: string;
  title: string;
  affiliation: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvUrl: string;
}

export type TypeFilter = "All" | PublicationType;
