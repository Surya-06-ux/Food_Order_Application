import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
// import RestaurantCategory from "./RestaurantCategory";
const RestaurantMenu=()=>{
    const {resId} = useParams();     // const [resInfo,setResInfo] = useState(null);
    const resInfo = useRestaurantMenu(resId);    //putting fetching data logic in useRestaurantMenu hook

    const [showIndex,setShowIndex]= useState(0);

    // console.log("resInfo:", resInfo);

    if(resInfo===null) return (<Shimmer/>);
    // console.log(resInfo);
   const infoCard = resInfo.data.cards.find(
  (card) => card.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
);
const { cuisines, costForTwoMessage, name } = infoCard?.card?.card?.info;

// For categories
const menuCard = resInfo.data.cards.find((card) => card.groupedCard);
const categories = menuCard?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
  (c) => c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
) || [];
    // console.log(categories);
   return ( 
   <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines.join(", ")}- {costForTwoMessage}</p>
            {categories.map((category,index)=>{
                return <RestaurantCategory 
                key={category?.card?.card?.title} 
                data={category?.card?.card}
                showItems={index===showIndex? true:false}
                setShowIndex={()=> setShowIndex(index)}
                />
            })}
        </div>
    );
};

export default RestaurantMenu;



