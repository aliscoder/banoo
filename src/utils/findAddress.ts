import { CoordType } from "@types";

export default async function (coords: CoordType) {
  let response = await fetch(
    `https://api.neshan.org/v5/reverse?lat=${coords[1]}&lng=${coords[0]}`,
    {
      headers: {
        "Api-Key": "service.309570590da14b5285b77d5729cf00f1",
      },
    }
  );
  const address = await response.json();

  return address.formatted_address as string;
}
