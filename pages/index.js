import Head from "next/head";

// this 'MogoClient' import will not be part of the client side bundle
// because it's only used in server-side code snippet.
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of React Meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

// getServerSideProps, getStaticProps & getStaticPaths will only run on the server.
// They will never be exposed to the client and therefore a safe place for credentials.

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // fetch data from an API
//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

// this is server-side code!!!
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://szilvi:Cuvgu9-cakrat-byxbur@cluster0.hp2po9x.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  // 'revalidate' means the number of seconds NextJS will wait before it regenerates the data.
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 3600,
  };
}

export default HomePage;
