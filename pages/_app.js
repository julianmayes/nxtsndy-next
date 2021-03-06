import { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/globals.css";
import "../styles/normalize.css";
import useWindowSize from "../helpers/useWindowSize";

function MyApp({ Component, pageProps }) {
  const [dark, setDark] = useState(false);

  const [color, setColor] = useState({
    primary: "white",
    secondary: "black",
  });

  useEffect(() => {
    dark
      ? setColor({
          primary: "black",
          secondary: "white",
        })
      : setColor({
          primary: "white",
          secondary: "black",
        });
  }, [dark]);


  const [scrollPosition, setScrollPosition] = useState(0);

  const [menuActive, setMenuActive] = useState(false)
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const windowWidth = useWindowSize().width

  return (
    <>
      <Header dark={dark} color={color} setDark={setDark} windowWidth={windowWidth}/>
      <Component {...pageProps} dark={dark} scrollPosition={scrollPosition} color={color} windowWidth={windowWidth}/>
      <style>{`
        
        body {
          background-color: ${color.primary} ;
          color: ${color.secondary} ;
        }

  `}</style>
    </>
  );
}

export default MyApp;
