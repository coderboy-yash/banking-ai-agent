// Free-to-use Unsplash photos (no API key required). Direct CDN URLs are stable.
const unsplash = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`

export const images = {
  heroPayment: unsplash('1556740738-b6a63e27c4df', 1000),
  cardLaptop: unsplash('1563013544-824ae1b704d3', 1000),
  coinsGrowth: unsplash('1579621970563-ebec7560ff3e', 1400),
  atmKeypad: unsplash('1601597111158-2fceff292cdc', 1400),
  signingDocs: unsplash('1450101499163-c8848c66ca85', 1400),
  cafePayment: unsplash('1554774853-b415df9eeb92', 1000),
  textureWave: unsplash('1620121692029-d088224ddc74', 700),
  textureInk: unsplash('1541701494587-cb58502866ab', 700),
  textureGold: unsplash('1610375461369-d613b564f4c4', 700),
  textureNightEarth: unsplash('1451187580459-43490279c0fa', 700),
}
