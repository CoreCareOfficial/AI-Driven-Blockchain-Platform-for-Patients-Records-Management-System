import "../../css/UserPageStyle/content.css"
import Profile from "./Profile";
import  RecordesPage from '../../pages/RecordesPage';
function Content() {
    return (
        <>
            <div className="contentContainer">
                {/* <Profile /> */}
                <RecordesPage/>
            </div>
        </>

    );
}

export default Content;