import React from 'react';
import Header from './leyouts/Header';
import Events from './leyouts/Events';
import Footer from './leyouts/Footer';
import ParticipationList from './leyouts/ParticipationList';
import CollegeTeamInfo from './leyouts/CollegeTeamInfo';
import EventCreate from './leyouts/EventCreate';
import WinnerCreateing from './leyouts/WinnerCreateing';
import WinnersList from './leyouts/WinnersList';
import UserRole from './leyouts/UserRole';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <div>
        <Header />
        <br></br>
        <Switch>
          <Route path="/events" component={Events} />
          <Route path="/participations" component={ParticipationList} />
          <Route path="/collegelist" component={CollegeTeamInfo} />
          <Route path="/event/create" component={EventCreate} />
          <Route path="/winner" component={WinnerCreateing} />
          <Route path="/winners/list" component={WinnersList}/>
          <Route path="/define/role" component={UserRole}/>
          <Redirect to="/events"></Redirect>
        </Switch>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default Home;