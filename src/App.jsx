import ShootingStars from './comps/shootingStars';
import './App.css';
import Header from './comps/header';
import MainCircle from './comps/maincircle';

export default function App() {
  return (
    <>
      <ShootingStars />
      <main>
        <Header/>
        <div className="content flex items-center justify-center min-h-screen mt-[10vh]">
          <MainCircle />
        </div>
      </main>
    </>
  );
}