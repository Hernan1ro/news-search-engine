import axios from "axios";
import { useState, useEffect, createContext } from "react";

const NoticiasContext = createContext();

const NoticiasProvider = ({ children }) => {
  const [categoria, setCategoria] = useState("general");
  const [noticias, setNoticias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalNoticias, setTotalNoticias] = useState(0);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=co&category=${categoria}&apikey=${
        import.meta.env.VITE_API_KEY
      }`;
      console.log(url);
      const { data } = await axios(url);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
      setPagina(1);
    };
    consultarAPI();
  }, [categoria]);

  useEffect(() => {
    const consultarAPI = async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=co&page=${pagina}&category=${categoria}&apikey=${
        import.meta.env.VITE_API_KEY
      }`;
      const { data } = await axios(url);
      setNoticias(data.articles);
      setTotalNoticias(data.totalResults);
    };
    consultarAPI();
  }, [pagina]);

  const handleChangePagina = (e, valor) => {
    setPagina(valor);
  };
  const handleChange = (e) => {
    setCategoria(e.target.value);
  };
  return (
    <NoticiasContext.Provider
      value={{
        categoria,
        handleChange,
        noticias,
        totalNoticias,
        handleChangePagina,
        pagina,
      }}
    >
      {children}
    </NoticiasContext.Provider>
  );
};

export { NoticiasProvider };

export default NoticiasContext;
