import Head from 'next/head'
import { Fragment } from 'react';
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'This is a first entry',
//         image:
//           'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//         address: 'Meetupstreet 5, 12345 Meetup City',
//         description:
//           'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//       },

//       {
//         id: 'm2',
//         title: 'This is a second entry',
//         image:
//           'https://upload.wikimedia.org/wikipedia/commons/5/58/Black_crowes-Newport.jpg',
//         address: 'Alex 5, 12345 Meetup City',
//         description:
//           'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//       }
// ];

function HomePage(props) {
    return (
      <Fragment>
      <Head>
        <title>{props.title}</title>
      </Head>
      <MeetupList meetups={props.meetups} />
      </Fragment>
    )
  }

  export async function getStaticProps() {
    const client =  await MongoClient.connect('mongodb+srv://artisanb:J6bOiVoornD31vem@cluster0.nvuhk.mongodb.net/althea?retryWrites=true&w=majority')
      
    const db = client.db();
  
    const meetupsCollection = db.collection('althea');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
      props: {
        meetups: meetups.map((meetup) => ({
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString(), 
        })),
      },
      revalidate: 1
    };
  }
export default HomePage;