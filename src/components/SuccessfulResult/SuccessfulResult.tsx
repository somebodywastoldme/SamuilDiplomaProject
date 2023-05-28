import { FC, useEffect, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { SuccessfulResultType } from '@server//routers/student';
import { trpc } from '@utils/trpc';

interface ISuccessfulResult {
    personId: number;
}

const SuccessfulResult: FC<ISuccessfulResult> = (props) => {
	const utils = trpc.useContext();
    const [data, setData] = useState<SuccessfulResultType>(null);
    useEffect(() => {
		const fetch = async () => {
				const data = await utils.student.succsessfullResult.fetch({ studentId: props.personId });
                setData(data);
		};
		fetch();
	}, []);

    if (!data) {
        return
    }

    return (
        <div className='successfulResulContainer'>
            <div style={{height: '100%', margin: 'auto'}}>
                <p>Ви успішно поселені до гуртожитку <br/> за адресою <span>{data.room.hostel.address}</span> <br/> у кімнату <span>{data.room.roomNumber}</span>  на <span>{data.room.floor.name}</span> поверсі</p>
                <div>
                    <ReactSVG src='/svg/successfull.svg'/>
                </div>
            </div>
        </div>
    )
};
export default SuccessfulResult;