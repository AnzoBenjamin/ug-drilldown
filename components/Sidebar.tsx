import UserCard from "./UserCard"
import userData from "../constants/userData.json"

export default function Sidebar(){
return(
    <section className="p-6 side-nav">
        <h1 className="text-2xl mb-10">Registrant details</h1>
        <nav>
            {userData.map(((user, index)=><UserCard key={index} name={user.Name} id={user.ID} telephone={user.Telephone} district={user.District} subcounty={user.Subcounty} parish={user.Parish} age={user.Age}/>))}
        </nav>
    </section>
)
}