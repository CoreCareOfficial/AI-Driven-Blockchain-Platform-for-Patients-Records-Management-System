import { Button } from 'primereact/button';
import { CiCircleMinus } from 'react-icons/ci';

const PrescribedItem = ({ icon, title, items = [], handleClick, handleRemove, toshow }) => (
    <div className="flex flex-col bg-[#3F4652] p-2 rounded-md w-full">
        <div className="flex flex-row justify-start gap-2 border-b p-2 border-[#272C34] font-bold font-serif ">
            <span className="text-xl">{icon}</span>
            <h5 className=''>{title}</h5>
        </div>
        <div className="flex flex-col my-1">
            {items.length > 0 ?
                items.map((item, index) => (
                    <div key={index} className="flex flex-row justify-start">
                        <div className="bg-white text-black py-1 px-2 rounded-sm w-fit m-2">{index + 1}</div>
                        <div className="text-center self-center">{item[toshow]}</div>
                        {console.log(index)}
                        <CiCircleMinus
                            style={{ fontSize: '1.6em', color: 'red', cursor: 'pointer', alignSelf: 'center', marginLeft: 'auto' }}
                            onClick={() => handleRemove(index)}
                        />
                    </div>
                ))
                : null
            }
            <Button label={`Add ${title.split(' ')[2]}`} icon="pi pi-plus" className="bg-[#3146FF] my-2 font-bold text-white rounded-[10px] p-2 w-3/4 self-center" onClick={handleClick} />
        </div>
    </div>
);

export default PrescribedItem;
