import { useEffect, useState } from 'react';

const Lifecycle = () => {
  const [counter, setCounter] = useState(1);
  // Si jamais on doit appeler une fonction après que mon composant soit rendu à l'écran pour la première fois
  // Si je me connecte à un flux (video/audio/commentaires) -> Je m'abonne à un flux A ou à des évènements
  // Si je change de flux, je me désabonne du flux A, et je m'abonne au flux B

  // ici je ne dois avoir aucun effet de bord (ne pas changer le contexte), et je ne dois utiliser que des fonctions pures
  // Pour un input donné en entré, j'aurais toujours le même output en sortie add(1, 5) -> 6
  // Fonction impure: Math.random(), Date.now()

  //   twitch.subscribe({channelId: '345tdi'})
  useEffect(() => {
    console.log("Va s'executer uniquement après le premier rendu du composant - []");
    document.addEventListener('click', () => {
      console.log('coucou');
    });
    const id = setInterval(() => {
      console.log(Math.random());
    }, 1000);
    return () => {
        // Le return du useEffet sert à se désabonner de tout les abonnements fait dans le corps du useEffect
      // Je dois me désabonner du "click" de l'utilisateur
        // document.removeEventListener('click', );
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    console.log(
      `Va s'executer après le premier rendu du composant, et si la valeur de counter change - [counter = ${counter}]`,
    );
  }, [idFilmNetflix]);

  return (
    <section>
      <h1>Learn useEffect</h1>
      <button onClick={() => setCounter((c) => c + 1)}>Increment: {counter}</button>
    </section>
  );
};

export default Lifecycle;
