import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './filme-info.css'
import api from "../../services/api";
import { toast } from "react-toastify";


function Filme(){
    const{ id } = useParams()
    const navigate = useNavigate()

    const[filme, setFilme] = useState({})
    const[Loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key:"09cb032a5dc82af31448350df5b23055",
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false)
            })
            .catch(()=>{
                console.log("O filme não foi encontrado");
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado");
        }
    }, [navigate, id])

    function salvarFilme() {
       const minhaLista = localStorage.getItem("@PitucaFlix")

       let filmesSalvos = JSON.parse(minhaLista) ||[];
       
       const hasFilme = filmesSalvos.some( (filmesSalvos) => filmesSalvos.id === filme.id)

       if(hasFilme){
        toast.warn("Este filme já esta na lista")
        return;
       }

       filmesSalvos.push(filme)
       localStorage.setItem("@PitucaFlix", JSON.stringify(filmesSalvos))
       toast.success("Filme Salvo")
    }

    if(Loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average} /10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>

            </div>
        </div>
    )
}

export default Filme;