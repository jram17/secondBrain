
import { ShareIcon } from '../icons/ShareIcon'
import { DeleteIcon } from '../icons/DeleteIcon'

import { BookMarkIcon } from "../icons/BookMarkIcon"
import { FileIcon } from "../icons/FileIcon"
import { XIcon } from "../icons/XIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import axios from 'axios'


import { Tweet } from 'react-tweet'

interface CardProps {
    contentId: string;
    title: string;
    link: string;
    type:string;
}

function whatCard(type: string) {
    switch (type) {
        case "twitter":
            return <XIcon />
        case "youtube":
            return <YoutubeIcon />
        case "documents":
            return <FileIcon />
        case "websites":
            return <BookMarkIcon />
        default:
            return <XIcon />
    }
}

function populateTweetCard(link:string){
    const tweetId:string= link.split('/')[5];
    return <Tweet id={tweetId}/>
}   

const Card = ({ contentId, title, link, type }: CardProps) => {
    return (
        <div className='bg-white rounded-md shadow-md border-slate-100 p-4 max-w-72 border min-h-48  min-w-72 ' >
            <div className='flex justify-between '>
                <div className='flex justify-center items-center text-md  font-medium'>
                    <div className='text-gray-500 pr-2 '>
                        {whatCard(type)}
                    </div>
                    {title}
                </div>
                <div className='flex justify-center items-center'>
                    <div className='text-gray-500 pr-2 cursor-pointer'>
                        <a href={link} target='_blank'><ShareIcon /></a>

                    </div>

                    <div className='text-gray-500 cursor-pointer' onClick={async () => {
                        const response = await axios.delete(`http://localhost:3000/api/v1/${contentId}`, {
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        });
                        if (response) { console.log(response.data.message);  }
                    }}>
                        <DeleteIcon />
                    </div>

                </div>
            </div>

            <div className='pt-4 '>

                {type === "youtube" && (
                    <iframe className="w-full " src={link.replace("watch?v=", "embed/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                )}

                {type === "twitter" && (
                    
                    // <blockquote className="twitter-tweet">
                    //     {/* <a href="https://twitter.com/username/status/807811447862468608"></a> */}
                    //     {/* <a href="https://twitter.com/CryptexFinance/status/1857048542340116962?ref_src=twsrc%5Etfw"></a> */}

                    //     <a href={link.replace("x.com", "twitter.com")}></a>

                    //     {/* like until the link is fetched render this  */}
                    //     {/* <LoadingIcon/> */}
                    // </blockquote>
                    populateTweetCard(link)
                    

                )}
            </div>
        </div>
    )
}

export default Card
