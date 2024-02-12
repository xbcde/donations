import {
  Group,
  Paper,
  Text,
  Title,
  TypographyStylesProvider,
} from "@mantine/core";
import * as React from "react";
import { format } from "timeago.js";
import classes from "./comment.module.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["stripe-buy-button"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

interface Wish {
  timestamp: number;
  amount: number;
  comment?: string;
  name?: string;
  city?: string;
  country?: string;
}
interface WishResponse extends Wish {
  id: string;
}
async function getWishes(): Promise<WishResponse[]> {
  const res = await fetch("https://api.lumineer.xyz/v0/wishes/", {
    next: { revalidate: 60 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

function Comment({ timestamp, amount, comment, name, city, country }: Wish) {
  console.log(timestamp);
  return (
    <Paper key={timestamp} withBorder radius="md" className={classes.comment}>
      <Group>
        <div>
          <Text fz="sm">
            {name || "Anonymous"}
            {city && country && ` from ${city}, ${country}`}
          </Text>
          <Text fz="sm">$ {amount}</Text>
          <Text fz="xs" c="dimmed">
            {format(new Date(timestamp * 1000))}
          </Text>
        </div>
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div className={classes.content}>{comment}</div>
      </TypographyStylesProvider>
    </Paper>
  );
}

export default async function HomePage() {
  const comments = await getWishes();
  console.log(comments);
  return (
    <>
      <Title order={1}>Wishing Well</Title>
      {comments.map(
        ({
          id,
          timestamp,
          amount,
          comment,
          name,
          city,
          country,
        }: WishResponse) => (
          <Comment
            key={id}
            timestamp={timestamp}
            amount={amount}
            comment={comment}
            name={name}
            city={city}
            country={country}
          />
        )
      )}
      <script async src="https://js.stripe.com/v3/buy-button.js"></script>
      <stripe-buy-button
        buy-button-id="buy_btn_1OiTIiDlv1RGaEgdpxpOLv90"
        publishable-key="pk_live_51NkEyvDlv1RGaEgdGOWLtuMBD9h9ne9oPaCUYjw5fwJBKcVWFdq67acFebaa6soQT0xEKDktKyZ0luer5I1dyIgS00K8PnO1Q3"
      />
    </>
  );
}
