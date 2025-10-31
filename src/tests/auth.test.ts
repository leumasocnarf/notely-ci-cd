import { IncomingHttpHeaders } from "http";
import { getAPIKey } from "src/api/auth";
import { describe, it, expect } from "vitest";

describe("getAPIKey", () => {
  it("should return the API key when authorization header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey abcdef-ghijkl-mnopqr",
    };
    expect(getAPIKey(headers)).toBe("abcdef-ghijkl-mnopqr");
  });

  it("should return null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null when authorization header is undefined", () => {
    const headers: IncomingHttpHeaders = {
      authorization: undefined,
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should return null when authorization header does not start with 'ApiKey'", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer my-token",
    };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("should handle authorization header with only spaces", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "   ",
    };
    expect(getAPIKey(headers)).toBeNull();
  });
});
