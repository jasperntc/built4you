import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { episodes } from "../content/episodes";
import { STAGE_LABELS } from "../content/types";
import { read, root, sourceFiles } from "./source-files";

const COPY_DIRS = ["app", "components", "content"];

function today(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function isRealDate(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** Every directory or file name under dir, at any depth. */
function namesUnder(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, encoding: "utf8" }).flatMap((p) =>
    p.split(/[\\/]/),
  );
}

describe("episodes", () => {
  it("are numbered 1, 2, 3… in order", () => {
    expect(episodes.map((e) => e.number)).toEqual(episodes.map((_, i) => i + 1));
  });

  it("have unique, well-formed slugs", () => {
    const slugs = episodes.map((e) => e.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  });

  it("use only known stages", () => {
    for (const e of episodes) expect(Object.keys(STAGE_LABELS), e.slug).toContain(e.stage);
  });

  it("fill in title, to and a one-line description", () => {
    for (const e of episodes) {
      expect(e.title.trim(), e.slug).not.toBe("");
      expect(e.to.trim(), e.slug).not.toBe("");
      expect(e.description.trim(), e.slug).not.toBe("");
      expect(e.description, e.slug).not.toMatch(/\n/);
    }
  });

  it("have a link exactly when shipped", () => {
    for (const e of episodes) {
      expect("link" in e, e.slug).toBe(e.stage === "shipped");
    }
  });

  it("link only to /<slug> or https://<slug>.jasperntc.online", () => {
    for (const e of episodes) {
      if (!("link" in e)) continue;
      expect([`/${e.slug}`, `https://${e.slug}.jasperntc.online`], e.slug).toContain(e.link);
    }
  });

  it("credit an idea-giver only with a name and the day they agreed", () => {
    for (const e of episodes) {
      if (!("credit" in e)) continue;
      // A `credit: undefined` key fails here too: leave the key out instead.
      expect(e.credit?.name.trim(), e.slug).toBeTruthy();
      const agreedOn = e.credit?.agreedOn ?? "";
      expect(isRealDate(agreedOn), `${e.slug}: ${agreedOn}`).toBe(true);
      expect(agreedOn <= today(), `${e.slug}: ${agreedOn} is in the future`).toBe(true);
    }
  });

  it("have no page or file at their slug path in the hub", () => {
    for (const e of episodes) {
      expect(namesUnder(join(root, "app")), e.slug).not.toContain(e.slug);
      const publicNames = namesUnder(join(root, "public"));
      expect(publicNames, e.slug).not.toContain(e.slug);
      expect(publicNames, e.slug).not.toContain(`${e.slug}.html`);
    }
  });
});

describe("copy", () => {
  // Built4You, Built 4 You, built-for-you… in any case. The hostname
  // built4you.jasperntc.dev is lowercase by nature, so it doesn't count.
  const NAME = /built[\s_-]*(?:4|for)[\s_-]*you(?!\.jasperntc\.)/gi;
  const MAKAN_MANA = /makan[\s_-]*mana/i;

  it("the name pattern catches misspellings", () => {
    const found = (s: string) => s.match(NAME) ?? [];
    expect(found("Built4You #Built4You")).toEqual(["Built4You", "Built4You"]);
    expect(found("Built4you, Built 4 You, Built For You")).toHaveLength(3);
    expect(found("https://built4you.jasperntc.dev")).toEqual([]);
  });

  it("spells Built4You the same way everywhere", () => {
    const misspelled = sourceFiles(COPY_DIRS).flatMap((f) =>
      (read(f).match(NAME) ?? []).filter((m) => m !== "Built4You").map((m) => `${f}: ${m}`),
    );
    expect(misspelled).toEqual([]);
  });

  it("never says makan mana", () => {
    const hits = sourceFiles(COPY_DIRS).filter((f) => MAKAN_MANA.test(read(f)));
    expect(hits).toEqual([]);
  });
});
