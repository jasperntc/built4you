import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ShippingLabel } from "../components/ShippingLabel";
import type { Episode } from "../content/types";

const building: Episode = {
  number: 3,
  title: "Test App",
  slug: "test-app",
  stage: "building",
  to: "the friend who asked",
  description: "I’m building a test app.",
};

const render = (episode: Episode) => renderToStaticMarkup(<ShippingLabel episode={episode} />);

describe("ShippingLabel", () => {
  it("addresses an uncredited episode without a name", () => {
    const html = render(building);
    expect(html).toContain("To: the friend who asked");
    expect(html).not.toContain("Sam");
  });

  it("names the idea-giver only when credited", () => {
    const html = render({ ...building, credit: { name: "Sam", agreedOn: "2026-10-01" } });
    expect(html).toContain("To: Sam");
    expect(html).not.toContain("the friend who asked");
  });

  it("links the title only when there is a link", () => {
    const anchor = /<a[\s>]/;
    expect(render(building)).not.toMatch(anchor);
    const shipped = render({ ...building, stage: "shipped", link: "/test-app" });
    expect(shipped).toMatch(anchor);
    expect(shipped).toContain('href="/test-app"');
  });

  it("stamps the stage as a word", () => {
    expect(render(building)).toMatch(/data-stage="building"[^>]*>Building</);
    expect(render({ ...building, stage: "shipped", link: "/test-app" })).toMatch(
      /data-stage="shipped"[^>]*>Shipped</,
    );
  });

  it("shows the episode number in words", () => {
    expect(render(building)).toContain("Episode 3");
  });

  it("tapes on and enlarges only the featured label", () => {
    const featured = renderToStaticMarkup(<ShippingLabel episode={building} featured />);
    expect(featured).toMatch(/<span aria-hidden="true" class="tape /);
    expect(featured).toContain("lg:text-display");

    const plain = render(building);
    expect(plain).not.toContain("tape");
    expect(plain).not.toContain("lg:text-display");
  });
});
