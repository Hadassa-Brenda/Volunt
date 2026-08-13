import { ArrowLeft, Heart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ServiceCard } from "../../../components/ServiceCard/ServiceCard";
import Footer from "../../../layouts/Footer/Footer";
import Header from "../../../layouts/Header/Header";
import { servicesDTO } from "../../../types/DTOs/serviceDTO";
import { getFavoriteIds, saveFavoriteIds } from "../../../utils/favorites";
import "./FavoritesPage.css";
export default function FavoritesPage(){const navigate=useNavigate();const [ids,setIds]=useState(()=>getFavoriteIds());const services=servicesDTO.filter(service=>ids.includes(String(service.id)));const remove=id=>setIds(current=>saveFavoriteIds(current.filter(item=>item!==String(id))));return <main className="favorites-page"><Header/><div className="favorites-container"><button className="back-button" onClick={()=>navigate(-1)}><ArrowLeft size={18}/>Voltar</button><header><span><Heart fill="currentColor"/></span><div><h1>Meus favoritos</h1><p>Serviços que você salvou para consultar depois.</p></div></header>{services.length?<div className="favorites-grid">{services.map(service=><ServiceCard key={service.id} service={service} isFavorite onFavorite={remove}/>)}</div>:<section className="favorites-empty"><Heart/><h2>Nenhum favorito ainda</h2><p>Use o coração nos cards para guardar serviços interessantes.</p><Link to="/explorar">Explorar serviços</Link></section>}</div><Footer/></main>}
