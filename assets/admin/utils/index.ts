import { ApiRoutesWithoutPrefix } from "@Admin/constants";

export const extractIntegerFromIRI = (iri: string): number | null => {
  // Regular expression to find a single number in the IRI
  const iriRegex = /\/(\d+)\//;
  const match = iri.match(iriRegex);
  if (!match) return null;

  // Extracted substring containing the number
  const extractedNumber = match[1];

  // Convert the extracted substring to an integer
  return parseInt(extractedNumber, 10);
};

// Function to check if a string is a valid UUID
const isUUID = (str: string): boolean => {
  const uuidRegex =
    /[0-9a-f]{8}-[0-9a-f]{4}-[1-7][0-9a-f]{3}-[0-9a-f]{4}-[0-9a-f]{12}/i;

  return uuidRegex.test(str);
};

export const generateIRI = (
  baseString: ApiRoutesWithoutPrefix,
  id: number | string | object,
  prefix: string = "/api",
): string | object => {
  if (typeof id === "object") {
    return id;
  }
  let lastPart = "";
  // If the id is a string, try to extract the number from it
  if (typeof id === "string") {
    // Extract the last part of the path
    const parts = id.split("/");
    lastPart = parts[parts.length - 1];

    // Check if it matches UUID format
    if (isUUID(lastPart)) {
      lastPart = lastPart;
    } else {
      const extractedNumber = parseInt(id.split("/").pop() || "");
      if (!isNaN(extractedNumber)) {
        // If a valid number is extracted from the string, use it as the ID
        lastPart = extractedNumber as unknown as string;
      }
    }
  }
  if (typeof id === "number") {
    lastPart = id as unknown as string;
  }
  // Remove trailing slashes from the base string
  const trimmedBaseString = baseString.replace(/\/+$/, "");
  // Append the ID to the base string to create the IRI
  const iri = `${prefix}${trimmedBaseString}/${lastPart}`;
  return iri;
};

export const switchSkin = (skin: string) => {
  if (skin === "dark") {
    const btnWhite = document.getElementsByClassName("btn-white");

    for (const btn of btnWhite) {
      btn.classList.add("btn-outline-primary");
      btn.classList.remove("btn-white");
    }
  } else {
    const btnOutlinePrimary = document.getElementsByClassName(
      "btn-outline-primary",
    );

    for (const btn of btnOutlinePrimary) {
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-white");
    }
  }
};
export * from "./useUserByToken";
export * from "./getErrorMessage";
export * from "./truncate";
export * from "./generateUrl";
