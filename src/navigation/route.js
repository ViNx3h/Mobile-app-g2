// src/navigation/appRoutes.js
import ActorInf from "../screens/ActorInf/ActorInf";
import FavList from "../screens/FavList/FavList";
import HisOrderList from "../screens/HisOrderList/HisOrderList";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import MovieDetails from "../screens/MovieDetails/MovieDetails";
import MovieList from "../screens/MovieList/MovieList";
import ProfileInf from "../screens/ProfileInf/ProfileInf";
import SignIn from "../screens/SignIn/SignIn";
import SignUp from "../screens/SignUp/SignUp";

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
        name: "ProfileInf",
        component: ProfileInf,
        header: false
    },
    {
        name: "HisOrderList",
        component: HisOrderList,
        header: false
    }

];

export default appRoutes;
