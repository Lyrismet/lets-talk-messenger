import s from "./SidebarBlock.module.scss";
import {useState} from "react";

const SidebarBlock = ({tag, text, color}: { tag: string, text: string, color?: string }) => {
    const [isTextVisible, setIsTextVisible] = useState(true);
    const toggleTextVisibility = () => {
        setIsTextVisible(!isTextVisible);
    };
    return (
        <div className={s.sideBarBlock} style={{borderTopColor: color, borderColor: color}}>
            <div onClick={toggleTextVisibility} className={s.topWrapper}>
                <p className={s.sideBarTag} style={{color: color, borderColor: color}}>{tag}</p>
                <button>{isTextVisible ?
                    <svg xmlns="http://www.w3.org/2000/svg" id="arrow-circle-down" viewBox="0 0 24 24" width="20"
                         height="20">
                        <g>
                            <path
                                d="M24,3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V24H24ZM2,3A1,1,0,0,1,3,2H21a1,1,0,0,1,1,1V22H2Z"/>
                            <path
                                d="M13.414,9.589,18.126,14.3l-1.414,1.414L12,11,7.327,15.676,5.913,14.262l4.673-4.673a2,2,0,0,1,2.828,0Z"/>
                        </g>
                    </svg> :
                    <svg xmlns="http://www.w3.org/2000/svg" id="arrow-circle-down" viewBox="0 0 24 24" width="20"
                         height="20">
                        <path
                            d="M12,16a1.993,1.993,0,0,1-1.414-.585L5.913,10.741,7.327,9.327,12,14l4.712-4.711L18.126,10.7l-4.712,4.711A1.993,1.993,0,0,1,12,16ZM24,3a3,3,0,0,0-3-3H3A3,3,0,0,0,0,3V24H24ZM2,3A1,1,0,0,1,3,2H21a1,1,0,0,1,1,1V22H2Z"/>
                    </svg>

                }</button>
            </div>
            <h3 className={s.sideBarText}>{isTextVisible ? text : `${text.slice(0, 20)}...`}</h3>
        </div>
    );
};

export default SidebarBlock;