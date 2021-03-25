import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";
import styles from "../styles/home.module.scss";

type ProductProps = {
  priceId: string;
  amount: number;
};

type HomeProps = {
  product: ProductProps;
};

export default function Home({ product }: HomeProps) {
  const priceFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.amount);

  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>

          <h1>
            News about the <br />
            <span>React</span> world.
          </h1>

          <p>
            Get acess to all the publications <br />
            <span>for {priceFormat} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img
          src="/images/avatar.svg"
          alt="Girl coding"
          className={styles.avatar}
        />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IYy4ZJuKB7OfFstoMkEvg3d");

  const product: ProductProps = {
    priceId: price.id,
    amount: price.unit_amount / 100,
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
