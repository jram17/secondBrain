import { useEffect, useState } from 'react'
import Button from '../components/Button'
import { ShareIcon } from '../icons/ShareIcon'
import { PlusIcon } from '../icons/PlusIcon'
import Card from '../components/Card'
import CreateContentModel from '../components/CreateContentModal'
import Sidebar from '../components/Sidebar'
import { useContent } from '../Hooks/useContent'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
const Dashboard = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const { contents, refresh } = useContent();
    const state = useSelector((state: RootState) => state.state.value);

    useEffect(() => {
        refresh()
    }, [modalOpen, refresh])

    function typeTranslate(type:string){
        switch (type) {
            case 'Videos':
                return 'youtube'
            case 'Documents':
                return 'document'
            case 'Websites':
                return 'website'
            case 'Tweets':
                return 'twitter'
            default:
                return 'All Notes'
        }
    }

    function populate() {
        

        if (state === "All Notes") {
            // console.log(contents)
            return contents.map(({ _id, type, link, title }) => <Card
                key={_id}
                contentId={_id}
                type={type}
                link={link}
                title={title}
            />)

        } else {
            const selectedType =typeTranslate(state)
            return contents
                .filter((content) => content.type.toLowerCase() === selectedType.toLowerCase())
                .map(({ _id, type, link, title }) => (
                    <Card
                        key={_id}
                        contentId={_id}
                        type={type}
                        link={link}
                        title={title}
                    />
                ));
        }

    }

    return (
        <div >
            <Sidebar />
            <div className='p-4 bg-gray-100 ml-72 min-h-screen border-2'>
                <CreateContentModel open={modalOpen} onClose={() => {
                    setModalOpen(false)
                }} />
                <div className='flex justify-between'>
                    <div className=' text-gray-700  font-bold text-xl  font-mono tracking-tighter flex items-center pl-2'>{state}</div>
                    <div className='flex justify-end gap-4 p-2'>
                        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />} onClick={async () => {
                            const response = await axios.post("http://localhost:3000/api/v1/brain/share", {
                                share: true
                            }, {
                                headers: {
                                    "Authorization": localStorage.getItem("token")
                                }
                            })
                            const shareUrl = `http://localhost:3000/api/v1/brain/${response.data.hash}`;
                            alert(shareUrl);
                        }} />
                        <Button onClick={() => {
                            setModalOpen(true)
                        }} variant='primary' text='Add content' startIcon={<PlusIcon />} />
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap pt-2'>

                    {/* {contents.map(({ _id, type, link, title }) => <Card
                        key={_id}
                        contentId={_id}
                        type={type}
                        link={link}
                        title={title}
                    />)} */}

                    {populate()}
                </div>
            </div>
        </div >
    )
}

export default Dashboard
