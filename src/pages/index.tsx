import Head from "next/head";
import { api } from "~/utils/api";

export default function Home() {
  const metadata = (
    <Head>
      <title>Are the Americans Awake?</title>
      <meta
        property="description"
        content="A site to know how many of the americans are awake"
      />
      <meta property="og:image" content="/og.jpg" />
      <meta property="og:image:type" content="article" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:title" content="Are the Americans Awake?" />
      <meta
        property="og:description"
        content="Gotta time those hackernews posts right.."
      />
      <meta
        property="og:url"
        content="https://are-the-americans-awake.yusuf.fyi"
      />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
  const { data, isLoading } = api.usaTime.percent.useQuery();
  if (isLoading) return metadata;
  if (!data) return <div>something went wrong</div>;
  let percentAwake = 0;
  for (const place of data) {
    if (place.awake) percentAwake += place.population;
  }
  const areTheAmericansAwake = percentAwake >= 50;
  console.log(data);
  return (
    <>
      {metadata}
      <main className="mx-auto mt-16 flex w-full max-w-4xl flex-col justify-center gap-4">
        <div className="text-center text-3xl">
          <strong>{areTheAmericansAwake ? "Yes" : "No"}</strong>, in fact around{" "}
          <span className="font-bold text-emerald-900">
            {percentAwake} percent
          </span>{" "}
          of americans are {areTheAmericansAwake ? "Awake" : "Asleep"} right
          now.{" "}
        </div>
        <p className="text-2xl">
          “but why is this useful information?” <em>you might ask</em>.
        </p>
        <p className="text-2xl leading-relaxed">
          well, americans make up around 50% of reddit users and the
          overwhelming majority of Threads&apos;s userbase especially since
          it&apos;s banned in certain countries in europe. so these days knowing
          when the americans are awake can be a pretty useful skill. given that
          the USA decided that having 4, 9 or 11 timezones — depending on how to
          count — was completely manageble on their end, I unfortunatly was
          obliged by{" "}
          <code className="rounded-md bg-slate-100 px-2 py-1">
            Official Programmer State Law
          </code>{" "}
          to make this tool to help my fellow non-americans.
        </p>
        <hr className="h-[3px] border-none bg-slate-200" />
        {/*data?.map((place) => (
          <div key={place.baseName}>
            it&apos;s {place.time} in {place.baseName} and they are{" "}
            {place.awake ? "awake" : "asleep"}
          </div>
        ))*/}
        <footer className="text-lg">
          If you&apos;ve found this helpful,{" "}
          <a
            className="font-bold text-sky-800 underline decoration-sky-800/30 decoration-[2px] transition-colors hover:text-sky-950"
            href="https://ko-fi.com/spacebuffer"
          >
            consider donating
          </a>{" "}
          for emotional support and therapist money, I really shouldn&apos;t
          have looked at javascript <code>Date Object</code> specs for that
          long.. <br /> <br />
          Otherwise, check out the articles I write on{" "}
          <a
            href="https://yusuf.fyi"
            className="font-bold text-sky-800 underline decoration-sky-800/30 decoration-[2px] transition-colors hover:text-sky-950"
          >
            my blog
          </a>
          , they are pretty damn interesting
        </footer>
        <h2 className="text-3xl font-semibold">Notes</h2>
        <ol className="list-decimal">
          <li>
            I say{" "}
            <strong>
              <em>around</em>
            </strong>{" "}
            {percentAwake} percent because it&apos;s not totally accurate, I
            ignored timezones whose population makes up less than .4 percent of
            the total USA population, E kala mai iaʻu Alaska and Hawaii :(
          </li>
          <li>
            I consider awake to mean from 8AM to 11PM, you <em>are</em> getting
            at least 8 hours of sleep, right?
          </li>
          <li>
            To calculate the population per timezone I used the 2019 Census
            Data.
          </li>
        </ol>
      </main>
    </>
  );
}
