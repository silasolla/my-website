export interface LinkItem {
  name: string;
  url: string;
  description?: string;
}

export interface LinkSection {
  title: string;
  items: LinkItem[];
}

export interface LinksData {
  sections: LinkSection[];
  notes: string[];
}
