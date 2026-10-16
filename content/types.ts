export type Stage = "idea" | "picked" | "building" | "shipped";

/** The word on an episode's Stamp. Sentence case, as the brand asks. */
export const STAGE_LABELS: Record<Stage, string> = {
  idea: "Idea",
  picked: "Picked",
  building: "Building",
  shipped: "Shipped",
};

/** An idea-giver who agreed to be named. Set only with their permission. */
export type Credit = {
  name: string;
  /** YYYY-MM-DD, the day they agreed. */
  agreedOn: string;
};

export type Episode = {
  number: number;
  title: string;
  /** Stable URL path segment. Never rename one. */
  slug: string;
  stage: Stage;
  /** Who the app is for, without a name: "the friend who can't decide". */
  to: string;
  /** One sentence, first person: what the app does. */
  description: string;
  /** Only when stage is "shipped": `/<slug>` or `https://<slug>.jasperntc.online`. */
  link?: string;
  credit?: Credit;
};
