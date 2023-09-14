import { Toaster } from "react-hot-toast";
import ConnectionCard from "../../Components/cards/ConnectionCard";
import PostCards from "../../Components/cards/PostCards";
import UserNav from "../../Components/user/Nav/UserNav";
import ProfileCard from "../../Components/user/Profile/ProfileCard";
import EditProfile from "../../Components/user/edit-user/EditProfile";

const Profile = () => {
  return (
    <>
      <div className="home w-full px-0 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <Toaster position="top-right" />
        <UserNav/>

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* Left */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-auto">
            <ProfileCard />
            <ConnectionCard />
          </div>

          {/* center */}
          <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto">
            <PostCards />
          </div>

          {/* right */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
          
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>Title</span>
              </div>
            </div>

            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between tex-lg text-ascent-1 pb-2 border-b border-[#66666645]">
                <span>Title</span>
              </div>
            </div>
          
          </div>
        </div>
      </div>

      {/* <EditProfile /> */}
    </>  
  )
}

export default Profile