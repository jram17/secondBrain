
import { Link } from 'react-router-dom'
import Button from '../components/Button'
// import { useCheckAuth } from '../Hooks/useCheckAuth'
import { useEffect } from 'react';
import { resetState } from '../Redux/Slices/stateSlice';
import { useDispatch } from 'react-redux';
import { BrainIcon } from '../icons/BrainIcon';
import { useAuth } from '../Hooks/useAuth';

const Home = () => {
    const dispatch=useDispatch();
    const {auth,refresh}=useAuth();
    useEffect(()=>{
        refresh()
    })

    console.log(auth)
    function checkCanGoToDashboard(): JSX.Element {
        if (auth) {
            return <Link to="/dashboard"><Button variant='primary' text='DashBoard' /></Link>
        } else {
            return <Link to="/sign-in"><Button variant='primary' text='DashBoard' /></Link>
        }

    }
    return (
        <div>
            <div className='flex justify-between p-2'>
                      <div className="flex text-2xl items-center pt-2 " onClick={()=>dispatch(resetState())}>
                        <div className="pr-2 text-purple-600 cursor-pointer">
                          <BrainIcon />
                        </div>
                        <div className="font-bold font-mono tracking-tighter text-gray-700 cursor-pointer">
                          Second Brain
                        </div>
                      </div>
                <div className='flex justify-center gap-2 p-2'>
                    {checkCanGoToDashboard()}
                    <Link to="/sign-in"><Button variant='secondary' text='Sign-In' /></Link>

                </div>
            </div>

        </div>
    )
}

export default Home
