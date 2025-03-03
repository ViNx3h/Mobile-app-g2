// src/navigation/appRoutes.js
import ActorInf from "../screens/ActorInf/ActorInf";
import ActorList from "../screens/ActorList/ActorList";
import FavList from "../screens/FavList/FavList";
import Genre from "../screens/Genre/Genre";
import HisOrderList from "../screens/HisOrderList/HisOrderList";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import MovieDetails from "../screens/MovieDetails/MovieDetails";
import MovieList from "../screens/MovieList/MovieList";
import ProfileInf from "../screens/ProfileInf/ProfileInf";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import SignIn from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/SignUp";
import TVlistDetails from "../screens/TVlistDetails/TVlistDetails";

const appRoutes = [
    {
        name: "Home",
        component: HomeScreen,
        header: false
    },
    {
        name: "SignIn",
        component: SignIn,
        header: false
    },
    {
        name: "SignUp",
        component: SignUp,
        header: false
    },
    {
        name: "MovieList",
        component: MovieList,
        header: false
    },
    {
        name: "ActorInf",
        component: ActorInf,
        header: false
    },
    {
        name: "FavList",
        component: FavList,
        header: false
    },
    {
        name: "MovieDetails",
        component: MovieDetails,
        header: false
    },
    {
        name: "TVlistDetails",
        component: TVlistDetails,
        header: false
    },
    {
        name: "ProfileInf",
        component: ProfileInf,
        header: false
    },
    {
        name: "HisOrderList",
        component: HisOrderList,
        header: false
    },
    {
        name: "GenreMovie",
        component: Genre,
        header: false
    },
    {
        name: "SearchScreen",
        component: SearchScreen,
        header: false
    },
    {
        name: "ActorList",
        component: ActorList,
        header: false
    }

];

export default appRoutes;
