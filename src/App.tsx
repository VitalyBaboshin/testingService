
import { observer } from 'mobx-react';
import { Testing } from 'pages/Testing'
import { UserStore } from 'stores/UserStore';

import './App.css'

function App() {
  const { userId } = UserStore;
  return (
    <>
      <Testing userId={userId} />
    </>
  )
}

export default observer(App)
