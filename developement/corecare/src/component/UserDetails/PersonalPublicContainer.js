function PersonalPublicContainer({ isDoctor, active, handlePersonalClick, handlePublicClick }) {
    return (
        isDoctor ? (
            <div className="flex flex-row text-white gap-3 justify-center min-w-full cursor-pointer">
                <div
                    className={`p-2 border-b-2 duration-700 ${active === 'personal' ? 'border-blue-700' : 'border-transparent'}`}
                    onClick={handlePersonalClick}
                >
                    Personal Information
                </div>
                <div
                    className={`p-2 border-b-2 duration-700 ${active === 'public' ? 'border-blue-700' : 'border-transparent'}`}
                    onClick={handlePublicClick}
                >
                    Public Information
                </div>
            </div>
        ) : null
    );
}

export default PersonalPublicContainer;
