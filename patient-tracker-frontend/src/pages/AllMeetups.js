import { useState, useEffect } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_DATA = [
  {
    id: 'm1',
    title: 'This is a first meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description:
      'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: 'm2',
    title: 'This is a second meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description:
      'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
];

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  // send http request to get data from firebase
  useEffect(() =>{
    fetch('https://react-getting-started-fa3bd-default-rtdb.firebaseio.com/meetups.json'
    ).then((response) => {
      return response.json(); // returns a promise
    }).then((data) => {
      const meetups = [];
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key]
        };
        meetups.push(meetup);
      }
      setIsLoading(false);
      setLoadedMeetups(meetups);
      
    });

  }, []);

  
    // wait for the response to come back from firebase
    // then convert the response to json
  if (isLoading) {
    return(
    <section>
      <p>Loading...</p>
    </section>
    );
  }
  else {
    return (
      <div>
        <h1>All Meetups</h1>
        <MeetupList meetups={loadedMeetups} />
      </div>
    );
  }
}

export default AllMeetupsPage;