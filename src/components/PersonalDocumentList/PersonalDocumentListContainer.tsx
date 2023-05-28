import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { FC, useEffect, useMemo, useState } from 'react';
import { SubmissionSelect } from '@server/routers/submission';
import { TypeOfDocument } from '@server/routers/typeDocument';
import { trpc } from '@utils/trpc';
import Switch from '@mui/material/Switch';
import SubmissionListProps from '../common/SubmissionList';

const mockSubmission = 
[
    {
      "id": 71,
      "studentId": 1,
      "isSubmitted": true,
      "document": {
        "name": "ПСБС Сухомлин 2.docx",
        "isCompleted": true,
        "typeDocument": {
          "id": 2,
          "name": "Документ, що посвідчує пільги"
        }
      }
    },
    {
      "id": 72,
      "studentId": 1,
      "isSubmitted": true,
      "document": {
        "name": "ПСБС Сухомлин 2.docx",
        "isCompleted": true,
        "typeDocument": {
          "id": 3,
          "name": "Квитанція оплати гуртожитку"
        }
      }
    },
    {
      "id": 73,
      "studentId": 1,
      "isSubmitted": true,
      "document": {
        "name": "ПСБС Сухомлин 2.docx",
        "isCompleted": true,
        "typeDocument": {
          "id": 4,
          "name": "Фотокартки"
        }
      }
    },
    {
      "id": 74,
      "studentId": 1,
      "isSubmitted": true,
      "document": {
        "name": "ПСБС Сухомлин 2.docx",
        "isCompleted": true,
        "typeDocument": {
          "id": 1,
          "name": "Військовий квиток"
        }
      }
    }
  ]
interface IDocumentListContainer {
    idPerson: number;
}
const DocumentListContainer: FC<IDocumentListContainer> = (props) => {
    const utils = trpc.useContext();
	const router = useRouter();

    const addPost = trpc.submission.addSubmissionWithDocument.useMutation({
        async onSuccess() {
            console.log('sucsess');
        },
    });

    const [submissions, setSubmissions] = useState<SubmissionSelect[]>([])
    const [typesOfDocument, setTypesOfDocument] = useState<TypeOfDocument[]>([])

    const fetchSubmission = async (): Promise<SubmissionSelect[]> => {
        const data = await utils.submission.list.fetch({studentId: props.idPerson});
        return data;
    };

    const refetchSubmission = async (): Promise<void> => {
        const data = await fetchSubmission();
        setSubmissions(data);
    };
    
    const fetchTypes = async (): Promise<any> => {
        const data = await utils.typeDocument.list.fetch();
        return data;
    };

    const createSubmission = async (fileName: string, documentBody: string, typeDocumentId: number): Promise<void> => {
        const input = { studentId: props.idPerson, document: { name: fileName, documentBody: documentBody, typeDocument: typeDocumentId } };
        await addPost.mutateAsync(input);
        const data = await fetchSubmission();
        setSubmissions(data);
    };

    const toRoomeChoser = (): void => {
        router.push('/roomChoser/1');
    };

    const switchChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        event.target.checked ? setSubmissions(mockSubmission) : await refetchSubmission();
    };

    const isAllSumbit = useMemo(() => {
        if (submissions.length === 0)
            return false;
        return submissions.filter((el) => el.isSubmitted).length === submissions.length;
    }, [submissions])

    useEffect(() => {
        fetchSubmission().then((data) =>{ setSubmissions(data)});
        fetchTypes().then((data) =>{ setTypesOfDocument(data)});
    }, [props.idPerson])

    return (
        <div id="personDocumentListContainer">
            <div className="title">
                <span>Документи до подання</span>
            </div>
            <SubmissionListProps submissions={submissions} typesOfDocument={typesOfDocument} createSubmission={createSubmission}/>
            <div className="submitForm">
                <Button variant="contained" color="primary" disableElevation onClick={toRoomeChoser} disabled={!isAllSumbit}>
                    Обрати кімнату
                </Button>
                <div style={{position: 'absolute'}}>
                    <Switch onChange={switchChange}/>
                </div>  
            </div>
        </div>
    );
};

export default DocumentListContainer;
