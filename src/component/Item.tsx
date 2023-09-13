import EditImg from '../assets/img/edit.png';
import DeleteImg from '../assets/img/delete.png';

type datatype = {
    title: String,
    desc: String,
    Serial: React.ReactNode,
    index: number,
    initialTodos: [],
    setInitialTodos: any,
    DeleteClicked:any,
    UpdateClicked:any
}

const Item = (props: datatype) => {

    const { title, desc, Serial, index,DeleteClicked,UpdateClicked } = props;
    return (
        <div className='bg-gradient-to-r from-gray-100 to-gray-200 rounded flex p-3 my-2'>
            <div className='w-10/12'>
                <span>{Serial}.</span>
                <span className='font-semibold pl-4'>{title}</span>
                <p className='text-sm text-justify'>{desc}</p>
            </div>
            <div className='w-2/12 flex'>
                <img src={EditImg} alt="Del" className='h-5 cursor-pointer' onClick={()=>UpdateClicked(index)}/>
                <img src={DeleteImg} alt="Del" className='h-5 cursor-pointer pl-2' onClick={() => DeleteClicked(index)} />
            </div>
        </div>
    )
}

export default Item