export default async function (address: string) {
  let response = await fetch(`https://api.neshan.org/v4/geocoding?address=${address}`, {
    headers: {
      "Api-Key": "service.309570590da14b5285b77d5729cf00f1",
    },
  });
  const coords = await response.json();

  return [coords.location.x, coords.location.y] as number[];
}
