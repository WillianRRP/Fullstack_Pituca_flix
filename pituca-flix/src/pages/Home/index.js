import { useEffect, useState } from "react";
import api from "../../services/api";

//url da api:/movie/now_playing?api_key=09cb032a5dc82af31448350df5b23055&language=pt-br


function Home(){
    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{
        async function loadFilmes() {
            const response = await api.get("/movie/now_playing",{
                params:{
                    api_key:"09cb032a5dc82af31448350df5b23055",
                    language: "pt-BR",
                    page: 1,
                }
            })  
            console.log(response.data);
        }
        loadFilmes();

    }, [])
    return(
        <div>
            <h1>Bem vindo</h1>
        </div>
    )
}

export default Home;