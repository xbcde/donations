import styles from "./page.module.css";

async function getData() {
  const res = await fetch("https://api.lumineer.xyz/v0/wishes/", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Wishing Well</h1>
      <p className={styles.description}>
        Transform Wishes into Reality: Every coin tossed into our enchanting
        wishing well is a symbol of hope, a whisper to the universe for dreams
        to come true. Join us in this timeless tradition, where each gleaming
        coin holds the power to manifest your deepest desires. With every gentle
        splash, you not only sow the seeds of your aspirations but also
        contribute to the magic that enriches our community. Together, let’s
        make wishes soar and miracles happen. Cast your coin, ignite your
        dreams, and watch as the universe conspires in your favor. Throw your
        coins into the well of possibilities today and let destiny take flight!
      </p>

      <script async src="https://js.stripe.com/v3/buy-button.js"></script>

      <stripe-buy-button
        buy-button-id="buy_btn_1OiTIiDlv1RGaEgdpxpOLv90"
        publishable-key="pk_live_51NkEyvDlv1RGaEgdGOWLtuMBD9h9ne9oPaCUYjw5fwJBKcVWFdq67acFebaa6soQT0xEKDktKyZ0luer5I1dyIgS00K8PnO1Q3"
      ></stripe-buy-button>
    </main>
  );
}
