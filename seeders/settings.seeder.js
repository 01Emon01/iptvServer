import "dotenv/config";
import { settings } from "../drizzle/schema.js";
import { db } from "../config/db.js";
import { generateId } from "../helpers/generateID.js";

async function seed() {
  await db.insert(settings).values({
    id: generateId(),
    name: "UAE IPTV BOX",
    keywords:
      "uae iptv box, iptv, tvbox, iptv box, tv subscriptions, subs, subscriptions",
    description: `Best IPTV service in UAE`,
    logo: "Logo.png",
    favicon: "favicon.png",
    footerInfo: `offers IPTV boxes and TV subscriptions with global access,
                crystal-clear streaming, and 24/7 expert support-your gateway to
                non-stop entertainment.`,
    supportEmail: "uaeiptvbox@gmail.com",
    supportNo: "0502368942",
  });
  console.log("✅ Settings seeded");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed", err);
  process.exit(1);
});
