import { dateFormatter } from "../date";

describe("dateFormatter", () => {
  test("should render correct date in correct format", () => {
    const newFormattedDate = dateFormatter("2019-07-15T17:22:50.754199Z");
    expect(newFormattedDate.includes("JUL")).toBe(true);
  });
});
