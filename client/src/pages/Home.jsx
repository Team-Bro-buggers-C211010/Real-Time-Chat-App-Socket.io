import { useSelector } from 'react-redux';
import UserSideBar from '../components/UserSideBar';
import ChatContainer from '../components/ChatContainer';
import EmptyChat from '../components/EmptyChat';
const Home = () => {
  const {selectedUser} = useSelector((state) => state.chat);
  return (
    <div className='min-h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-2xl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <UserSideBar />
            {
              selectedUser ? <ChatContainer className={`${selectedUser ? "block" : "hidden sm:block"}`} /> : <EmptyChat className={`${selectedUser ? "block" : "hidden sm:block"}`} />
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home