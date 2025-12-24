import './App.css'
import Header from './components/landingPage/Header'
import Hero from './components/landingPage/Hero'
import Footer from './components/landingPage/Footer'
import Team from './components/landingPage/Team'
import Reassurace from './components/landingPage/Reassurace'
import Features from './components/landingPage/Features'

function App() {

  return (
    <>
      	<Header />
		<div className="flex flex-col min-h-screen bg-background text-foreground">
			<Hero/>
			<Features/>
			<Team/>
			<Reassurace/>
			<Footer />
		</div>
    </>
  )
}

export default App
