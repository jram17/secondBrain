import { useRef, useState } from 'react';
import { XMardkIcon } from '../icons/XMarkIcon'
import Button from './Button'
import { Input } from './Input';
import axios from 'axios';


enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

const CreateContentModel = ({ open, onClose }: {
    open: boolean;
    onClose: () => void;
}) => {


    const titleRef = useRef<HTMLInputElement>();
    const linkRef = useRef<HTMLInputElement>();
    const [type, setType] = useState(ContentType.Youtube);


    const addContent = async () => {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;


        console.log(title, link, type);

        await axios.post("http://localhost:3000/api/v1/content", {
            link, type, title
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        onClose();
        // alert("content added successfully!!")
    }
    return (
        <div >
            {open && (
                <div className="w-screen h-screen bg-white/30 backdrop-blur-md fixed top-0 left-0 flex justify-center items-center z-50">
                    <div className="flex  justify-center items-center">
                        <div
                            className=" p-4 rounded-md shadow-lg bg-white outline  outline-purple-300 "
                        >
                            <div className="flex justify-end">
                                <div onClick={() => onClose()} className="cursor-pointer">
                                    <XMardkIcon />
                                </div>
                            </div>
                            <div>
                                <Input reference={titleRef} placeholder={"title"} />
                                <Input reference={linkRef} placeholder={"link"} />
                            </div>
                            <div className="pt-2">
                                <div className="flex gap-1 justify-center pb-2">
                                    <Button
                                        text="Youtube"
                                        variant={
                                            type === ContentType.Youtube
                                                ? "primary"
                                                : "secondary"
                                        }
                                        onClick={() => {
                                            setType(ContentType.Youtube);
                                        }}
                                    ></Button>
                                    <Button
                                        text="Twitter"
                                        variant={
                                            type === ContentType.Twitter
                                                ? "primary"
                                                : "secondary"
                                        }
                                        onClick={() => {
                                            setType(ContentType.Twitter);
                                        }}
                                    ></Button>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <Button onClick={addContent} variant="primary" text="submit" />
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    )
}





export default CreateContentModel
