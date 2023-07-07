import RequestLayout from "../RequestLayout"
import ContentProfile from "./content-profile"

const Profile = () => {
    const profile = true;
    
    return (
        <RequestLayout profile={profile}>
            {() => (
                <ContentProfile/>
            )}
        </RequestLayout>
    )
}

export default Profile