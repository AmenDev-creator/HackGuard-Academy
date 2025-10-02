// src/utils/clearCache.ts
export async function clearCache() {
  if ("caches" in window) {
    const names = await caches.keys();
    for (const name of names) {
      await caches.delete(name);
    }
  }
  console.log("Cache cleared ✅");
}
