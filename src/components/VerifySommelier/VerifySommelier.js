import React, {useState} from "react";
import {BsFilePlusFill,BsFillCheckCircleFill,BsThreeDots,BsXLg } from 'react-icons/bs';
import './VerifySommelier.css';

const VerifySommelier = () =>{

    const [ind1Status, setInd1Status] = useState(0);
    const toggleIndStatus = () =>{
        setInd1Status(!ind1Status);
    }
    const [ind2Status, setInd2Status] = useState(0);
    const toggleInd2Status = () =>{
        setInd1Status(!ind2Status);
    }
    const [ind3Status, setInd3Status] = useState(0);
    const toggleInd3Status = () =>{
        setInd1Status(!ind3Status);
    }


    return (
        <>
            <div className = "verifysomm">
                <div className = "verifysomm__title">
                    <div className = "verifysomm__title-title"> Verify Sommelier </div>
                    <BsXLg></BsXLg>
                </div>
                <div className = "verifysomm__verify">
                    <div className = "verifysomm__verify-ind">
                        <div className = "verifysomm__verify-info">
                            <img src = "//images.vivino.com/avatars/MutAcRi8Th-OYQwBJHsb3w.jpg"></img>
                            <div className = "verifysomm__verify-name"> iamdooddi</div>
                        </div>
                        <div className = "verifysomm__verify-btn">
                            <div className= "verifysomm__verify-approve"> approve </div>
                            <div className= "verifysomm__verify-reject"> reject </div>
                            <div className = "verifysomm__verify-pending"> <BsThreeDots/> </div>
                        </div>
                        
                    </div>

                    <div className = "verifysomm__verify-detail">
                        <div>
                            
                        </div>
                    </div>
                    
                    

                </div>
            </div>

        </>
    )
}

export default VerifySommelier;
