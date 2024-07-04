import { Skeleton } from 'primereact/skeleton';

function ProfileSkeleton() {
    return (
        <div className="bg-gray-900 text-white p-4 rounded-lg">
            <div className="flex items-center mb-4">
                <Skeleton shape="circle" size="4rem" className="mr-4 bg-[#272c34]" />
                <div>
                    <Skeleton width="10rem" className="mb-2 bg-[#272c34]" />
                    <Skeleton width="8rem" className="bg-[#272c34]" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#272c34]">General Information:</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {[...Array(6)].map((_, i) => (
                            <Skeleton key={i} height="2.5rem" className="mb-2 bg-[#272c34]" />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#272c34]">Health Information:</h3>
                    <div className="space-y-2">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex items-center">
                                <Skeleton shape="circle" size="2rem" className="mr-2 bg-[#272c34]" />
                                <Skeleton width="70%" height="1.5rem" className="bg-[#272c34]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#272c34]">Current Medications:</h3>
                    <Skeleton count={3} height="1.5rem" className="mb-2 bg-[#272c34]" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2 text-[#272c34]">Past Illnesses and Conditions:</h3>
                    <Skeleton count={2} height="1.5rem" className="mb-2 bg-[#272c34]" />
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2 text-[#272c34]">Previous Doctors</h3>
                <div className="flex items-center">
                    <Skeleton shape="circle" size="4rem" className="mr-4 bg-[#272c34]" />
                    <div>
                        <Skeleton width="8rem" className="mb-2 bg-[#272c34]" />
                        <Skeleton width="6rem" className="bg-[#272c34]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileSkeleton;